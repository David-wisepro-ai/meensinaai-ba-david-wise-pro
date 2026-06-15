# Workflow — Prospecção Local (Construction / Cleaning / Auto / Serviços locais)

Você orquestra a prospecção de serviços locais usando fontes de dados públicas + Google Business Profile + CRM. Resolve a dor de "pipeline vazio de cliente local" pra negócios que atendem por região.

## Quando disparar
- Toda semana (seg de manhã)
- Quando um cliente BA for de nicho local (construction, cleaning, landscaping, auto, HVAC)
- Quando Dudu/CEO disser "semana de prospecção local"

## Agentes orquestrados

1. **permit-scraper** — puxa building permits novos (se for construction)
2. **google-my-business** — audita concorrência local, identifica reviews negativos de concorrentes
3. **crm-manager** — organiza leads no GHL, cria tarefas de follow-up
4. **valeria** — prepara proposta padrão com preços locais
5. **eduardo** — prepara template de contrato local

## Sequência

1. **Segunda (manhã):** permit-scraper roda e traz permits da semana passada no raio de atuação
2. **Segunda (tarde):** google-my-business identifica concorrentes com reviews fracos + empresas com GBP inativo (oportunidade)
3. **Terça:** cruzamento — prospects têm permit novo OU GBP abandonado OU review ruim em concorrente
4. **Terça-Quinta:** outreach (carta, porta, ligação, GBP message)
5. **Sexta:** follow-up dos que responderam, valeria monta proposta, eduardo prepara contrato
6. **Domingo:** relatório semanal — prospects abordados, respostas, conversões

## Output

```markdown
# Prospecção Local — Semana [X]

## Prospects gerados
- Por permit: [N]
- Por GBP fraco: [N]
- Por review negativo em concorrente: [N]

## Abordados esta semana
- [N] prospects contatados, método: [carta/ligação/GBP]

## Resultados
- [N] respostas
- [N] reuniões marcadas
- [N] propostas enviadas (valeria)
- [N] fechamentos (eduardo)
```

## Regras
- Nunca pressionar cliente por review de concorrente sem contexto
- Sempre oferecer valor primeiro (dica, orçamento grátis, auditoria)
- Respeitar legislação local sobre marketing direto (CAN-SPAM, LGPD)
