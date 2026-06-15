# wisepro-mcp

MCP server da Wise Pro Academy. Da aos agentes do nicho (escola/CSL) acesso controlado ao Supabase do David.

## Tools
- `quiz_list_by_category` — questoes VERIFICADAS por categoria (so verified=true).
- `quiz_build_exam` — prova completa 70-75 questoes verificadas (mix proporcional).
- `quiz_record_attempt` — registra tentativa do aluno.
- `quiz_review_queue` — fila de revisao (verified=false; NAO vai pro aluno).
- `lead_upsert` — captura de lead pre-Stripe.
- `checkout_event` — evento de checkout (iniciado/pago/abandonado).
- `leads_abandoned` — leads abandonados pra recuperacao.

## Setup (na call — STEP 1 do dashboard)
1. `cd .claude/mcp/wisepro-mcp && npm install`
2. Garantir `.env` na raiz do repo com `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (gitignored).
3. Registrar no Claude Desktop (Connectors) apontando pra `node .claude/mcp/wisepro-mcp/index.mjs`.

## Regra de ouro
Questoes que vao pro aluno = SEMPRE verified=true. O server filtra no codigo.
NUNCA entrega SQL pro David — tudo via estes tools.
