# Workflow: Onboarding de Cliente [SUA EMPRESA]

## Contexto do Negócio — [SUA EMPRESA]

Este workflow atende a **[SUA EMPRESA]** — Software House AI-Native + Agência de Lançamento com IA + Consultoria & Educação. A dona é **[DONO]** (solo founder, Barueri/SP). Slogan: "Inteligência que move."

**[suas verticais de negócio] de receita:**
1. **Software House AI-Native:** MVP/SaaS Builder ([range de ticket]), AI Agents (R$ 3,5k–12k), Dashboards (R$ 4k–15k), Landing Pages (R$ 2,5k–8k)
2. **Agência de Lançamento com IA:** Arquitetura de Lançamento (R$ 8k–20k), Co-produção (fee + %), Pacote de Conteúdo (R$ 2,5k–6k), Relatório de Métricas (R$ 800–2,5k)
3. **Consultoria & Educação:** AI Business Architecture ([range de ticket]), Mentoria IA (R$ 5k–25k)

**Clientes em atenção:** [especialista-exemplo-1], [especialista-exemplo-2], [cliente-exemplo] [empresa-cliente], [DONO], [SUA EMPRESA].

**CEO da operação de IA:** [CEO] (nome da [DONO] pro agente `/ceo`).

**Regra central:** tecnologia + estratégia + IA sempre juntas.

### Regras inegociáveis
- Tom premium, técnico, estratégico.
- Acentuação completa; zero hífens (—) em copy pública.
- Output final vai pro [CEO] revisar antes de entregar pra [DONO].
- Consultar `wiki/content/brand-voice.md`, `wiki/content/audience.md`, `wiki/products/overview.md`.

---

## Para que serve

Padroniza o onboarding de todo cliente novo [SUA EMPRESA] desde o momento em que o contrato é assinado até o primeiro entregável funcionar. Elimina a situação "cliente fechou mas ninguém sabe o que fazer" e garante experiência premium consistente nos [suas verticais de negócio].

**Output final:** cliente onboarded em até 7 dias úteis, com expectativas claras, acesso configurado, kickoff realizado e primeira entrega visível.

## Quando usar

- Cliente acabou de assinar contrato via Eduardo
- Projeto de qualquer um dos [suas verticais de negócio] (Software House / Lançamento / Consultoria)
- Inclusive contratos recorrentes (retainer de AI Agents, Co-produção, Mentoria)

## Quando NÃO usar

- Pedido de orçamento (usar workflow comercial: Nina → Valeria → Eduardo)
- Renovação de contrato existente (Eduardo cuida direto)
- Alteração de escopo em projeto em andamento (Danilo + [CEO] gerenciam)

---

## Fases do Workflow

### Fase 1 — Recebimento do cliente (Dia 0, no máximo 24h após assinatura)
**Agente líder:** [[../agents/eduardo]] (Eduardo)

Eduardo notifica o time assim que contrato é assinado. Entrega:
- Contrato assinado arquivado em `wiki/clients/[cliente]/contrato-assinado-vN.md`
- Briefing original da Nina em `wiki/clients/[cliente]/briefing.md`
- Proposta aprovada em `wiki/clients/[cliente]/proposta-aprovada.md`
- Ficha-resumo com: braço, ticket, prazo, time alocado, condições de pagamento

### Fase 2 — Kickoff Interno (Dia 1, até 24h depois da Fase 1)
**Agente líder:** [[../agents/ceo]] ([CEO])

[CEO] monta o time do projeto e dispara kickoff interno. Verifica:
- Time alocado disponível pro cronograma
- Agentes do projeto já leram briefing e proposta
- Riscos identificados antes de ir pro cliente
- Quem é o ponto focal interno com o cliente (geralmente [CEO] + 1 agente técnico/estratégico)

Entrega: `wiki/clients/[cliente]/kickoff-interno.md`

### Fase 3 — Welcome Pack pro Cliente (Dia 1–2)
**Agente líder:** [[../agents/danilo]] (Danilo)

Danilo envia welcome pack premium ao cliente contendo:
- E-mail de boas-vindas assinado pela [DONO]
- Apresentação do time alocado (com fotos/perfis quando possível)
- Cronograma detalhado do projeto
- Canais de comunicação (WhatsApp específico, e-mail, Slack se aplicável)
- Acessos necessários (formulário estruturado pra cliente enviar credenciais, assets, info)
- Primeiro compromisso agendado (call de kickoff com cliente)

Copy do welcome pack: tom premium, sem hífens (—) em copy pública, acentuação completa.

Entrega: `wiki/clients/[cliente]/welcome-pack-enviado.md` com timestamp.

### Fase 4 — Kickoff com Cliente (Dia 3–4)
**Agentes envolvidos:** [[../agents/ceo]] ([CEO]), [[../agents/danilo]] (Danilo) + agente técnico/estratégico do projeto

Call de kickoff (60–90 min) com cliente pra:
- Alinhar expectativas (revisar escopo, prazos, entregáveis, responsabilidades)
- Revisar cronograma e aprovar marcos
- Coletar info faltante (se welcome pack não trouxe tudo)
- Responder dúvidas e ajustar onde necessário
- Combinar cadência de comunicação (call semanal? daily no WhatsApp?)

Entrega: `wiki/clients/[cliente]/kickoff-ata.md`

### Fase 5 — Configuração & Acesso (Dia 4–5)
**Agente líder:** depende do braço:
- **Software House:** [[../agents/victor]] (Victor) + [[../agents/gabriel]] (Gabriel) — configuram repositório, ambientes, credenciais, stack
- **Lançamento:** [[../agents/pedro]] (Pedro) — configura CRM/GoHighLevel + acessos
- **Consultoria:** [[../agents/danilo]] (Danilo) — prepara material da consultoria + agendas

Entrega: `wiki/clients/[cliente]/acessos-configurados.md`

### Fase 6 — Primeira Entrega Visível (Dia 5–7)
**Agente líder:** varia por braço:
- **Software House:** [[../agents/thiago]] — entrega primeiro artefato (arquitetura validada, wireframe, MVP primeira tela)
- **Lançamento:** [[../agents/marina]] + [[../agents/ana-paula]] — entregam calendário editorial + primeiros carrosséis ou [[../agents/andre]] — entrega mapa do funil aprovado
- **Consultoria:** [[../agents/ceo]] ([CEO]) ou [[../agents/patricia]] — entrega primeira sessão de AI Business Architecture ou módulo inicial de mentoria

Cliente vê progresso real em até 7 dias. Isso blinda a confiança.

Entrega: `wiki/clients/[cliente]/primeira-entrega.md` + link/artefato.

### Fase 7 — Setup de Retenção (Dia 7, imediato após Fase 6)
**Agente líder:** [[../agents/isabela]] (Isabela)

Isabela registra cliente no sistema de retenção:
- Adiciona em `wiki/clients/overview.md` como ativo
- Define cadência de check-in (semanal, quinzenal, mensal dependendo do projeto)
- Marca alertas de marco importante pro acompanhamento
- Se recorrente (retainer AI Agents, Co-produção, Mentoria): marca data de renovação (30 dias antes da expiração)

Entrega: cliente ativo no dashboard, primeira check-in agendada.

---

## Agentes/Squads acionados (resumo)

| Fase | Agente líder | Apoio |
|------|--------------|-------|
| 1. Recebimento | [[../agents/eduardo]] | — |
| 2. Kickoff Interno | [[../agents/ceo]] ([CEO]) | Time do projeto |
| 3. Welcome Pack | [[../agents/danilo]] | [[../agents/ceo]] revisa copy |
| 4. Kickoff Cliente | [[../agents/ceo]] + [[../agents/danilo]] | Agente técnico/estratégico |
| 5. Configuração & Acesso | varia por braço | — |
| 6. Primeira Entrega | varia por braço | — |
| 7. Setup Retenção | [[../agents/isabela]] | — |

## Output final

Cliente **onboarded em até 7 dias úteis** com:
- Welcome pack enviado e assimilado
- Kickoff feito e ata registrada
- Acessos configurados
- Primeira entrega visível (quick win)
- Próximos marcos definidos e agendados
- Sistema de retenção ativo com cadência de check-in

Cliente não pergunta "cadê meu projeto?" porque já viu entrega real em 7 dias.

## Prioridade [SUA EMPRESA]

**ALTA — ativo imediatamente**. Este workflow é pré-requisito pra não queimar cliente recém-fechado. Com pipeline da Tatiana começando a trazer B2B novo, onboarding profissional é o que separa "[EMPRESA] premium" de "mais uma agência".

## Conexões

- **Alimenta:** [[../../operations/decisions]] (decisões de cadência, padrões de welcome pack) + [[../../log]]
- **Recebe input de:** [[../../clients/overview]] (pra saber quem está onboarding nesse momento) + contratos assinados pelo Eduardo
- **Combinado com:** workflow-captacao-b2b (que entrega cliente fechado pra este workflow começar)

## Exemplo de uso real [SUA EMPRESA]

**[DONO] pro [CEO]:** "Fechou o cliente da [cliente-exemplo] [empresa-cliente]. Roda onboarding."

**[CEO] dispara `/workflow-onboarding-cliente`:**
- Fase 1: Eduardo arquiva contrato, monta ficha-resumo
- Fase 2: [CEO] faz kickoff interno com Thiago, Victor, Gabriel (projeto é MVP SaaS)
- Fase 3: Danilo envia welcome pack (com apresentação do time técnico)
- Fase 4 (dia 3): call kickoff — [CEO] + Danilo + Thiago com [cliente-exemplo]
- Fase 5: Victor configura repo + Supabase + stack
- Fase 6 (dia 7): Thiago entrega arquitetura validada + wireframe da home do SaaS
- Fase 7: Isabela marca check-in semanal, próximo alerta no marco de entrega do MVP

**Output:** [cliente-exemplo] onboarded, vendo entrega concreta, confiando no time.

## Fonte da skill
Prompt completo em `.claude/commands/workflow-onboarding-cliente.md`

$ARGUMENTS
