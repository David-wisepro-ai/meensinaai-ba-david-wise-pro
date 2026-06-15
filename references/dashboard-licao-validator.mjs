// Teste de regressao oficial do gerador /meu-dashboard (Regras 1-6, foco XSS parse-time).
//
// Roda de verdade: node references/dashboard-licao-validator.mjs
// Esperado: todos PASS + ">>> RESULTADO: TODOS OS TESTES PASSARAM" (exit 0).
//
// O que valida (contra references/dashboard-licao-template.html):
//   - window.DASHBOARD_CONFIG = ... NAO existe no codigo (furo XSS antigo removido).
//   - placeholder do bloco application/json e JSON valido.
//   - runtime le via JSON.parse(textContent) (nao window.DASHBOARD_CONFIG).
//   - node --check do JS de runtime extraido do template (sintaxe OK).
//   - simula a injecao oficial de ~13 payloads de breakout (</script>, case-variations,
//     tab antes de >, <!-- --> ]]>, U+2028/U+2029) e prova que ficam INERTES:
//     deteccao por DELTA de tags <script> aberturas/fechamentos (delta 0 = sem breakout)
//     + JSON.parse devolve a string identica.
//   - esc() de runtime cobre & < > " ' ; comando vai via textContent (nao innerHTML).
//
// NOTA DE MANUTENCAO: os separadores Unicode U+2028/U+2029 sao referenciados SEMPRE
// via String.fromCharCode(0x2028)/String.fromCharCode(0x2029) (constantes U2028/U2029),
// NUNCA como caractere literal no fonte. Editor/IDE comem o literal e quebram o teste.
import { readFile, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const TPL = join(HERE, "dashboard-licao-template.html");
const html = await readFile(TPL, "utf8");

let fail = false;
const ok = m => console.log("PASS  " + m);
const bad = m => { console.error("FAIL  " + m); fail = true; };

const U2028 = String.fromCharCode(0x2028), U2029 = String.fromCharCode(0x2029);

// Ignora HTML comments na varredura estrutural (comentarios podem conter exemplos).
const noC = html.replace(/<!--[\s\S]*?-->/g, "");

if (/window\.DASHBOARD_CONFIG\s*=/.test(noC)) bad("window.DASHBOARD_CONFIG = vivo no codigo"); else ok("window.DASHBOARD_CONFIG = ausente do codigo");

const cfg = noC.match(/<script id="dashboard-config" type="application\/json">([\s\S]*?)<\/script>/);
try { JSON.parse(cfg[1]); ok("placeholder do template e JSON valido"); } catch (e) { bad("placeholder nao JSON: " + e.message); }

if (/JSON\.parse\(\s*document\.getElementById\("dashboard-config"\)\.textContent\s*\)/.test(noC)) ok("runtime usa JSON.parse(textContent)"); else bad("runtime nao usa JSON.parse(textContent)");

// node --check do JS de runtime (ultimo <script> SEM type=).
const sblocks = [...noC.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/g)];
const runtimeBlocks = sblocks.filter(m => !/type=/.test(m[0]));
const rtJS = runtimeBlocks[runtimeBlocks.length - 1][1];
await writeFile("/tmp/_rt_validator.js", rtJS);
try { execSync("node --check /tmp/_rt_validator.js", { stdio: "pipe" }); ok("node --check do JS de runtime: sintaxe OK"); } catch (e) { bad("node --check: " + (e.stderr?.toString() || e.message)); }

// Serializador OFICIAL (Regra 3): escapa & < > U+2028 U+2029 sobre a string JSON.
const ser = o => JSON.stringify(o, null, 2)
  .replace(/&/g, "\\u0026")
  .replace(/</g, "\\u003c")
  .replace(/>/g, "\\u003e")
  .split(U2028).join("\\u2028")
  .split(U2029).join("\\u2029");

// Contadores de tag <script> por DELTA (parse-time breakout detection).
const cO = s => [...s.matchAll(/<script(?:\s|>|\/)/gi)].length;
const cC = s => (s.match(/<\/script\s*>/gi) || []).length;
const bO = cO(noC), bC = cC(noC);
console.log("      (baseline: " + bO + " aberturas, " + bC + " fechamentos)");

// ~13 payloads de breakout, incluindo </script>, case-variations, tab antes de >,
// <!-- --> ]]>, U+2028/U+2029.
const payloads = [
  "</script><script>x()</script>",
  "</SCRIPT ><script>alert(1)</script>",
  "</script\t><img src=x onerror=alert(1)>",
  "abc</script foo>def",
  "json><script>y()</script>",
  "a&b<c>d",
  "x" + U2028 + "y" + U2029 + "z",
  "</scr" + "ipt>",
  "</script>",
  "<!--",
  "-->",
  "]]>",
  " <script>z()</script>"
];

for (const P of payloads) {
  const c = {
    aluno: { empresa: P, ceo_ia: "Atlas", slug: "teste", idioma_ui: "pt-BR" },
    conectores_requeridos: [{ nome: P, porque: P }],
    plugins_requeridos: [{ nome: "p", oque: P }],
    steps: [{ id: "s1", tipo: "TAREFA", titulo: P, agente: "a", licao: P, comando: "/x", criterio: P }]
  };
  const inj = ser(c);
  const lbl = JSON.stringify(P);
  if (/<\/script/i.test(inj)) { bad(lbl + " serializado contem </script literal"); continue; }
  if (inj.includes(U2028) || inj.includes(U2029)) { bad(lbl + " serializado contem U+2028/29 cru"); continue; }
  const fin = noC.replace(/(<script id="dashboard-config" type="application\/json">)[\s\S]*?(<\/script>)/, (_, a, b) => a + "\n" + inj + "\n" + b);
  if (cO(fin) - bO !== 0) { bad(lbl + " adicionou " + (cO(fin) - bO) + " <script> abertura = BREAKOUT"); continue; }
  if (cC(fin) - bC !== 0) { bad(lbl + " adicionou " + (cC(fin) - bC) + " </script> = BREAKOUT"); continue; }
  const rec = JSON.parse(fin.match(/<script id="dashboard-config" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  if (rec.steps[0].titulo !== P) { bad(lbl + " payload corrompido na volta"); continue; }
  ok("payload " + lbl + " INERTE (delta 0 script; JSON.parse devolve string identica)");
}

if (/replace\(\/\[&<>"'\]\/g/.test(noC)) ok("esc() runtime cobre & < > dquote squote"); else bad("esc() set incompleto");
if (/\.cmd-code"\)\.textContent\s*=\s*s\.comando/.test(noC)) ok("comando via textContent (nao innerHTML)"); else bad("comando nao via textContent");

console.log("\n" + (fail ? ">>> RESULTADO: FALHA" : ">>> RESULTADO: TODOS OS TESTES PASSARAM"));
process.exit(fail ? 1 : 0);
