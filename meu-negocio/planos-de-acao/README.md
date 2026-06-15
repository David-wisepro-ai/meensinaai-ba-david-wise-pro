# Planos de Ação

> Esta pasta contém TODOS os planos de ação do seu negócio. Cada plano é uma pasta separada com PRD, tarefas e entregas.

## Estrutura

```
planos-de-acao/
├── _ativo.txt                            # Aponta pro plano ativo (ex: "plano-002-campanha-memorial-day")
├── plano-001-discovery/                  # Primeiro plano gerado após onboarding
│   ├── prd.md                            # PRD que originou esse plano
│   ├── tarefas.md                        # Kanban de tarefas (a fazer, em andamento, concluídas)
│   └── entregas/                         # Arquivos produzidos pelos agentes
│       ├── relatorios/
│       ├── copies/
│       ├── sites/
│       └── ...
├── plano-002-campanha-memorial-day/
└── plano-003-site-institucional/
```

## Regra de UX importante

**1 plano ativo por vez.** O sistema avisa quando você tenta criar um plano novo sem concluir o atual.

Se você quiser mesmo trabalhar em 2 planos paralelos, dá pra forçar. Mas a recomendação é sempre: **conclui o que tem antes de começar o próximo.**

## Comandos disponíveis

| Comando | O que faz |
|---|---|
| `/plano-de-acao-90-dias` | Gera o primeiro plano após onboarding (`plano-001-discovery`) |
| `/novo-plano-de-acao` | Cria plano novo (ex: campanha de feriado, site institucional, lançamento de produto) |
| `/listar-planos` | Lista todos os planos com status |
| `/concluir-plano` | Marca plano ativo como concluído. Libera você pra criar novo. |
| `/pausar-plano` | Pausa plano ativo sem concluir. Você pode retomar depois. |
| `/retomar-plano <slug>` | Retoma um plano pausado |

## Status possíveis

- 🆕 **rascunho** — plano criado mas tarefas ainda não populadas
- 🔄 **em_andamento** — plano sendo executado
- ⏸️ **pausado** — pausado pelo cliente, pode retomar
- ✅ **concluido** — todas as tarefas concluídas ou cliente declarou pronto
