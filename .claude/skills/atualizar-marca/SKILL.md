---
name: atualizar-marca
description: "Use quando cliente migrou da v1.x e marca não foi gerada (status pendente_manual) ou quando quer regenerar marca após mudança grande no negócio (rebranding, novo público). Dispara brand-chief pra gerar 4 arquivos da pasta meu-negocio/marca/ baseado em empresa.md + publico-alvo.md atualizados."
allowed-tools: Read, Write, Edit, Bash, Agent
---

# Atualizar Marca

> Skill que dispara o brand-squad pra gerar (ou regenerar) a marca do cliente. Útil quando: (1) cliente migrou da v1.x e marca está pendente, (2) cliente fez rebranding e precisa atualizar todos os padrões, (3) cliente expandiu pra novo público e quer recalibrar tom/visual.

## Quando usar

- `meu-negocio/marca/brand-voice.md` não existe ou está vazio
- `dados.js.marca.status_geracao` está como `"pendente_manual"` ou `"pendente_migracao"`
- Cliente acabou de mudar o público-alvo ou produto principal

## Quando NÃO usar

- Marca já está gerada e empresa não mudou (rodar 2x sobrescreve sem ganho)
- Cliente quer só ajustar 1 arquivo específico (edite manualmente)

---

## Passo 0 — Contexto obrigatório (Read antes de produzir)

1. `meu-negocio/empresa.md` — fonte de verdade do negócio
2. `meu-negocio/publico-alvo.md` — ICP + voz autêntica
3. `meu-negocio/marca/` — verificar estado atual (se existir)
4. `meu-negocio/dados.js` — ler `marca.status_geracao` atual

**Se `empresa.md` ou `publico-alvo.md` ainda estiverem vazios:** parar e responder:

```
Pra gerar sua marca, preciso que empresa.md e publico-alvo.md estejam preenchidos.

Rode /gerar-perfil-do-negocio antes. Quando estiver pronto, volte aqui.
```

---

## Passo 1 — Backup do estado atual (se houver)

Se `meu-negocio/marca/` já tiver arquivos não-placeholder, fazer backup:

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
mkdir -p meu-negocio/marca/.backups/$TIMESTAMP
cp meu-negocio/marca/*.md meu-negocio/marca/.backups/$TIMESTAMP/ 2>/dev/null || true
```

Avisar cliente:
```
🎨 Backup da marca atual salvo em meu-negocio/marca/.backups/<timestamp>/

Vou regenerar agora. Tempo médio: 3-5 minutos.
```

---

## Passo 2 — Disparar brand-chief

Invocar via Agent tool:

```
Agent(
  subagent_type: "brand-chief",
  description: "Gerar marca baseada em perfil do cliente",
  prompt: "Você é o brand-chief. Cliente do BA precisa que a marca seja gerada.
Leia:
1. meu-negocio/empresa.md (identificação, produto, geografia, idioma)
2. meu-negocio/publico-alvo.md (ICP, dores, voz autêntica)

Gere os 4 arquivos da pasta meu-negocio/marca/:

a) brand-voice.md — tom de voz coerente com publico-alvo (formal/amigável/técnico/inspiracional),
palavras a EVITAR (5+) e USAR (5+), 3 exemplos de frase em cada tom (CTA, post Instagram, email outbound).

b) visual-guidelines.md — paleta de 3 cores fundamentadas no nicho, tipografia (1 sans pra título,
1 sans pra texto), hierarquia visual.

c) padroes-site.md — estrutura de homepage recomendada, copy padrão pro hero, recomendação de seções.

d) padroes-postagem.md — formato pra Instagram (carrossel/reel/story), LinkedIn, X/Twitter, TikTok.

Cada arquivo é markdown limpo, PT-BR, sem hífens nem travessões em copy corrida."
)
```

Aguardar retorno do brand-chief. Se não estiver disponível ou falhar, mostrar:

```
⚠️ Brand-chief não está disponível no momento.

Possíveis causas:
1. Brand-squad não foi instalado (rode /atualizar-portal pra puxar)
2. Erro temporário (tente de novo em 1 minuto)
3. Conta Anthropic com limite de uso atingido

Sua marca atual continua intacta. Tente novamente quando puder.
```

---

## Passo 3 — Atualizar `dados.js`

Após brand-chief gerar os 4 arquivos:

```javascript
window.DADOS_NEGOCIO.marca = {
  tom: JSON.parse(JSON.stringify("<tom extraído de brand-voice.md>")),
  palavras_evitar: JSON.parse(JSON.stringify([/* extraído */])),
  palavras_preferir: JSON.parse(JSON.stringify([/* extraído */])),
  paleta_cores: JSON.parse(JSON.stringify([/* extraído de visual-guidelines.md */])),
  tipografia: JSON.parse(JSON.stringify("<extraído>")),
  status_geracao: "concluido"
};
window.DADOS_NEGOCIO.ultima_atualizacao = "<timestamp>";
window.DADOS_NEGOCIO.atividade_recente.unshift({
  timestamp: "<timestamp>",
  agente: "brand-chief",
  acao_resumida: "Marca gerada (4 arquivos): brand-voice, visual-guidelines, padroes-site, padroes-postagem"
});
```

---

## Passo 4 — Mensagem F5

```
✅ Marca gerada pelo brand-squad.

4 arquivos novos em meu-negocio/marca/:
- brand-voice.md (tom, palavras evitar/preferir)
- visual-guidelines.md (paleta, tipografia)
- padroes-site.md (estrutura recomendada do site)
- padroes-postagem.md (formato por canal)

Atualize o painel apertando F5 pra ver na seção "MARCA".

Próximo passo sugerido: rode /executar-tarefa pra que o time aplique a nova marca nas próximas entregas.
```

---

## Princípios não negociáveis

| | Princípio |
|---|---|
| 1 | Sempre fazer backup da marca atual antes de regenerar |
| 2 | Ler empresa.md + publico-alvo.md antes de invocar brand-chief |
| 3 | Brand-chief lê SOMENTE dados estruturados, NÃO inventa contexto |
| 4 | Acentuação PT-BR completa nos 4 arquivos gerados |
| 5 | Sem hífens nem travessões em copy corrida |
| 6 | JSON.stringify obrigatório ao escrever em dados.js |
| 7 | Mensagem F5 ao final |
