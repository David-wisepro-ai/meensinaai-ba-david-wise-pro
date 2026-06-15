# Mapa de upsell dos 3 produtos

> Ordem do funil (empresa.md): Project Manager -> Construtor -> Wise Day.
> O gatilho de elegibilidade e sempre um `enrollment` ativo do produto anterior.
> Operado por `crm-escola-coordenador` em cima das tabelas `enrollments` + `leads`.

## Escada de valor

| De (ja comprou) | Pra (oferta) | Preco da oferta | Por que sobe |
|-----------------|--------------|-----------------|--------------|
| Project Manager (~US$ 250) | Curso de Construtor (US$ 597) | US$ 597 | Construtor e o principal e DESTRAVA o portal de simulados (item-rei). |
| Curso de Construtor (US$ 597) | Wise Day (US$ 497) | US$ 497 | Wise Day e o premium pratico: 1 dia presencial com o David. |

Wise Day e topo da escada (sem upsell acima). Quem ja tem `enrollment` ativo de `wise_day` sai da fila de upsell.

## Gatilhos (amarrados no dado real)

Elegibilidade = existe `enrollments` com `product=X` e `active=true`, E nao existe `enrollments` ativo do produto-alvo.

### Upsell 1: Project Manager -> Construtor
- **Quando elegivel:** `enrollment` ativo de `project_manager`.
- **Quando oferecer:** quando o aluno conclui (ou esta acabando) o Project Manager. PM e ao vivo ~2 meses; sugestao de gatilho = aluno marcado como concluido OU 30 dias antes do fim da turma. Ate ter o campo de progresso, o coordenador usa a data de `enrollment.created_at` + janela definida pelo David.
- **Mensagem (angulo):** "Voce ja domina a gestao de projeto. O passo pra TIRAR a CSL e o Construtor, que destrava o portal de simulados." Foca no portal como diferencial.
- **Acao no pipeline:** etiqueta `upsell_construtor` no contato do Pedro + entra na fila do playbook. Quando paga, `enrollments.construtor active=true` (gerado pelo webhook) e o portal destrava automatico.

### Upsell 2: Construtor -> Wise Day
- **Quando elegivel:** `enrollment` ativo de `construtor`.
- **Quando oferecer:** depois que o aluno esta usando o portal / fez parte dos simulados (sinal de engajamento via `quiz_attempts`). Sugestao: oferecer apos X simulados feitos ou perto da data da prova oficial.
- **Mensagem (angulo):** "Pra fechar a preparacao, 1 dia presencial com o David (Wise Day) tira as ultimas duvidas na pratica." Premium, fecha a jornada.
- **Acao no pipeline:** etiqueta `upsell_wise_day` + fila do playbook. Pago -> `enrollments.wise_day active=true`.

## Regras do playbook de upsell

1. **So oferece o proximo se ainda nao tem.** Checa `enrollments` antes de disparar (nao oferecer Construtor pra quem ja e Construtor).
2. **Respeita a ordem.** Nao pula etapa: nao oferecer Wise Day pra quem so tem Project Manager. Wise Day so depois do Construtor.
3. **Lead que entra direto num produto avancado.** Se alguem compra Construtor sem ter PM, entra normal como aluno de Construtor e segue elegivel pro Wise Day. Nao force venda retroativa do PM (e porta de entrada, nao faz sentido vender depois).
4. **Upsell e novo checkout.** A oferta aceita passa pelo MESMO `funil-checkout-escola` (novo `checkout_iniciado` -> `pago`), entao todo upsell tambem fica rastreado em `checkout_events` e recuperavel se abandonar.
5. **Upsell abandonado tambem recupera.** Se o aluno inicia o checkout do upsell e nao paga, cai em `abandonado` e entra na `recuperacao-carrinho` igual a um lead novo.

## O que falta pro upsell rodar 100% automatico

- **Sinal de "concluiu o produto".** Hoje o sistema nao marca conclusao de PM nem de Construtor. Sem isso o gatilho de upsell e por data/manual. Ver pendencia P2 na `auditoria-pipeline.md`.
- **Disparo do playbook.** O canal de oferta (e-mail via Resend / WhatsApp) precisa ser definido. O coordenador identifica o elegivel; o disparo em si ainda nao esta codado.
