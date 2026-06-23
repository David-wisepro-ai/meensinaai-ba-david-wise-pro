# LOG — Histórico operacional

> Append-only. Nova entrada por dia/sessão pelo `/boa-noite`.

## 2026-06-22 (segunda, sessão noturna ~20h40)

### Operações principais
- Frase da seção de autoridade da home trocada: "quem viveu a obra" → "quem **vive** a obra" (presente). Commit `42f5890`, no ar.
- **4 PDFs de venda criados** pra vendedora, 1 por produto: Construction Project Manager, CSL Online, CSL Presencial, Wise Day. Cada PDF puxa o conteúdo da landing (gancho, sobre, pra-quem, benefícios, incluso, formato, FAQ) com cabeçalho de marca (logo + faixa dourada), foto do produto no topo e **CTA verde de WhatsApp com mensagem automática por produto** (atendente já sabe o que a pessoa quer). Sem preço dentro (vendedora passa no WhatsApp).
- Stack do PDF: instalado `reportlab` + `pillow` (não vinham no ambiente). Imagens recortadas em banner 2.15:1 via PIL. Gerador reproduzível em `/tmp/gerar_pdfs.py`. Saída em `~/Downloads/Wise Pro - PDFs de Venda/`.

### Decisões tomadas
- PDFs de venda NÃO levam preço — a vendedora passa o valor no WhatsApp (mesma lógica do funil só-WhatsApp das landings).
- PDFs ficam no Downloads (asset que a vendedora anexa); hospedar como link público ficou em aberto pro David decidir.

### Pendências geradas
- Decidir se hospeda os 4 PDFs como link público (Drive ou `/pdf` no site).

## 2026-06-22 (segunda, sessão noturna que entrou na madrugada)

### Operações principais
- Site renomeado: tirado `meensinaai` e `david` da URL. Link novo: https://wiseproacademy.vercel.app. Site antigo azul intocado na Hostinger. Domínio wiseproacademy.io NÃO migrado (só se o David pedir).
- Páginas de venda padronizadas no dark premium; VSL substituído por imagens de obra (PM = equipe planejando, Construtor = dupla na planta) com canteiro no fundo. Seção de professores na página do PM (David, Rony, Fábio, Luciana, Juliana) com fotos recortadas.
- Portal do aluno: separação por produto enforçada e verificada (PM só vê PM, Construtor só vê Construtor). Webhook do Stripe cria 1 matrícula só do produto comprado.
- Prova completa virou formato REAL da CSL: pular questão, navegar livre, navegador de questões, finalizar com revisão. Novo endpoint `/api/quiz/grade` (correção em lote). Quiz por categoria intocado (treino).
- BUG corrigido: portal travava em "Carregando" (deadlock do Supabase auth — getSession dentro do onAuthStateChange). Fix: adiar revalidação + getSession com timeout.
- Player de aula passou a aceitar YouTube e Google Drive (além do Panda). Montadas Aulas 1, 2 e 3 do Portal PM com capa + vídeo (Drive) + título + descrição.
- Criados 2 logins de teste (teste@ = Construtor, teste-pm@ = PM, senha WisePro2026!).

### Decisões tomadas
- Manter site antigo no ar e usar `.vercel.app` pro novo (não migrar o domínio agora).
- Portais PM e Construtor são mutuamente exclusivos por compra.
- Prova completa sem feedback no meio (só ao finalizar), igual prova real.
- Vídeos das aulas via Google Drive são PROVISÓRIOS — migrar pro Panda Video pro lançamento.

### Pendências geradas
- Migrar vídeos Drive → Panda; conferir compartilhamento dos vídeos no Drive; descrição da Aula 1; Aulas 4-8; rotacionar secret Supabase.
