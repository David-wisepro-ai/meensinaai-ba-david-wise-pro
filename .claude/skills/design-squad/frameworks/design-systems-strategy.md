# Design Systems Strategy — Dan Mall Framework

> Design system nao e biblioteca de componentes. E produto interno com usuarios (designers e devs do produto), governanca, roadmap, metricas, e contrato de servico. Dan Mall (Design That Scales, 2024) ensina que sem ops, tokens e governance, sistema vira museu de componentes mortos em 18 meses.

## Os 4 pilares

### 1. Design Ops

Operacao que mantem o sistema vivo. Inclui:
- Cadencia de releases (semanal, quinzenal, mensal)
- Suporte (canal Slack, office hours, SLA de resposta)
- Documentacao (site dedicado, exemplos rodaveis, do/dont)
- Onboarding de novos contribuidores
- Comunicacao de mudancas (changelog, deprecation policy)

Sem ops, sistema sangra adoao. Adoao cai sem ops, nao sem componentes.

### 2. Tokens

Camada de variaveis que precede qualquer componente.

Hierarquia de tokens (3 niveis):
- **Global tokens** — paleta bruta (gray-100, blue-500, space-4)
- **Alias tokens** — semantica (color-primary, color-error, space-card-padding)
- **Component tokens** — escopo de componente (button-primary-bg, input-border-focus)

Componentes consomem alias tokens, nunca global direto. Alias tokens consomem global. Tres niveis garantem que rebrand muda 1 camada e cascateia.

### 3. Governance

Quem decide o que. Sem governance clara, sistema vira pull request war.

Decisoes a definir:
- Quem aprova nova primitiva (atom/molecula)?
- Quem aprova mudanca breaking?
- Quem aprova adicao de variante a componente existente?
- Politica de deprecation (quanto tempo mantem suporte? como avisa?)
- Tier de stability (experimental, stable, deprecated)

### 4. Contribution Model

Como produto contribui de volta pro sistema.

Tres modelos comuns:
- **Solitario** — so o time central modifica. Bom em fase 0-1, ruim depois (vira gargalo).
- **Federado** — produto contribui via PR, time central revisa. Modelo Mall recomenda.
- **Distribuido** — qualquer dev mexe direto. So funciona com governance forte e linting automatizado.

## Estrategias de organizacao

### Centralized

Um time dedicado dono do sistema. Produto consome.
- Pro: consistencia alta, padrao forte
- Contra: gargalo, sistema descolado das dores reais
- Quando usar: empresa media, 1-3 produtos, brand critica

### Federated

Time central + champions em cada produto. Champions contribuem upstream.
- Pro: balanco entre consistencia e velocidade, escala bem
- Contra: requer comunicacao explicita, governance clara
- Quando usar: 4+ produtos, multi-time, sistema maduro

### Distributed

Sem time central. Sistema e responsabilidade compartilhada via convencao + linting.
- Pro: sem gargalo, ownership compartilhado
- Contra: deriva e quase certa sem disciplina extrema
- Quando usar: orgs muito senior, ambiente high-trust, ferramentas robustas

## Maturity model (Mall, 5 estagios)

### Estagio 0 — Caos
Cada produto tem suas cores, tipos, componentes. Sem token. Sem documentacao. Bug de UI virando rotina.

### Estagio 1 — Style guide
Documento estatico. Brand definida. Cores listadas. Sem implementacao em codigo.

### Estagio 2 — Pattern library
Componentes em codigo, mas sem tokens, sem governanca, contribuicao ad-hoc. Fragmenta em 12 meses.

### Estagio 3 — Design system inicial
Tokens em 3 camadas. Componentes core. Documentacao publicada. Time central reativo.

### Estagio 4 — Design system maduro
Adoao medida (% de componentes usados). Roadmap publico. Suporte com SLA. Contribution model federado.

### Estagio 5 — Design platform
Tokens cross-platform (web/iOS/Android). API de design (Figma plugins). Metricas de produto (NPS interno, time-to-ship). Influencia decisao de produto, nao so executa.

A maioria dos sistemas para no estagio 2-3 e morre. Estagio 4 exige investimento dedicado.

## Roles necessarios

### DesignOps Lead
Dono do produto. Roadmap, metricas, comunicacao. Senior, com experiencia em sistema antes.

### System Architect (designer + dev)
Define primitivas, tokens, principios de composicao. Tem voto final em decisoes tecnicas.

### Contributors (champions de produto)
Designers e devs de produto que abrem PR upstream. Conhecem dor real do produto.

### Reviewers
Time central que revisa PRs. SLA de 48h ou contribuidor desiste.

### Stakeholders
Brand, acessibilidade, engenharia. Consultados em decisoes que tocam dominio deles.

Time central minimo viavel: 1 lead + 1 designer + 1 dev. Abaixo disso e voluntariado, nao produto.

## Roadmap de adoao por estagio

### Greenfield (0% adoao)
1. Definir tokens (cor, tipo, espaco, motion)
2. Construir 5 atoms criticos (button, input, link, text, icon)
3. Documentar uso minimo
4. Pilotar em 1 feature pequena
5. Iterar baseado em feedback antes de escalar

### Crescimento (1-50% adoao)
1. Identificar componentes mais duplicados em produto
2. Migrar produto-a-produto com champion local
3. Medir adoao mensalmente
4. Investir em DX (kit Figma + biblioteca codigo sincronizados)
5. Estabilizar v1.0 com semver

### Maturidade (50-100% adoao)
1. Deprecation policy formal
2. Metricas de qualidade (acessibilidade, performance, bug rate)
3. Roadmap publico com input de produto
4. Contribuicao federada
5. Cross-platform tokens

## Como medir maturity

Metricas leading:
- Token coverage (% de cores/tipos vindos de tokens vs hardcoded)
- Component coverage (% de UI usando componentes do sistema)
- PR cycle time (tempo medio de merge de contribuicao)

Metricas lagging:
- NPS interno do sistema (designers e devs satisfeitos?)
- Bug de UI por release (deve cair com adoao)
- Time-to-ship de feature nova (deve cair)
- Acessibilidade nivel WCAG (deve subir)

Sistema sem metricas nao prova valor. Sem provar valor, perde orcamento.

## Falhas comuns

- **Componentes sem tokens** — cor hardcoded em componente. Refactor de brand vira pesadelo.
- **Sistema sem owner** — voluntarios na sexta-feira. Morre em 6 meses.
- **Documentacao no Notion sem exemplo rodavel** — designer nao confia, dev nao usa.
- **Sem versionamento** — breaking change quebra produto sem aviso.
- **Sem deprecation policy** — componentes velhos coexistem com novos, ninguem sabe qual usar.
- **Sistema empurrado top-down sem champion local** — produto resiste, adoao trava.
- **Foco em quantidade de componentes** — 200 componentes pouco usados pesam menos que 30 muito usados.

## Checklist de aplicacao

- [ ] Tokens em 3 camadas (global, alias, component)
- [ ] Owner formal com tempo dedicado (>50%)
- [ ] Documentacao com exemplos rodaveis (Storybook, site live)
- [ ] Semver e changelog publico
- [ ] Canal de suporte com SLA
- [ ] Contribution guide escrito
- [ ] Metricas de adoao tracadas
- [ ] Roadmap publico
- [ ] Pelo menos 3 produtos consumindo
- [ ] Acessibilidade WCAG 2.1 AA validada por componente

8+ marcados = sistema saudavel. 5-7 = em risco. <5 = pattern library, nao design system.

## Quando usar este framework

- Decisao de criar sistema (ou nao)
- Diagnostico de sistema existente (em que estagio esta?)
- Planejamento de roadmap anual
- Pitch pra leadership pedindo investimento
- Auditoria pos-fusao (dois sistemas precisam virar um)
