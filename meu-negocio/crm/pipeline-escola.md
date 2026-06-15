# Pipeline da escola (sobre o Pedro / Me Ensina AI Solutions)

> CRM = o nosso (decisao Fabio 2026-06-15). NAO reconstruir o Pedro — carimbar com este pipeline.

## Etapas
```
lead novo -> atendimento (WhatsApp) -> checkout iniciado -> nao pagou (recuperacao) -> aluno (pagou) -> ativo -> upsell
```

## 3 produtos + upsell
1. **Project Manager** (~US$ 250, alguns US$ 497) — porta de entrada.
2. **Curso de Construtor** (US$ 597, presencial 6 dias) — principal; destrava o portal de simulados.
3. **Wise Day** (US$ 497, 1 dia presencial com David) — premium pratico.

Upsell: Project Manager -> Construtor -> Wise Day.

## Quem opera
- `crm-escola-coordenador` orquestra o funil dentro do Pedro.
- `funil-checkout-escola` emite os eventos (iniciado/pago/abandonado).
- `recuperacao-carrinho` cuida do "nao pagou".
