# Design Principles — Leis de UX e Gestalt aplicadas

> Conjunto de leis empiricas e heuristicas que governam como humanos percebem e interagem com interfaces. Nao sao opinioes de designer, sao conclusoes de psicologia experimental (Hick 1952, Fitts 1954, Miller 1956, Gestalt 1923) e pesquisa de HCI (Doherty 1982, Tesler 1980s). Designer rigoroso usa estas leis pra justificar decisoes em vez de gosto.

## Leis de UX

### Hick's Law

**Tese:** O tempo pra tomar uma decisao cresce logaritmicamente com o numero de opcoes.

Formula: T = b * log2(n + 1), onde n e numero de opcoes.

**Implicacoes:**
- Menus com 12 itens custam mais que dois menus de 6
- Wizard de checkout em 3 passos bate form unico de 30 campos
- Homepage com 8 CTAs principais nao tem CTA principal

**Aplicacao:**
- Limite escolhas primarias a 5-7 itens visiveis simultaneamente
- Agrupe opcoes relacionadas (chunking reduz n percebido)
- Use defaults inteligentes pra reduzir decisao
- Progressive disclosure: mostre o essencial, esconda o resto

**Falha comum:** Adicionar opcoes "pra dar liberdade ao usuario". Liberdade sem hierarquia paralisa.

### Fitts's Law

**Tese:** O tempo pra alcancar um alvo e funcao do tamanho do alvo e da distancia ate ele.

Formula: T = a + b * log2(D/W + 1)

**Implicacoes:**
- Botao primario deve ser maior e mais perto do dedo/cursor que secundario
- Cantos da tela tem distancia infinita em mouse-driven (impossivel passar do canto)
- Touch targets <44px sao penaliza usuarios moveis e idosos
- Menu de contexto (right click) ganha de menu de barra superior em frequencia

**Aplicacao:**
- Botao de acao primaria: pelo menos 48px altura, posicao confortavel pro polegar
- CTA de checkout no rodape pegajoso em mobile (sempre alcancavel)
- Espacamento entre alvos clicaveis (8px minimo) pra evitar tap errado
- Itens mais usados maiores, menos usados menores

**Falha comum:** Tratar todos os botoes igual. Hierarquia visual reflete hierarquia de uso.

### Miller's Law

**Tese:** Memoria de curto prazo do humano lida com 7 +/- 2 itens.

**Implicacoes:**
- Menu de 15 itens excede capacidade de comparacao
- Numero de telefone e agrupado (3-4-4) porque 11 digitos sao demais
- Steps de onboarding em mais de 5 telas perdem progresso mental

**Aplicacao:**
- Agrupe info em chunks de 4-5
- Numere passos quando importam (1 de 5)
- Em formularios longos, divida em secoes nomeadas
- Em listagem grande, use filtros, nao paginacao infinita sem ancora

**Falha comum:** Tratar Miller como regra rigida (5 itens sempre). E heuristica, nao lei. Conteudo familiar pode comportar mais.

### Tesler's Law (Lei da conservacao da complexidade)

**Tese:** Todo sistema tem complexidade irreduzivel. Pergunta nao e se haera complexidade, e quem vai absorver: o sistema ou o usuario.

**Implicacoes:**
- Form simples pro usuario exige logica complexa no backend
- Default inteligente exige modelo do usuario robusto
- Onboarding rapido empurra complexidade pra interface depois

**Aplicacao:**
- Decida explicitamente onde a complexidade vive: na engenharia, no setup inicial, ou no uso continuo
- Prefira complexidade no backend e setup, nao no uso diario
- Smart defaults absorvem complexidade pelo usuario
- Quando usuario expert quer controle, ofereca toggle "modo avancado"

**Falha comum:** Achar que pode eliminar complexidade. So move.

### Doherty Threshold

**Tese:** Produtividade explode quando computador e usuario interagem em ritmo onde nenhum espera o outro. Limiar empirico: <400ms.

**Implicacoes:**
- Loading >1s perde flow do usuario
- Resposta de tecla >100ms parece "lenta"
- Animacao >500ms vira espera

**Aplicacao:**
- Otimistic UI: mostre resultado antes do servidor confirmar
- Skeleton screens >300ms melhoram percepcao
- Animacoes de transicao 150-300ms (mais que isso e lerdo)
- Pre-fetching de dados provaveis
- Feedback imediato em qualquer toque (<100ms)

**Falha comum:** Animar tudo "pra ficar premium". Animacao em excesso vira lentidao percebida.

## Princpios Gestalt

### Proximity (proximidade)

Elementos proximos sao percebidos como grupo.

**Aplicacao:**
- Label proximo ao input correspondente (nao a 40px de distancia)
- Botoes de ao mesmo grupo proximos
- Espacamento entre secoes >> espacamento dentro da secao
- Cards relacionados em cluster

### Similarity (similaridade)

Elementos parecidos sao percebidos como mesmo tipo.

**Aplicacao:**
- Todos os botoes primarios mesma cor e shape
- Links em texto sempre sublinhados ou em cor distinta consistente
- Icones de mesma classe estilo identico
- Headings de mesmo nivel mesmo peso e tamanho

### Closure (fechamento)

Cerebro completa formas incompletas.

**Aplicacao:**
- Logo com forma sugerida funciona (FedEx flecha entre E e x)
- Cards podem ter borda implicita por sombra ou bg, nao precisa borda solida
- Loading skeleton sugere o conteudo que vai vir

### Continuity (continuidade)

Olho segue linhas e curvas suaves.

**Aplicacao:**
- Alinhamento em grid cria continuidade visual
- Carrossel funciona porque dedo segue scroll horizontal
- Fluxos de form alinhados verticalmente reduzem carga cognitiva
- Layout em F ou Z guia leitura

### Figure-ground

Cerebro separa figura (foco) de fundo (contexto).

**Aplicacao:**
- Modal com overlay escuro isola o foco
- Hero section com imagem de fundo precisa contraste de 4.5:1 no texto
- Card branco em fundo cinza-claro estabelece hierarquia
- Estado de erro vermelho destaca contra interface neutra

## Hierarquia visual em 1 segundo

Teste do "olho seco": mostre a tela por 1 segundo. Pergunte ao usuario o que viu primeiro, segundo, terceiro.

Se a resposta nao corresponde a primario, secundario, terciario que voce desenhou, hierarquia falhou.

**Ferramentas pra criar hierarquia:**
- **Tamanho** — maior = mais importante (mas saturacao tambem conta)
- **Peso** — bold ancora atencao
- **Cor** — contraste alto puxa olho
- **Espacamento** — isolamento sinaliza importancia
- **Posicao** — topo-esquerda em culturas LTR ganha primeiro foco
- **Cor de marca** — usar so em CTA primario, nunca em decoracao

**Anti-pattern:** tudo importante = nada importante. Se 5 elementos competem em peso visual, hierarquia desaparece.

## Aesthetic-Usability Effect

**Tese:** Interfaces percebidas como bonitas sao percebidas como mais usaveis, mesmo quando nao sao (Kurosu & Kashimura 1995).

**Implicacoes:**
- Design feio com boa usabilidade perde pra design bonito com usabilidade media
- Beleza compra paciencia: usuario tolera bug em interface bela
- Mas: beleza sem usabilidade quebra confianca em uso continuo

**Aplicacao:**
- Investir em estetica e investir em percepcao de qualidade
- Nao usar isso como desculpa pra esconder problema de UX
- Polish visual nas telas de primeiro contato (onboarding, landing)
- Estado de erro tambem precisa cuidado estetico

## Exemplos de aplicacao em interface real

### Landing page SaaS
- Hick: 1 CTA primario, 1 secundario, nada mais acima da dobra
- Fitts: CTA primario 56px altura, contraste alto, posicao centro-direita
- Miller: 3 beneficios principais, nao 8
- Hierarquia: headline 48px, sub 20px, CTA 18px bold
- Gestalt similaridade: todos os feature blocks identicos em estrutura

### Form de checkout
- Tesler: complexidade absorvida em smart defaults (CEP preenche cidade)
- Hicks: 1 metodo de pagamento default selecionado
- Doherty: validacao em <200ms apos blur do input
- Miller: campos agrupados em "endereco", "pagamento", "revisao"
- Proximity: label cola no input, helper text logo abaixo

### Dashboard analytics
- Figure-ground: numero principal grande, contexto pequeno
- Continuidade: graficos alinhados em grid 12 colunas
- Hierarquia: KPI primario 64px, secundarios 32px, labels 14px
- Hick: filtros em <5 dimensoes principais, resto em "mais filtros"

## Falhas comuns

- Aplicar leis sem medir: assumir que 7 itens em menu e ok sem testar
- Confundir Miller com regra rigida em vez de heuristica
- Ignorar Fitts em mobile (botoes pequenos colados)
- Hierarquia em 5 niveis quando 3 bastam
- Gestalt similaridade quebrada (botao primario muda de cor entre paginas)
- Doherty violado por animacoes "premium" de 800ms
- Aesthetic-Usability como desculpa pra UX ruim

## Checklist de aplicacao

- [ ] Hick: decisao primaria em <5 opcoes visiveis
- [ ] Fitts: CTA primario maior, mais perto, mais alcancavel
- [ ] Miller: chunks de 4-5 em listas e forms
- [ ] Tesler: complexidade alocada explicitamente
- [ ] Doherty: feedback <400ms em interacao critica
- [ ] Proximity: relacionados juntos, nao-relacionados afastados
- [ ] Similarity: componentes do mesmo tipo identicos
- [ ] Hierarquia: teste do 1 segundo confirma primario, secundario, terciario
- [ ] Aesthetic: nivel de polish proporcional a importancia da tela
- [ ] Estados visuais (hover, focus, active) seguem similaridade do sistema

8+ aplicados conscientemente = design fundamentado. Menos = decisao por gosto, vai cair em revisao.

## Quando usar este framework

- Justificar decisao de design em revisao
- Diagnosticar interface "estranha" sem saber o porque
- Treinar designer junior (vocabulario compartilhado)
- Auditar competidor (onde quebram leis e onde acertam)
- Brief de redesign (qual lei foi mais violada na versao atual)
