# Marca

> Esta pasta é gerada AUTOMATICAMENTE pelo brand-squad ao final da skill `/gerar-perfil-do-negocio`. Você não precisa rodar comando explícito.

## Arquivos esperados após onboarding

| Arquivo | Conteúdo | Quem usa |
|---|---|---|
| `brand-voice.md` | Tom de voz, palavras a evitar/usar, exemplos | Todos os agentes que produzem copy (marina, mariana, beatriz, andre, victor) |
| `visual-guidelines.md` | Paleta de cores, tipografia, hierarquia visual | Agentes que produzem visual (mariana, camila, victor) |
| `padroes-site.md` | Estrutura, copy padrão, CTA, layout esperado pro site da empresa | victor, andre |
| `padroes-postagem.md` | Como deve ser cada formato de post (Instagram, LinkedIn, X, TikTok) | mariana, marina, beatriz |

## Como é gerado

Ao final do `/gerar-perfil-do-negocio`, a skill dispara o **brand-chief** (subagent), que orquestra o brand-squad lendo:
- `meu-negocio/empresa.md`
- `meu-negocio/publico-alvo.md`

E gera os 4 arquivos acima. Tempo médio: 3-5 minutos. Cliente continua usando o painel enquanto isso.

## Como atualizar manualmente

Se você quiser regenerar a marca após mudança grande no negócio (rebranding, novo público), rode:

```
/atualizar-marca
```

Skill dispara brand-chief de novo, com backup do estado anterior em `marca/.backups/<timestamp>/`.
