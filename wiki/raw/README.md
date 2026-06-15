# raw/ — Pasta de Material Bruto

> Você joga material aqui. CEO IA processa, distribui pelo wiki, e te devolve resumo + ações tomadas.

## Como funciona

1. Você coloca arquivo em alguma subpasta (transcricoes/, audios/, screenshots/, etc)
2. Fala pro CEO IA: **"Zuck, olha o que coloquei em raw/<subpasta>/<arquivo>"**
3. CEO IA executa o **PROTOCOLO DE INGESTÃO** (definido no CLAUDE.md):
   - Lê o arquivo
   - Avalia relevância (pra quem do time? que departamento?)
   - Compila: extrai e distribui no wiki (atualiza páginas existentes ou cria novas)
   - Aciona agente, Chief de squad, ou departamento relevante
   - Atualiza index, log, pendências
   - Te devolve resumo do que fez

## Subpastas

| Pasta | O que vai ali |
|---|---|
| `transcricoes/` | Transcrições de reuniões (Otter, Fathom, Zoom, manual) |
| `audios/` | Áudios brutos (.ogg, .mp3, .m4a) — CEO transcreve via Whisper antes de processar |
| `screenshots/` | Prints de tela (analytics, dashboards, conversas, anúncios concorrentes) |
| `docs/` | PDFs, contratos, planilhas, especificações de cliente, briefings |
| `ferramentas/` | Docs de ferramentas que o aluno usa (APIs, integrações, manuais) |
| `concorrentes/` | Material de concorrentes (sites, anúncios, posicionamento) |
| `reunioes/` | Notas de reuniões com clientes finais (não onboarding) |
| `artigos/` | Artigos lidos, conteúdo de referência, livros (resumos) |

## Naming convention

Sempre use formato: `YYYY-MM-DD-<descricao-curta>.<ext>`

Exemplos:
- `transcricoes/2026-05-08-reuniao-cliente-acme.md`
- `audios/2026-05-08-call-vendas-joao.m4a`
- `screenshots/2026-05-08-funnel-meta-ads.png`
- `docs/2026-05-08-contrato-modelo-acme.pdf`

## Regra de ouro

- Nunca delete arquivos de raw/ manualmente. CEO IA marca como "processado" no log.
- Material sensível (PII, tokens, senhas) NÃO vai aqui. Use `~/Documents/_secrets/` ou variável de ambiente.
- Se arquivo é grande (>50MB), avise o CEO antes de jogar — pode estar em .gitignore.
