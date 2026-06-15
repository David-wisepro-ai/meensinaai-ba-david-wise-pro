# FORMATO DE RECEBIMENTO — contrato dos lotes de questoes

> Este e o contrato que a **Me Ensina AI** usa pra montar cada lote de questoes
> antes de enviar pro David. O schema e IDENTICO ao
> `meu-negocio/portal-aluno/schema-quiz.md` (fonte de verdade unica — mudou la,
> muda aqui). O loader (`scripts/loader-questoes.mjs`) e o comando
> `/carregar-questoes` validam exatamente estes campos.

## 1. Nome do arquivo

- Termina em `.json`.
- Sugestao de padrao (nao obrigatorio, ajuda a organizar):
  `<categoria>-onda-<n>.json` em minusculas.
  Ex: `irc-onda-2.json`, `osha-onda-1.json`, `prova-completa-01.json`.

## 2. Estrutura do arquivo

O arquivo e **um array JSON de questoes** OU um objeto com a chave `questions`.
As duas formas funcionam:

```json
[ { ...questao... }, { ...questao... } ]
```

ou

```json
{ "questions": [ { ...questao... }, { ...questao... } ] }
```

## 3. Schema de CADA questao (todos os campos)

| Campo            | Obrigatorio | Tipo    | Regra / valores aceitos                                  |
|------------------|-------------|---------|----------------------------------------------------------|
| `id`             | sim         | texto   | UNICO e estavel (ex: `irc-001`). E a chave anti-duplicata. |
| `category`       | sim         | texto   | um de: `IRC` `IBC` `IECC` `OSHA` `AAB`                   |
| `subtopic`       | nao         | texto   | ex: `egress`                                             |
| `question`       | sim         | texto   | o enunciado da pergunta                                  |
| `options`        | sim         | objeto  | exatamente as chaves `A` `B` `C` `D`                     |
| `correct`        | sim         | texto   | um de: `A` `B` `C` `D`                                   |
| `explanation`    | sim         | texto   | por que a alternativa correta esta certa                 |
| `code_reference` | sim         | texto   | ex: `IRC R311.2 / 780 CMR 9th ed`                        |
| `source_url`     | nao         | texto   | link da fonte oficial                                    |
| `difficulty`     | sim         | texto   | um de: `iniciante` `intermediario` `avancado`            |
| `verified`       | sim         | boolean | `true` = vai pro aluno; `false` = fila de revisao        |
| `verifier_note`  | nao         | texto   | ex: `confirmado contra IRC 2021 R311.2`                  |

### Regra de ouro

- **So `verified: true` chega no aluno.** Questao com `verified: false` e
  carregada na fila de revisao e NUNCA aparece no portal.
- `id` precisa ser **unico e estavel**: e por ele que o carregamento e
  idempotente (rodar 2x nao duplica; reusar o mesmo `id` ATUALIZA a questao).

## 4. Exemplo de 1 questao (copie e adapte)

```json
{
  "id": "irc-001",
  "category": "IRC",
  "subtopic": "egress",
  "question": "Qual a largura livre minima exigida para uma porta de saida de emergencia em uma residencia unifamiliar?",
  "options": {
    "A": "28 polegadas",
    "B": "30 polegadas",
    "C": "32 polegadas",
    "D": "36 polegadas"
  },
  "correct": "C",
  "explanation": "O IRC exige no minimo 32 polegadas de largura livre para a porta de saida principal, medidas com a porta aberta a 90 graus.",
  "code_reference": "IRC R311.2 / 780 CMR 9th ed",
  "source_url": "https://codes.iccsafe.org/content/IRC2021P1/chapter-3-building-planning",
  "difficulty": "intermediario",
  "verified": true,
  "verifier_note": "confirmado contra IRC 2021 R311.2"
}
```

## 5. Arquivo de lote completo (exemplo minimo)

```json
[
  {
    "id": "irc-001",
    "category": "IRC",
    "subtopic": "egress",
    "question": "...",
    "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
    "correct": "C",
    "explanation": "...",
    "code_reference": "IRC R311.2",
    "source_url": "https://...",
    "difficulty": "intermediario",
    "verified": true,
    "verifier_note": "confirmado contra IRC 2021 R311.2"
  }
]
```
