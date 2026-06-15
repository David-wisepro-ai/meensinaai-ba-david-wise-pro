// Gerador OFICIAL do dashboard-licao single-file (HTML no Chrome).
//
// Pega references/dashboard-licao-template.html (motor auditado) + um config.json,
// VALIDA o config (Regras 1-6 do /meu-dashboard), serializa com os escapes da Regra 3
// e injeta no bloco <script id="dashboard-config" type="application/json">.
// Resultado = HTML single-file que abre direto no Chrome (file://), com progresso
// em localStorage. Zero servidor, zero cowork, zero slash command em runtime.
//
// USO:
//   node references/dashboard-licao-build.mjs <config.json> <saida.html> [--commands dir1,dir2]
//
// Ex (Ana):
//   node references/dashboard-licao-build.mjs \
//     meu-negocio/dashboard/dashboard-licao.config.json \
//     meu-negocio/dashboard/dashboard-licao.html \
//     --commands .claude/commands
//
// Sai com exit 1 (e NAO grava) se qualquer regra de seguranca falhar.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const TPL = join(HERE, "dashboard-licao-template.html");

const U2028 = String.fromCharCode(0x2028);
const U2029 = String.fromCharCode(0x2029);

const args = process.argv.slice(2);
const cfgPath = args[0];
const outPath = args[1];
const cmdFlagIdx = args.indexOf("--commands");
const cmdDirs = cmdFlagIdx >= 0 ? args[cmdFlagIdx + 1].split(",") : [];

if (!cfgPath || !outPath) {
  console.error("uso: node dashboard-licao-build.mjs <config.json> <saida.html> [--commands dir1,dir2]");
  process.exit(2);
}

let fail = false;
const bad = m => { console.error("REJEITADO  " + m); fail = true; };

// ── carrega comandos instalados (fonte da whitelist da Regra 1) ──────────────
const installedCommands = new Set();
for (const d of cmdDirs) {
  try {
    for (const f of await readdir(d)) {
      if (f.endsWith(".md")) installedCommands.add(f.replace(/\.md$/, ""));
    }
  } catch { /* dir pode nao existir */ }
}

const cfg = JSON.parse(await readFile(cfgPath, "utf8"));

// ── Regra 6: slug casa ^[a-z0-9-]{1,64}$ ─────────────────────────────────────
const slug = cfg.aluno?.slug || "";
if (!/^[a-z0-9-]{1,64}$/.test(slug)) bad("aluno.slug nao casa ^[a-z0-9-]{1,64}$: " + JSON.stringify(slug));

// ── varredura recursiva de TODOS os campos string ────────────────────────────
function walkStrings(o, cb, path = "") {
  if (typeof o === "string") return cb(o, path);
  if (Array.isArray(o)) return o.forEach((v, i) => walkStrings(v, cb, path + "[" + i + "]"));
  if (o && typeof o === "object") return Object.entries(o).forEach(([k, v]) => walkStrings(v, cb, path + "." + k));
}

// ── Regra 2: ZERO credencial ─────────────────────────────────────────────────
const SECRET_PREFIX = ["sk-", "Bearer ", "meai_", "pfm_live_", "AIza", "ghp_", "eyJ"];
walkStrings(cfg, (s, p) => {
  for (const pre of SECRET_PREFIX) if (s.includes(pre)) bad("possivel credencial (prefixo " + JSON.stringify(pre) + ") em " + p);
  if (/[A-Za-z0-9_\-]{41,}/.test(s)) bad("possivel token (>40 chars alfanum) em " + p);
});

// ── Regra 5: defesa em profundidade no ponto de injecao ──────────────────────
walkStrings(cfg, (s, p) => {
  if (/<\//.test(s) || /<script/i.test(s) || s.includes(U2028) || s.includes(U2029))
    bad("sequencia perigosa (</ , <script, U+2028/29) em " + p);
});

// ── Regra 1: comando = regex dura + fonte ADR∪instalados ──────────────────────
// (fonte ADR nao e legivel aqui; exigimos que o comando exista em .claude/commands.
//  Steps sem comando passam direto — viram so licao+criterio.)
const CMD_RE = /^\/[a-z0-9][a-z0-9-]{0,48}( .{0,150})?$/;
for (const st of (cfg.steps || [])) {
  if (!("comando" in st) || st.comando == null) continue;
  if (!CMD_RE.test(st.comando)) { bad("step " + st.id + ": comando fora da regex: " + JSON.stringify(st.comando)); continue; }
  const name = st.comando.slice(1).split(" ")[0];
  if (cmdDirs.length && !installedCommands.has(name))
    bad("step " + st.id + ": comando /" + name + " nao existe em .claude/commands (whitelist Regra 1)");
}

// ── Regra 3 (conteudo): TAREFA precisa criterio ──────────────────────────────
for (const st of (cfg.steps || [])) {
  if (!st.tipo || !["PRONTO", "TAREFA"].includes(st.tipo)) bad("step " + st.id + ": tipo invalido");
  if (st.tipo === "TAREFA" && !st.criterio) bad("step " + st.id + ": TAREFA sem criterio");
}

if (fail) { console.error("\n>>> GATE FALHOU — HTML NAO gravado."); process.exit(1); }

// ── Serializador OFICIAL (Regra 3): escapa & < > U+2028 U+2029 ───────────────
const serialized = JSON.stringify(cfg, null, 2)
  .replace(/&/g, "\\u0026")
  .replace(/</g, "\\u003c")
  .replace(/>/g, "\\u003e")
  .split(U2028).join("\\u2028")
  .split(U2029).join("\\u2029");

// sanidade pos-escape: nenhum </script literal, nenhum separador cru
if (/<\/script/i.test(serialized) || serialized.includes(U2028) || serialized.includes(U2029)) {
  console.error(">>> serializacao deixou sequencia perigosa — abortado.");
  process.exit(1);
}

const tpl = await readFile(TPL, "utf8");

// Substitui SOMENTE o bloco entre os marcadores CONFIG_INJECTION_START/END.
// (NAO casar "<script id=dashboard-config" solto: a string aparece tambem no
//  comentario de cabecalho do template, e um regex ganancioso comeria o footer.)
const START = ">>> CONFIG_INJECTION_START <<<";
const END = ">>> CONFIG_INJECTION_END <<<";
const iStart = tpl.indexOf(START);
const iEnd = tpl.indexOf(END);
if (iStart < 0 || iEnd < 0 || iEnd < iStart) {
  console.error(">>> marcadores CONFIG_INJECTION nao encontrados no template — abortado.");
  process.exit(1);
}
// fim do comentario de START (primeiro "-->" depois do marcador) e
// inicio do comentario de END (ultimo "<!--" antes do marcador).
const afterStartComment = tpl.indexOf("-->", iStart) + 3;
const beforeEndComment = tpl.lastIndexOf("<!--", iEnd);
const block =
  '\n<script id="dashboard-config" type="application/json">\n' +
  serialized +
  "\n</script>\n";
const injected = tpl.slice(0, afterStartComment) + block + tpl.slice(beforeEndComment);

// sanidade estrutural (ignora comentarios HTML — o cabecalho do template cita
// a tag de config como exemplo): exatamente 1 footer e 1 bloco de config reais.
const noComments = injected.replace(/<!--[\s\S]*?-->/g, "");
if ((noComments.match(/<footer>/g) || []).length !== 1) {
  console.error(">>> HTML final perdeu o <footer> — abortado (regex comeu conteudo).");
  process.exit(1);
}
if ((noComments.match(/<script id="dashboard-config" type="application\/json">/g) || []).length !== 1) {
  console.error(">>> HTML final nao tem exatamente 1 bloco de config real — abortado.");
  process.exit(1);
}
// o bloco de config tem que conter JSON valido com o slug certo.
const recheck = noComments.match(/<script id="dashboard-config" type="application\/json">([\s\S]*?)<\/script>/);
try {
  const back = JSON.parse(recheck[1]);
  if (back.aluno.slug !== cfg.aluno.slug) { console.error(">>> slug nao bate apos injecao — abortado."); process.exit(1); }
} catch (e) { console.error(">>> bloco de config nao e JSON valido apos injecao: " + e.message); process.exit(1); }

await writeFile(outPath, injected, "utf8");
console.log("OK  dashboard gerado: " + outPath);
console.log("    abra no Chrome:  open -a \"Google Chrome\" \"" + outPath + "\"");
