---
cliente: David — Wise Pro Academy (wiseproacademy.io)
tipo: BA
data: 2026-06-15
status: BLUEPRINT (não é fonte de cópia — uso permitido: mapa de tópicos + formato + cobertura)
---

# Provas CSL — material de referência enviado pelo David (15/jun/2026)

> **REGRA DE USO (CEO da escola):** este material é **blueprint de tópicos e formato**, NÃO fonte de cópia verbatim.
> O motor de simulados gera questões **ORIGINAIS** ancoradas nos códigos oficiais (780 CMR, IRC, IBC, IECC, OSHA)
> e **VERIFICA cada gabarito** contra a seção oficial do código antes de publicar. Questão sem verificação = vai pra revisão humana, não pro aluno.
> Motivo: (1) IP — questões reais são protegidas (banco Prometric); (2) qualidade — estas provas são de 2020-2022, com erros de digitação
> e possíveis gabaritos desatualizados/errados. Publicar gabarito errado ensina errado e queima a escola. Verificação é o nosso diferencial.

Fonte: David colou no chat 4 formulários Google (conta david.youtuber@outlook.com). Reproduzidos abaixo como referência de cobertura.
Exames: CSL final exam 2020 v6 · 2021 v7 · 2021 v7 Restricted · 2022 v8 Unrestricted (julho 2022).

Os textos verbatim das 4 provas estão preservados na transcrição/sessão desta data. Resumo de cobertura abaixo
(o que o motor precisa cobrir), pra orientar o Arquiteto sem reproduzir o banco inteiro fora de contexto.

## Categorias e contagem-alvo (do briefing + reunião)
- **IRC (residencial):** referência tem ~18 blocos de 7 → meta David ~30 blocos.
- **IBC (comercial):** referência ~19 blocos de 7 → meta ~30.
- **IECC / código de energia ("ECC"):** referência ~6 blocos de 7 → meta ~15.
- **OSHA (segurança do trabalho):** presente nas provas (competent person, fall restraint, lead exposure, fire extinguisher, ladder, etc.).
- **AAB / acessibilidade (521 CMR):** presente (church/mosque/temple, racquetball court, conversão de uso).
- **Exames completos (Final/CS Exam):** 70-75 questões cada → meta ~15 provas completas.

## Temas recorrentes observados nas 4 provas (mapa pro gerador)
Fundações e backfill · footings (profundidade/slope) · slab-on-grade (areia, fill depth) · masonry foundation wall height ·
snow/wind load Massachusetts (Groton, Boston) · climate zones (Big Horn WY, Helena MT) · IECC R-values/SHGC/U-factor ·
egress doors (occupant load 50+) · attic access opening · habitable attic live load · notch/bore em joists/rafters ·
collar ties · top plate splice (SDC B) · chimney/fireplace (firebox depth, cricket/saddle) · asphalt shingles (fasteners, slope, drip edge) ·
type of construction (I-V, heavy timber) · use groups (R-1/R-2/R-3/R-4, A-2, H-1..H-4) · certificate of occupancy ·
permit valuation / quando NÃO precisa permit · stop work order · OSHA (competent person, fall restraint 3000 lb anchorage,
lead 50 µg/m³, fire extinguisher grade, ladder ratio, pedestrian protection/barrier) · AAB compliance thresholds (30%, work performance) ·
steel (W8x15 weight, high-strength bolt tightening, column diameter) · glazing/skylight slope · sunroom glazing % ·
natural light/ventilation 4-8% · standpipe/sprinkler · photovoltaic (UL 1703).

## Sinais de alerta (achados ao ler — pro time tratar)
- Várias questões **duplicadas** entre versões (ex: "thickness of sand under basement slab" aparece 2x na mesma prova).
- Opções **mal digitadas / truncadas** ("D) The state mechanical coded- The state mechanical code").
- Mistura de unidades e gabaritos que **precisam ser conferidos** contra a edição vigente do código (780 CMR 9th edition / IRC-IBC-IECC correntes).
- → O pipeline DEVE: pra cada questão, achar a seção do código, confirmar o valor/resposta, anexar a citação, e marcar `verificado: true/false`.

## Próximo passo
- Arquiteto desenha o motor de geração+verificação no ADR (item-rei do build).
- David vai mandar mais material pelo WhatsApp (mais provas/modelos) — anexar aqui conforme chegar.
- Quando o repo do aluno existir, mover este arquivo + os verbatim pra `~/meensinaai-ba-david-wisepro/raw/provas-referencia/`.
