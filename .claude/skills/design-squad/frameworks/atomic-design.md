# Atomic Design — Brad Frost

> Sistema de design proposto por Brad Frost (2013, livro 2016) que organiza interfaces em 5 niveis hierarquicos inspirados em quimica. Nao e ordem de desenho, e modelo mental de composicao. Atomos viram molculas, molculas viram organismos, organismos compoem templates, templates instanciam paginas. Tudo no sistema deve rastrear de volta ate atomos.

## Os 5 niveis

### 1. Atoms

Os blocos minimos. Nao podem ser quebrados sem perder funcao.

Exemplos:
- Button base (sem variantes ainda, so o shape primitivo)
- Input field
- Label
- Icon
- Color token, type token, spacing token (atomos invisiveis mas fundantes)
- Avatar primitivo (so a forma circular com imagem)

Regra de teste: se voce remover qualquer parte do componente e ele deixar de existir, e atom.

### 2. Molecules

Combinacao de 2 ou mais atoms que juntos cumprem UMA funcao especifica.

Exemplos:
- Search field (input + button + icon)
- Form field (label + input + helper text + error message)
- Card header (avatar + name + timestamp)
- Menu item (icon + label + badge)

Regra de teste: a molecula tem proposito unico e reutilizavel. Se cumpre 2+ propositos, e organismo.

### 3. Organisms

Grupos de molculas e/ou atoms que formam secoes complexas e relativamente independentes da interface.

Exemplos:
- Header de produto (logo atom + nav molecula + search molecula + user menu molecula)
- Card completo (header molecula + body + actions molecula)
- Product list filter sidebar
- Checkout summary

Regra de teste: o organismo tem contexto de negocio. Voce consegue nomear sem usar a palavra "componente".

### 4. Templates

Layout de pagina sem dado real. Define grid, regions, e onde organismos vivem.

Exemplos:
- Template de pagina de produto (header organism + product detail organism + reviews organism + footer organism)
- Template de dashboard (sidebar + main + side panel)
- Template de checkout

Regra de teste: troca os organismos sem quebrar o layout. Templates sao agnosticos a conteudo.

### 5. Pages

Templates instanciados com conteudo real. Onde voce valida se o sistema funciona em casos extremos.

Exemplos:
- Pagina de produto da camiseta X com 47 reviews
- Pagina de produto sem reviews (estado vazio)
- Pagina de produto com nome muito longo (estado de overflow)

Regra de teste: e nas pages que descobre que o template nao previu nome com 80 caracteres ou lista vazia.

## Regras de promocao entre niveis

Promover um componente para nivel superior so quando:

1. Aparece em 2+ contextos diferentes (regra do segundo uso)
2. Tem propriedades configuraveis sem virar Frankenstein de variantes
3. Faz sentido nomear isoladamente (nome conta historia)
4. Sobrevive sem o contexto pai (organismo nao depende de pagina especifica)

Promover cedo demais cria abstracao prematura. Promover tarde demais cria duplicacao.

## Como decidir atom vs molecule

Pergunta diagnostica em sequencia:

1. Pode ser quebrado em partes menores que ainda fazem sentido? Se sim, NAO e atom.
2. As partes que compoem ja existem como atoms no sistema? Se sim, e molecula.
3. Cumpre uma unica funcao bem definida? Se sim, e molecula. Se cumpre varias, e organismo.

Caso ambiguo classico: avatar com badge de status. Avatar primitivo e atom. Avatar com badge online e molecula (avatar atom + dot atom).

## Anti-patterns

- **Atomos demais sem proposito** — biblioteca com 200 atoms que ninguem usa. Atom so existe se vira molecula.
- **Molculas Frankenstein** — molecula com 15 props pra cobrir 8 casos. Quebra em molculas separadas.
- **Pular niveis** — pular de atom direto pra organismo. Sempre passa por molecula, mesmo que trivial.
- **Pages como organismos** — equipe trata pagina como reutilizavel. Pages sao instancias, nao componentes.
- **Templates sem grid system** — template que nao impoe estrutura vira pagina disfarcada.
- **Nomear por aparencia** — chamar atom de "blue-button". Nomeie por funcao: "primary-button". Aparencia muda, funcao fica.
- **Componente espelha tela** — criar molecula chamada "checkout-card" que so serve em checkout. Vira organismo direto.

## Quando usar atomic design

Indicado quando:
- Produto tem 5+ paginas com elementos repetidos
- Time tem 3+ designers ou developers tocando UI
- Plataforma multi-canal (web + mobile + email)
- Sistema vai durar 2+ anos
- Existe brand consistente que precisa propagar

Nao indicado quando:
- Landing page unica de campanha (overhead nao vale)
- Prototipo de validacao em 1 semana
- Time solo entregando MVP em 30 dias
- Marca em re-discovery (atomos vao mudar muito)

## Checklist de aplicacao

- [ ] Tokens definidos antes de qualquer atom (cor, tipo, espaco, motion)
- [ ] Cada atom documentado com props, estados, casos de uso
- [ ] Molculas listadas com atoms que consomem (rastreabilidade)
- [ ] Organismos com contrato de dado claro (que props recebe)
- [ ] Templates definem grid e regions explicitamente
- [ ] Pages cobrem 3 estados minimos: feliz, vazio, erro
- [ ] Storybook ou equivalente com cada nivel navegavel
- [ ] Naming convention sem prefixo de aparencia
- [ ] Versionamento semver pra atoms e molculas
- [ ] Contribution guide com regras de promocao

8 ou mais marcados = sistema funcional. Menos de 6 = sistema imaturo, time vai criar duplicata.

## Quando voltar e refatorar

- Mesma molecula reaparece em 3 organismos diferentes com 80% de overlap = consolidar
- Atom tem 12+ variantes = quebrar em familia de atoms
- Organismo cresceu pra 600 linhas de codigo = decompor em organismos menores
- Time evita usar componente do sistema = sinal de DX ruim, nao falha do time

Atomic design e disciplina continua, nao entrega de uma vez.
