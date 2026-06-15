# Schema unico da questao (fonte de verdade)

> Usado IDENTICO no Supabase (`quiz_questions`), no MCP (`wisepro-mcp`) e no loader (`scripts/loader-questoes.mjs`).
> Mudou o schema? Muda nos 3 lugares ao mesmo tempo.

```json
{
  "id": "irc-001",
  "category": "IRC|IBC|IECC|OSHA|AAB",
  "subtopic": "egress",
  "question": "texto da pergunta",
  "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
  "correct": "A",
  "explanation": "por que essa e a correta",
  "code_reference": "IRC R311.2 / 780 CMR 9th ed",
  "source_url": "https://fonte-oficial...",
  "difficulty": "iniciante|intermediario|avancado",
  "verified": true,
  "verifier_note": "confirmado contra IRC 2021 R311.2"
}
```

## Tabela `quiz_questions` (Supabase)
- `id` text PK (ex: `irc-001`)
- `category` text NOT NULL (`IRC|IBC|IECC|OSHA|AAB`)
- `subtopic` text
- `question` text NOT NULL
- `options` jsonb NOT NULL (`{A,B,C,D}`)
- `correct` text NOT NULL (`A|B|C|D`)
- `explanation` text NOT NULL
- `code_reference` text NOT NULL
- `source_url` text
- `difficulty` text NOT NULL (`iniciante|intermediario|avancado`)
- `verified` boolean NOT NULL DEFAULT false
- `verifier_note` text
- `created_at` timestamptz DEFAULT now()

## Regra de ouro
- **So `verified=true` chega no aluno.** O motor-quiz-csl filtra SEMPRE `verified=true`.
- Questao `verified=false` = fila de revisao humana.

## Tabelas auxiliares
- `quiz_attempts` — tentativas do aluno (aluno, questao, resposta, acertou, timestamp).
- `enrollments` — quem comprou qual produto (destrava portal se for Construtor).
- `leads` — captura pre-Stripe (nome/email/telefone/produto/status).
- `checkout_events` — checkout_iniciado / pago / abandonado.
