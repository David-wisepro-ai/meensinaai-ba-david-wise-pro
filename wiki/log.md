# LOG — Histórico operacional

> Append-only. Nova entrada por dia/sessão pelo `/boa-noite`.

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
