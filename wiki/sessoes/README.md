# Sessões

Histórico cronológico de cada sessão de trabalho. Um arquivo por dia: `sessao-YYYY-MM-DD.md`.

## Arquivos especiais

- **`ultima.md`** — espelho do relatório da sessão mais recente. SEMPRE atualizado no fechamento. Lido na abertura pelo CEO.

## Template de sessão (usado no fechamento)

```markdown
# Sessão YYYY-MM-DD

> Duração aproximada: [X horas] | CEO: [NOME_CEO]

## O que rodou hoje
- [bullet 1 — ação concreta + resultado]

## Decisões tomadas
- [decisão + razão]

## Pendências geradas/atualizadas
- 🔴 [crítica] — dono: [X] — prazo: [data]
- 🟡 [média]
- 🟢 [baixa]

## Números do dia
- [leads, vendas, tickets, posts publicados, etc]

## Próxima sessão — onde retomar
- [1-3 itens concretos]

## Bloqueios
- [se houver]
```

## Fluxo

1. **Fechamento** cria `sessao-YYYY-MM-DD.md` + sobrescreve `ultima.md` com mesmo conteúdo
2. **Abertura** lê `ultima.md` + `wiki/operations/pendencias.md` antes de responder
3. Pendências resolvidas no fechamento são movidas em `pendencias.md`
