# DECISIONS — Decisões aprovadas pelo dono

> Toda decisão não-óbvia aprovada pelo dono fica aqui. Não revisitar a cada sessão.

## 2026-06-25

- **Funil automatizado no GHL (3 workflows publicados):** (1) "Lead novo WhatsApp → Novo Lead" = Customer Replied WhatsApp cria oportunidade no estágio Novo Lead, origem "Facebook Ads", e após 24h sem nova resposta move pra "Não respondeu"; (2) "Lead respondeu → Já respondeu" = quando o lead manda a 2ª mensagem (gate por etiqueta `lead-1a-msg-recebida`) move pra "Já respondeu". Tudo com "allow move to previous stage = OFF" pra proteger a ordem e não puxar os 389 do Follow Up pra trás.
- **Ads do Facebook ativados** (25/06) mandando lead direto pro WhatsApp; os 7 leads do dia foram pro Novo Lead manualmente (via Manage Opportunities).

## 2026-06-23

- **CRM real = GoHighLevel** (não o Pedro). 389 leads importados no estágio Follow Up do "Marketing Pipeline", separados em Smart Lists Leads Frios (286) e Leads Aquecidos (102).
- **WhatsApp via API oficial da Meta dentro do GoHighLevel** (modo coexistência, número fica no celular), US$ 10/mês. Z-API sai dessa abordagem; recuperação de carrinho será religada por dentro do GHL.
- **Templates de abordagem:** sempre pt-BR, categoria Marketing, com opt-out "responda SAIR", sem preço dentro. 2 criados e aprovados: frio (genérico) e quente (personaliza nome via {{1}}).
- **Acesso da Alessandra:** User limitado (sem settings/billing) — operação de leads, não admin.
- **Estratégia de disparo:** NÃO disparar os 389 de uma vez. Verificar Meta Business primeiro (submetido 2026-06-23) e aquecer o número aos poucos (começar pelos aquecidos, buscar resposta).
- **Verificação Meta:** feita pela entidade legal Wise Pro LLC (EIN + registro MA) na aba "Verify yourself or an organization" → Business portfolio (a do Security Center estava com bug "Sorry, something went wrong").

## 2026-06-22

- **Domínio:** manter o site antigo (azul) no ar em wiseproacademy.io (Hostinger) e usar o link `wiseproacademy.vercel.app` pro site novo. NÃO migrar o domínio agora (só se o David pedir; passo de DNS documentado no CLAUDE.md).
- **Separação de portais:** quem compra Project Manager NÃO acessa o portal do Construtor, e vice-versa. Acesso é por matrícula do produto comprado (já enforçado de ponta a ponta).
- **Prova completa = formato real da CSL:** o aluno pula questões, navega livre, foca nas que tem certeza e só vê a nota ao finalizar (sem gabarito no meio). Quiz por categoria continua sendo o modo treino (corrige na hora).
- **Hospedagem dos vídeos das aulas:** Google Drive é PROVISÓRIO (risco de quota no curso pago). Decisão: migrar pro Panda Video pro lançamento. O player já aceita YouTube/Drive/Panda.
