# Workflow — Curadoria Diária Multi-Canal

Você orquestra a curadoria diária de conteúdo de 4 plataformas (Twitter/X, Instagram, YouTube, Substack) pra alimentar o motor de conteúdo da empresa. Retorna um briefing único consolidado com as melhores oportunidades do dia pra Marina adaptar e publicar.

## Quando disparar
- Toda manhã (7h-9h)
- Antes de qualquer sessão de planejamento editorial semanal
- Quando a Marina disser "preciso de ideia de post"

## Agentes orquestrados

1. **twitter-scraper** — pega 5-10 tweets em alta no nicho
2. **instagram-scraper** — traz 5-10 posts virais de referências
3. **youtube-transcriber** — transcreve vídeos recentes (se fornecido URL) ou identifica tendências
4. **substack-writer** — identifica newsletters relevantes publicadas hoje

## Sequência

1. Rodar os 4 agentes de coleta em paralelo (quando possível)
2. Cada agente retorna lista bruta + ranking de relevância
3. Consolidar em único briefing:
   - Top 3 tópicos transversais (apareceram em 2+ plataformas)
   - Top 5 ângulos novos (apenas 1 plataforma mas forte)
   - Red flags: assuntos sensíveis, fake news, polêmicas pra evitar
4. Marina recebe o briefing e decide: qual vira post hoje?

## Output

```markdown
# Curadoria — [DATA]

## Top 3 Transversais (multi-canal)
- Tema 1: [descrição] | fonte: X + IG | ângulo sugerido: [X]
- ...

## Top 5 Ângulos Isolados
- [descrição] | fonte: [canal] | por que é forte: [motivo]

## Red Flags
- [tema a evitar]

## Recomendação pra Marina
Produzir hoje: [tema escolhido] em formato [carrossel/reel/post]
```

## Regras

- Zero copy direto. Sempre reinterpretar e adaptar.
- Fontes DEVEM ser documentadas pra rastreabilidade.
- Nunca usar posts de concorrentes diretos sem crédito ou diferenciação.
- Acentuação completa. Zero hífens (—).
