#!/usr/bin/env node
// wisepro-mcp — MCP server da Wise Pro Academy.
// Da aos agentes do nicho (motor-quiz-csl, funil-checkout-escola, crm-escola-coordenador...)
// acesso CONTROLADO ao Supabase do David via REST (service_role no .env). NUNCA SQL pro cliente.
//
// Regra de ouro: quiz_list_by_category e quiz_build_exam SO retornam verified=true.
//
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (carregados do .env do repo, gitignored).

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

function need() {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY ausentes. Conecte na call (STEP 1 do dashboard).');
  }
}

async function sb(path, { method = 'GET', body, prefer } = {}) {
  need();
  const headers = {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  };
  if (prefer) headers.Prefer = prefer;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method, headers, body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${text}`);
  return text ? JSON.parse(text) : null;
}

const TOOLS = [
  {
    name: 'quiz_list_by_category',
    description: 'Lista questoes VERIFICADAS (verified=true) de uma categoria CSL. So retorna o que pode ir pro aluno.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', enum: ['IRC','IBC','IECC','OSHA','AAB'] },
        subtopic: { type: 'string' },
        limit: { type: 'number', default: 7 },
      },
      required: ['category'],
    },
  },
  {
    name: 'quiz_build_exam',
    description: 'Monta uma prova completa de 70-75 questoes VERIFICADAS com mix proporcional de categorias.',
    inputSchema: {
      type: 'object',
      properties: { size: { type: 'number', default: 72 } },
    },
  },
  {
    name: 'quiz_record_attempt',
    description: 'Registra a tentativa de um aluno (acertou ou nao) em quiz_attempts.',
    inputSchema: {
      type: 'object',
      properties: {
        student_email: { type: 'string' },
        question_id: { type: 'string' },
        answer: { type: 'string' },
        correct: { type: 'boolean' },
      },
      required: ['student_email','question_id','answer','correct'],
    },
  },
  {
    name: 'quiz_review_queue',
    description: 'Lista questoes NAO verificadas (verified=false) — fila de revisao humana. NAO vao pro aluno.',
    inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 50 } } },
  },
  {
    name: 'lead_upsert',
    description: 'Cria/atualiza um lead capturado ANTES do Stripe (nome/email/telefone/produto/status).',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' }, email: { type: 'string' }, phone: { type: 'string' },
        product: { type: 'string', enum: ['project_manager','construtor','wise_day'] },
        status: { type: 'string' },
      },
      required: ['name','email','product'],
    },
  },
  {
    name: 'checkout_event',
    description: 'Registra evento de checkout (checkout_iniciado / pago / abandonado).',
    inputSchema: {
      type: 'object',
      properties: {
        lead_email: { type: 'string' }, product: { type: 'string' },
        event: { type: 'string', enum: ['checkout_iniciado','pago','abandonado'] },
        stripe_session_id: { type: 'string' },
      },
      required: ['lead_email','product','event'],
    },
  },
  {
    name: 'leads_abandoned',
    description: 'Lista leads com status=abandonado pra recuperacao de carrinho.',
    inputSchema: { type: 'object', properties: { limit: { type: 'number', default: 50 } } },
  },
];

const server = new Server({ name: 'wisepro-mcp', version: '0.1.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: a = {} } = req.params;
  try {
    let out;
    switch (name) {
      case 'quiz_list_by_category': {
        let q = `quiz_questions?verified=eq.true&category=eq.${encodeURIComponent(a.category)}`;
        if (a.subtopic) q += `&subtopic=eq.${encodeURIComponent(a.subtopic)}`;
        q += `&limit=${a.limit || 7}`;
        out = await sb(q);
        break;
      }
      case 'quiz_build_exam': {
        const size = a.size || 72;
        // mix proporcional aproximado ao exame real
        const mix = { IRC: 0.32, IBC: 0.32, IECC: 0.16, OSHA: 0.12, AAB: 0.08 };
        const picked = [];
        for (const [cat, frac] of Object.entries(mix)) {
          const n = Math.round(size * frac);
          const rows = await sb(`quiz_questions?verified=eq.true&category=eq.${cat}&limit=${n}`);
          picked.push(...rows);
        }
        out = picked.slice(0, size);
        break;
      }
      case 'quiz_record_attempt':
        out = await sb('quiz_attempts', { method: 'POST', body: [a], prefer: 'return=representation' });
        break;
      case 'quiz_review_queue':
        out = await sb(`quiz_questions?verified=eq.false&limit=${a.limit || 50}`);
        break;
      case 'lead_upsert':
        out = await sb('leads?on_conflict=email', { method: 'POST', body: [a], prefer: 'resolution=merge-duplicates,return=representation' });
        break;
      case 'checkout_event':
        out = await sb('checkout_events', { method: 'POST', body: [a], prefer: 'return=representation' });
        break;
      case 'leads_abandoned':
        out = await sb(`leads?status=eq.abandonado&limit=${a.limit || 50}`);
        break;
      default:
        throw new Error(`tool desconhecida: ${name}`);
    }
    return { content: [{ type: 'text', text: JSON.stringify(out, null, 2) }] };
  } catch (e) {
    return { content: [{ type: 'text', text: `ERRO: ${e.message}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('wisepro-mcp rodando (stdio).');
