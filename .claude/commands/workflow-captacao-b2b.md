# Workflow: Captação B2B [SUA EMPRESA]

## Contexto do Negócio — [SUA EMPRESA]

Este workflow atende a **[SUA EMPRESA]** — Software House AI-Native + Agência de Lançamento com IA + Consultoria & Educação. A dona é **[DONO]** (solo founder, Barueri/SP). Slogan: "Inteligência que move."

**[suas verticais de negócio] de receita:**
1. **Software House AI-Native:** MVP/SaaS Builder ([range de ticket]), AI Agents (R$ 3,5k–12k), Dashboards (R$ 4k–15k), Landing Pages (R$ 2,5k–8k)
2. **Agência de Lançamento com IA:** Arquitetura de Lançamento (R$ 8k–20k), Co-produção (fee + %), Pacote de Conteúdo (R$ 2,5k–6k), Relatório de Métricas (R$ 800–2,5k)
3. **Consultoria & Educação:** AI Business Architecture ([range de ticket]), Mentoria IA (R$ 5k–25k)

**Público B2B:** lançadores/co-produtores, agências digitais, empresas em transformação digital. Perfil: "fatura mas trava na operação".

**Dor da [DONO]:** pipeline vazio, aquisição B2B especialmente difícil (ticket alto, ciclo longo, decisão compartilhada).

**CEO da operação de IA:** [CEO] (nome da [DONO] pro agente `/ceo`).

**Regra central:** tecnologia + estratégia + IA sempre juntas.

### Regras inegociáveis
- Tom premium, técnico, estratégico.
- Acentuação completa; zero hífens (—) em copy pública.
- Output final vai pro [CEO] revisar antes de entregar pra [DONO].
- Consultar `wiki/content/brand-voice.md`, `wiki/content/audience.md`, `wiki/products/overview.md`.

---

## Para que serve

Sequencia a prospecção B2B ativa da [SUA EMPRESA] do primeiro toque no LinkedIn até o contrato assinado. Resolve a dor principal declarada pela [DONO] no onboarding (**pipeline vazio**) atacando ativamente os 3 perfis B2B da [EMPRESA].

**Output final:** contrato B2B assinado em 4–8 semanas (média do ciclo de venda B2B [EMPRESA]).

## Quando usar

- Meta semanal/mensal de novos clientes B2B (agência, lançador, empresa em transformação)
- Lançamento de oferta B2B nova (ex: novo pacote de AI Agents B2B)
- Expansão pra novo segmento B2B testado (quando Tatiana descobriu novo perfil que responde bem)

## Quando NÃO usar

- Prospecção B2C (usar `/workflow-crescimento` + ads + conteúdo)
- Inbound já quente (pular direto pra Nina fazer discovery)
- Renovação de cliente B2B existente (Eduardo + Isabela cuidam)

---

## Fases do Workflow

### Fase 1 — Planejamento Semanal (Segunda, 60 min)
**Agente líder:** [[../agents/ceo]] ([CEO])

[CEO] define foco da semana com base em dados da semana anterior:
- Qual dos 3 perfis B2B atacar (agência / lançador / empresa em transformação)
- Qual gatilho usar (vaga técnica, funding, post, case recente)
- Meta numérica (prospects, respostas, calls, handoffs)
- Oferta primária (qual serviço [EMPRESA] puxar primeiro)

Entrega: briefing semanal em `wiki/clients/outbound/plano-[YYYY-WW].md`.

### Fase 2 — Montagem de Lista (Segunda–Terça)
**Agente líder:** [[../agents/tatiana]] (Tatiana)

Tatiana monta lista de 50–100 prospects qualificados no LinkedIn Sales Navigator com:
- Dado mínimo (nome, cargo, empresa, LinkedIn, site)
- Gatilho verificável (o que justifica a abordagem)
- Score de prioridade (A/B/C)

Apoio: [[../agents/henrique]] pode contribuir com dados de mercado B2B.

Entrega: `wiki/clients/outbound/lista-[YYYY-WW].md`.

### Fase 3 — Criação de Sequências (Terça)
**Agente líder:** [[../agents/tatiana]] (Tatiana)

Tatiana escreve:
- Mensagem inicial personalizada (template por perfil + variáveis)
- Follow-up 1 (3 dias depois)
- Follow-up 2 (1 semana depois)
- Breakup message (2 semanas depois)

Apoio: [[../squads/copy-squad]] pra variações A/B testáveis.

Entrega: sequências em `wiki/clients/outbound/sequencias-[YYYY-WW].md`.

### Fase 4 — Disparo e Monitoramento (Quarta–Sexta)
**Agente líder:** [[../agents/tatiana]] (Tatiana)

Tatiana dispara mensagens iniciais e monitora respostas em tempo real. Registra:
- Resposta positiva (interesse em conversar)
- Resposta negativa (já tem / não é o momento / fora de escopo)
- Sem resposta (entra em follow-up)

Prospects que respondem positivamente viram pasta `wiki/clients/[prospect]/` com status "aguardando discovery".

### Fase 5 — Discovery dos Interessados (durante a semana)
**Agente líder:** [[../agents/nina]] (Nina)

Nina conduz discovery completo com framework das 10 dimensões em cada prospect que respondeu positivamente. Entrega briefing estruturado em `wiki/clients/[prospect]/briefing.md`.

Tempo estimado: 30–60 min de call + 30 min de documentação por prospect.

### Fase 6 — Qualificação BANT (imediato pós-discovery)
**Agente líder:** [[../agents/rodrigo]] (Rodrigo)

Rodrigo lê briefing da Nina e faz qualificação BANT:
- **B**udget — orçamento confirmado ou faixa realista?
- **A**uthority — decisor identificado? envolvidos conhecidos?
- **N**eed — dor real ou "gostaria de ter"?
- **T**iming — urgência real ou "algum dia"?

Entrega: `wiki/clients/[prospect]/qualificacao-bant.md` com veredito GO / NO-GO / NURTURE.

### Fase 7 — Proposta Comercial (se GO)
**Agente líder:** [[../agents/valeria]] (Valeria)

Valeria gera proposta adaptada ao braço primário identificado pela Nina:
- Versão única se briefing é claro
- 2 versões (enxuta + completa) se orçamento apertado ou decisão compartilhada

Tempo estimado: 15–30 min por proposta.

Entrega: `wiki/clients/[prospect]/proposta-vN.md`.

### Fase 8 — Revisão CEO + Envio
**Agente líder:** [[../agents/ceo]] ([CEO])

[CEO] revisa proposta antes de enviar ao cliente. Ajusta se necessário. [DONO] ou [CEO] envia.

### Fase 9 — Follow-up + Fechamento
**Agentes envolvidos:** [[../agents/rodrigo]] (Rodrigo) + [[../agents/juliana]] (Juliana)

Rodrigo faz follow-up comercial ativo (3–5 dias após envio). Juliana entra se lead ficar frio (2+ semanas sem resposta).

[[../agents/pedro]] registra cada interação no CRM (GoHighLevel).

### Fase 10 — Contrato e Onboarding
**Agente líder:** [[../agents/eduardo]] (Eduardo)

Cliente aprova proposta → Eduardo gera contrato → [CEO] revisa → envio via Autentique → cliente assina → dispara `/workflow-onboarding-cliente`.

---

## Agentes/Squads acionados (resumo)

| Fase | Agente líder | Apoio |
|------|--------------|-------|
| 1. Plano semanal | [[../agents/ceo]] ([CEO]) | [[../agents/henrique]] |
| 2. Montagem de lista | [[../agents/tatiana]] | [[../agents/henrique]] |
| 3. Sequências | [[../agents/tatiana]] | [[../squads/copy-squad]] |
| 4. Disparo | [[../agents/tatiana]] | — |
| 5. Discovery | [[../agents/nina]] | — |
| 6. Qualificação BANT | [[../agents/rodrigo]] | — |
| 7. Proposta | [[../agents/valeria]] | [[../squads/hormozi-squad]] se reposicionamento |
| 8. Revisão + envio | [[../agents/ceo]] ([CEO]) | [DONO] final |
| 9. Follow-up | [[../agents/rodrigo]] + [[../agents/juliana]] | [[../agents/pedro]] |
| 10. Contrato + onboarding | [[../agents/eduardo]] | dispara workflow-onboarding-cliente |

## Output final

Contrato B2B assinado em 4–8 semanas (média).

Métricas do workflow (rastreáveis semanalmente):
- Prospects contatados
- Taxa de resposta (%)
- Calls agendadas
- Handoffs pra Nina
- Qualificações GO (BANT positivo)
- Propostas geradas
- Propostas aprovadas
- Contratos assinados
- Ticket médio B2B fechado

## Prioridade [SUA EMPRESA]

🔥 **CRÍTICA AGORA**. Este é o workflow que resolve a dor principal declarada pela [DONO] no onboarding (**pipeline vazio + aquisição manual**). Começa imediatamente com a Tatiana ativando prospecção semanal.

## Como usar pra [SUA EMPRESA]

**Meta inicial (primeiros 60 dias):**
- 50–100 prospects contatados/semana
- 10–15% taxa de resposta
- 1–3 handoffs pra Nina/semana
- 2–4 propostas geradas/mês
- 1 cliente B2B fechado/mês (cresce depois)

Depois de 60 dias, [CEO] calibra alvos com dados reais e ajusta ICP/gatilho.

**Segmentos prioritários nos primeiros 90 dias:**
1. Agências digitais de 10–30 pessoas que postaram vaga técnica (Perfil A)
2. Lançadores/co-produtores que publicaram case recente (Perfil B)
3. Empresas em transformação digital que mencionaram IA em posts/entrevistas (Perfil C)

## Conexões

- **Alimenta:** [[workflow-onboarding-cliente]] (quando contrato é assinado na Fase 10) + [[../../log]] + [[../../clients/overview]]
- **Recebe input de:** [[../../content/audience]] (perfis B2B) + [[../../products/overview]] (ofertas) + dados de mercado via [[../agents/henrique]]
- **Combinado com:** [[workflow-crescimento]] (gera autoridade orgânica que amplifica aceitação do outbound) + [[workflow-identificar-publico]] (valida ICP antes de atacar)

## Exemplo de uso real [SUA EMPRESA]

**[CEO], segunda-feira:** ativa `/workflow-captacao-b2b` — foco da semana: agências digitais SP/RJ com vaga técnica. Meta: 70 prospects, 5 calls.

**Semana em execução:**
- Segunda: [CEO] escreve plano. Tatiana começa lista.
- Terça: Tatiana fecha 72 prospects + sequências. [CEO] revisa.
- Quarta-Sexta: Tatiana dispara. 11 respostas.
- Quinta: Nina faz discovery de 4 prospects. Rodrigo qualifica 3 como GO.
- Sexta: Valeria gera 3 propostas. [CEO] revisa. [DONO] envia 2 (1 ficou em ajuste).

**Semanas 2–6:** follow-up, fechamento, contrato, onboarding. 1 cliente fechou em 5 semanas (ticket R$ 18k — AI Agents + Dashboard combo).

## Fonte da skill
Prompt completo em `.claude/commands/workflow-captacao-b2b.md`

$ARGUMENTS
