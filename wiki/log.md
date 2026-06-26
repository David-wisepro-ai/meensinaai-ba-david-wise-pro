# LOG — Histórico operacional

> Append-only. Nova entrada por dia/sessão pelo `/boa-noite`.

## 2026-06-25 (quinta) — Funil automatizado no GHL

### Operações principais
- **Conferi a verificação do Meta Business**: ainda "Not Verified" (em análise). WhatsApp Approved + Connected, mas limites de conta nova seguem.
- **Ads do Facebook entraram no ar** trazendo leads direto pro WhatsApp (7 contatos novos no dia).
- **Automação 1 publicada** ("Lead novo WhatsApp → Novo Lead"): Customer Replied (WhatsApp) → cria oportunidade no estágio Novo Lead (origem Facebook Ads) → espera 24h → se sem resposta, move pra "Novo Lead não respondeu".
- **Adicionei os 7 leads de hoje ao Novo Lead** (Bulk Actions → Manage Opportunities). Novo Lead ficou com 10 oportunidades (alguns já caíram pela automação = funcionando).
- **Automação 2 publicada** ("Lead respondeu → Já respondeu"): Customer Replied (WhatsApp) → If/Else por etiqueta de controle `lead-1a-msg-recebida` (1ª msg só etiqueta; 2ª+ move pra "Novo Lead já respondeu").

### Decisões tomadas
- Funil auto-organizado por responsividade, com proteção "no backward move" pra não bagunçar Follow Up. Gate por etiqueta pra separar chegada de resposta.

### Pendências geradas
- Conferir verificação Meta de novo. Manual da vendedora; religar recuperação de carrinho no GHL; David confirmar login da Alessandra.

## 2026-06-23 (terça) — WhatsApp + CRM GoHighLevel

### Operações principais
- **Importação de 389 leads** no GoHighLevel: li planilha .xls do Gmail (4 abas, frios + aquecidos), consolidei 402 → 389 únicos, normalizei telefones (+1), e importei como contatos + oportunidades no estágio **Follow Up** do Marketing Pipeline (388 criadas). Tags lista-junho-2026 + lead-frio/lead-aquecido. Notas "LIGUEI" preservadas.
- **4 PDFs de venda** (carryover da noite anterior) confirmados; criados links/Finder pro David.
- **WhatsApp Business conectado no GoHighLevel**: ativei plano LC US$ 10/mês, conectei o número +1 774 777-8510 via Meta API em modo coexistência (David fez login Facebook + QR + OTP). Approved + Connected. Histórico sincronizou ~2269 contatos.
- **2 templates criados e aprovados (Active)**: primeiro_contato_lead_frio e primeiro_contato_lead_quente (pt-BR, Marketing, opt-out SAIR, {{1}}=nome no quente).
- **Diagnóstico dos bloqueios de envio** (ver lessons): janela 24h, país BR bloqueado, limite de marketing por usuário — tudo por conta nova não verificada. Teste de envio livre (janela aberta) funcionou e foi entregue.
- **Verificação do Meta Business submetida** pela entidade Wise Pro LLC (achamos o registro na Secretaria de Estado de MA, id 001731898; David localizou o EIN). Em análise (até 48h).
- **Acesso criado pra Alessandra Freire** (User limitado) no CRM.
- **2 Smart Lists** criadas: Leads Frios (286) + Leads Aquecidos (102).

### Decisões tomadas
- CRM real = GoHighLevel. WhatsApp via Meta API oficial (não Z-API) pra abordagem. Não disparar 389 de uma vez — verificar + aquecer. Templates sem preço, com opt-out. Alessandra = acesso limitado.

### Pendências geradas
- Aguardar verificação Meta (~25/06). Manual da vendedora; automação de follow-up; religar recuperação de carrinho no GHL; David confirmar login da Alessandra.

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
