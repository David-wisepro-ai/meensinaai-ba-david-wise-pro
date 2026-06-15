# Accessibility Checklist — WCAG 2.1 AA

> WCAG 2.1 nivel AA e o piso legal e etico de produto digital em 2026. Nao e plus. Organizado pelos 4 principios POUR (Perceivable, Operable, Understandable, Robust). Este checklist cobre os criterios mais quebrados em produtos reais, organizado por componente e principio. Validacao automatica pega 30%. O resto exige teste manual com leitor de tela e teclado.

## Os 4 principios POUR

### 1. Perceivable
Usuario consegue perceber o conteudo (visao, audicao, tato).

### 2. Operable
Usuario consegue operar a interface (teclado, voz, mouse, touch).

### 3. Understandable
Usuario entende conteudo e interacao (linguagem clara, comportamento previsivel).

### 4. Robust
Conteudo funciona em ferramentas assistivas atuais e futuras.

## Checklist por principio

### Perceivable

**Must (bloqueador legal):**
- [ ] Contraste texto normal >= 4.5:1 (1.4.3)
- [ ] Contraste texto grande (>=18pt regular ou 14pt bold) >= 3:1 (1.4.3)
- [ ] Contraste de UI components e graficos >= 3:1 (1.4.11)
- [ ] Imagens com alt descritivo, decorativas com alt="" (1.1.1)
- [ ] Video com legenda sincronizada (1.2.2)
- [ ] Audio com transcricao disponivel (1.2.1)
- [ ] Conteudo nao depende so de cor pra transmitir info (1.4.1)

**Should:**
- [ ] Texto pode ser ampliado ate 200% sem perder funcao (1.4.4)
- [ ] Reflow funciona em 320px sem scroll horizontal (1.4.10)
- [ ] Espacamento de texto ajustavel sem cortar conteudo (1.4.12)

**Nice:**
- [ ] Audio descricao em videos com info visual critica (1.2.5)

### Operable

**Must:**
- [ ] Toda funcao acessivel via teclado (2.1.1)
- [ ] Sem armadilha de teclado (2.1.2)
- [ ] Skip link pra pular pra conteudo principal (2.4.1)
- [ ] Foco visivel em todo elemento focavel (2.4.7)
- [ ] Ordem de foco logica e segue ordem visual (2.4.3)
- [ ] Titulos de pagina descritivos (2.4.2)
- [ ] Links com texto compreensivel fora de contexto (2.4.4)
- [ ] Sem conteudo piscando >3 vezes/segundo (2.3.1)
- [ ] Touch targets minimos 44x44 CSS pixels em mobile (2.5.5 AAA mas pratica AA)

**Should:**
- [ ] Multiplos modos de navegacao (sitemap, busca, breadcrumb) (2.4.5)
- [ ] Headings descrevem secao (2.4.6)

### Understandable

**Must:**
- [ ] Idioma da pagina declarado (lang="pt-br") (3.1.1)
- [ ] Idioma de trechos diferentes marcado (3.1.2)
- [ ] Componentes interativos previsiveis (3.2.1, 3.2.2)
- [ ] Erros de form identificados em texto (3.3.1)
- [ ] Labels e instrucoes claras em inputs (3.3.2)
- [ ] Sugestao de correcao em erros quando possivel (3.3.3)

**Should:**
- [ ] Navegacao consistente entre paginas (3.2.3)
- [ ] Identificacao consistente de componentes (3.2.4)
- [ ] Confirmacao em acoes destrutivas/financeiras (3.3.4)

### Robust

**Must:**
- [ ] HTML valido (parsing) (4.1.1)
- [ ] Roles, names e values corretos via ARIA (4.1.2)
- [ ] Status messages anunciados sem mover foco (4.1.3)

## Checklist por componente

### Button
- [ ] Elemento <button> nativo (nao div com onclick)
- [ ] Texto visivel ou aria-label se so icon
- [ ] Estados visuais distintos: default, hover, focus, active, disabled, loading
- [ ] Focus ring visivel com contraste 3:1
- [ ] Disabled tem aria-disabled e nao recebe foco
- [ ] Loading anuncia "carregando" via aria-live

### Form
- [ ] Cada input tem <label> associado (for/id)
- [ ] Required indicado em texto (nao so cor ou asterisco)
- [ ] Erro descritivo em texto, nao so borda vermelha
- [ ] Erro associado ao input via aria-describedby
- [ ] Aria-invalid="true" em campo com erro
- [ ] Autocomplete attribute quando aplicavel
- [ ] Fieldset/legend em grupos de radio/checkbox

### Modal/Dialog
- [ ] role="dialog" e aria-modal="true"
- [ ] Foco move pra dentro do modal ao abrir
- [ ] Foco preso dentro do modal (focus trap)
- [ ] ESC fecha modal
- [ ] Foco volta pro trigger ao fechar
- [ ] aria-labelledby aponta pro titulo do modal
- [ ] Background scroll travado

### Navigation
- [ ] Elemento <nav> com aria-label se houver mais de um
- [ ] Item ativo marcado com aria-current="page"
- [ ] Submenu acessivel via teclado (seta abre, ESC fecha)
- [ ] Skip link visivel ao foco
- [ ] Mobile menu anunciado como expandido/colapsado (aria-expanded)

### Tab/Tablist
- [ ] role="tablist", role="tab", role="tabpanel"
- [ ] aria-selected em tab ativa
- [ ] Setas esquerda/direita navegam tabs
- [ ] Tab inativa tem tabindex="-1", ativa tabindex="0"
- [ ] Painel associado via aria-controls

### Toast/Notification
- [ ] role="status" pra info, role="alert" pra erro critico
- [ ] aria-live="polite" pra info, "assertive" so pra critico
- [ ] Tempo suficiente pra ler (>5s) ou controle de fechar
- [ ] Nao depende so de cor pra severidade

### Card/Tile interativo
- [ ] Elemento <a> ou <button> envolvendo card inteiro (nao link aninhado)
- [ ] Estado de foco no card todo
- [ ] Imagem do card com alt apropriado
- [ ] Heading dentro do card hierarquia correta

### Tooltip
- [ ] Disparado por foco e hover, nao so hover
- [ ] aria-describedby liga trigger ao tooltip
- [ ] Persistente o suficiente pra ler e mover cursor pra ele
- [ ] Fechavel via ESC

## Niveis de impacto

- **Must** — falha bloqueia uso pra usuario com deficiencia OU expoe a multa legal (ADA, EAA, LBI). Sem exceao.
- **Should** — degrada experiencia mas nao impede. Corrigir em sprint dedicada.
- **Nice** — melhora qualidade. AAA opcional.

## Ferramentas de teste

### Automatizadas (pegam ~30% dos problemas)
- axe DevTools (extensao Chrome/Firefox)
- WAVE (WebAIM)
- Lighthouse (built-in Chrome)
- Pa11y (CI)
- ESLint plugin jsx-a11y

### Manuais (essenciais)
- Navegacao 100% por teclado (Tab, Shift+Tab, Enter, Space, Setas, ESC)
- VoiceOver (Mac, iOS)
- NVDA (Windows, gratis)
- JAWS (Windows, padrao corporativo)
- TalkBack (Android)
- Zoom de browser ate 400%
- Modo de alto contraste do SO

### Heuristicos
- Apagar todo CSS de cor: ainda da pra usar?
- Desligar mouse e completar fluxo critico
- Ler interface em voz alta: faz sentido sem o visual?

## Bugs comuns descobertos so com teste real

- Modal abre mas foco fica no body (teste com Tab)
- Botao customizado com div nao recebe Enter/Space (teste com teclado)
- Toast some em 3s, leitor de tela nao alcanca (teste com NVDA)
- Skip link existe mas nao aparece no foco (teste com Tab da URL)
- Form valida em onChange e leitor anuncia erro a cada tecla (teste com VoiceOver)
- Aria-label quebrado por tradutor automatico de browser
- Focus ring removido em CSS reset (outline: none sem replacement)
- Carrossel auto-play sem pausa (motion sickness, usuarios cognitivos)
- Cor sozinha indica erro/sucesso (daltonicos perdem)
- Tooltip que so abre em hover, sumiu em mobile

## Processo de auditoria recomendado

1. **Automated scan** com axe — corrigir tudo (60-90 min)
2. **Keyboard test** — percorrer 5 fluxos criticos so com teclado (60 min)
3. **Screen reader test** — VoiceOver ou NVDA nos mesmos fluxos (90 min)
4. **Zoom test** — 200% e 400% nos breakpoints (30 min)
5. **Color test** — simular daltonismo (Sim Daltonism ou Stark) (30 min)
6. **Cognitive review** — checar linguagem, mensagens de erro, instrucoes (45 min)
7. **Documentar** — issues por severidade com video/screenshot

Ciclo completo: 1 dia. Repetir a cada release maior.

## Quando este checklist e insuficiente

- Produto medico, financeiro ou governamental: alvo deve ser AAA, nao AA
- Publico idoso 65+: targets de toque maiores, fontes maiores como default
- Publico cognitivo (autismo, dislexia, TDAH): testar com pessoas reais, nao so checklist
- Mercado europeu apos junho 2025: EAA exige conformidade documentada

WCAG e piso. Acessibilidade real exige teste com pessoas com deficiencia. Sem teste com usuario real, voce nao sabe se funciona.
