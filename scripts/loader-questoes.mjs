#!/usr/bin/env node
// loader-questoes.mjs — importa seeds JSON de questoes pro Supabase do David (tabela quiz_questions).
// Roda quando as chaves do Supabase existirem (.env). NUNCA entrega SQL pro David — este loader faz tudo via API.
//
// Schema unico: ver meu-negocio/portal-aluno/schema-quiz.md
//
// Fontes de seed (ordem):
//   1) raw/question-bank/<category>.json   (continuidade das ondas no repo do aluno)
//   2) caminho passado por --dir <pasta>    (ex: pra carregar o seed inicial da outra frente)
//
// Regra de ouro: questao verified !== true NAO e importada como publicavel.
//   - Por padrao SO importa verified=true (o que vai pro aluno).
//   - Com --include-unverified, importa tudo (verified fica como veio) pra fila de revisao.
//
// Uso:
//   node scripts/loader-questoes.mjs                       # importa raw/question-bank/*.json (so verified=true)
//   node scripts/loader-questoes.mjs --dir /caminho/seed   # importa de outra pasta
//   node scripts/loader-questoes.mjs --include-unverified  # importa tambem nao-verificadas (revisao)
//   node scripts/loader-questoes.mjs --dry-run             # so valida, nao escreve

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt  = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };

const DRY = flag('--dry-run');
const INCLUDE_UNVERIFIED = flag('--include-unverified');
const DIR = resolve(opt('--dir') || join(process.cwd(), 'raw', 'question-bank'));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

const CATEGORIES = new Set(['IRC', 'IBC', 'IECC', 'OSHA', 'AAB']);
const DIFFS = new Set(['iniciante', 'intermediario', 'avancado']);
const CORRECT = new Set(['A', 'B', 'C', 'D']);

function validate(q, file) {
  const errs = [];
  if (!q.id) errs.push('id ausente');
  if (!CATEGORIES.has(q.category)) errs.push(`category invalida: ${q.category}`);
  if (!q.question) errs.push('question ausente');
  if (!q.options || !['A','B','C','D'].every(k => k in q.options)) errs.push('options A-D ausentes');
  if (!CORRECT.has(q.correct)) errs.push(`correct invalido: ${q.correct}`);
  if (!q.explanation) errs.push('explanation ausente');
  if (!q.code_reference) errs.push('code_reference ausente');
  if (!DIFFS.has(q.difficulty)) errs.push(`difficulty invalida: ${q.difficulty}`);
  if (typeof q.verified !== 'boolean') errs.push('verified nao-booleano');
  if (errs.length) console.warn(`  [SKIP] ${file} :: ${q.id || '(sem id)'} -> ${errs.join('; ')}`);
  return errs.length === 0;
}

function loadSeeds(dir) {
  if (!existsSync(dir)) { console.error(`Pasta de seeds nao existe: ${dir}`); return []; }
  const files = readdirSync(dir).filter(f => f.endsWith('.json'));
  const out = [];
  for (const f of files) {
    const full = join(dir, f);
    let data;
    try { data = JSON.parse(readFileSync(full, 'utf8')); }
    catch (e) { console.warn(`  [SKIP] ${f} -> JSON invalido: ${e.message}`); continue; }
    const arr = Array.isArray(data) ? data : (Array.isArray(data.questions) ? data.questions : []);
    for (const q of arr) if (validate(q, f)) out.push(q);
  }
  return out;
}

async function upsert(rows) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY ausentes no .env. Conecte na call (STEP 1 do dashboard).');
    process.exit(1);
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/quiz_questions?on_conflict=id`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) { console.error(`Supabase erro ${res.status}: ${await res.text()}`); process.exit(1); }
}

(async () => {
  console.log(`Loader de questoes CSL — pasta: ${DIR}`);
  let rows = loadSeeds(DIR);
  console.log(`  validadas: ${rows.length}`);
  if (!INCLUDE_UNVERIFIED) {
    const before = rows.length;
    rows = rows.filter(q => q.verified === true);
    console.log(`  so verified=true: ${rows.length} (descartadas ${before - rows.length} nao-verificadas -> fila de revisao)`);
  }
  if (DRY) { console.log('  --dry-run: nada escrito.'); return; }
  if (!rows.length) { console.log('  nada a importar.'); return; }
  // chunk de 500
  for (let i = 0; i < rows.length; i += 500) {
    await upsert(rows.slice(i, i + 500));
    console.log(`  upsert ${Math.min(i + 500, rows.length)}/${rows.length}`);
  }
  console.log('OK — questoes importadas pro quiz_questions.');
})();
