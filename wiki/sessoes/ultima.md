# Última Sessão — espelho

> Este arquivo é SEMPRE uma cópia do relatório da sessão mais recente.
> O Protocolo de Abertura lê este arquivo pra saber onde paramos.
> O Protocolo de Fechamento sobrescreve este arquivo com o relatório novo.

---

# Sessão 2026-06-22 — operação (noite de 21 que entrou na madrugada)

> Duração aproximada: longa | CEO: Zuck

## O que rodou hoje
- Renomeado o site na Vercel: tirado `meensinaai` e `david` da URL → link novo **https://wiseproacademy.vercel.app**. Site antigo azul intocado na Hostinger; domínio wiseproacademy.io não migrado.
- Páginas de venda padronizadas no dark premium. VSL removido e trocado por imagens de obra (PM = equipe planejando; Construtor = dupla na planta). Seção de professores na página do PM.
- Portal do aluno: separação por produto verificada (PM só vê PM, Construtor só vê Construtor). 2 logins de teste criados.
- Prova completa virou formato real da CSL: pular questão, navegar livre, navegador de questões, finalizar com revisão. Novo endpoint `/api/quiz/grade`. Quiz por categoria intocado.
- Bug corrigido: portal travava em "Carregando" (deadlock do Supabase auth).
- Player de aula passou a aceitar YouTube e Google Drive. Montadas Aulas 1, 2 e 3 do Portal PM (capa + vídeo Drive + título + descrição).

## Decisões tomadas
- Manter site antigo no ar; usar `.vercel.app` pro novo.
- Portais PM e Construtor mutuamente exclusivos por compra.
- Prova completa sem feedback no meio (só ao finalizar).
- Vídeos via Drive são provisórios → migrar pro Panda Video.

## Pendências geradas/atualizadas
- 🔴 Migrar vídeos das aulas Drive → Panda — David + Zuck
- 🔴 Conferir compartilhamento dos vídeos no Drive — David
- 🔴 Rotacionar a chave secreta do Supabase — David + Zuck
- 🟡 Descrição da Aula 1; Aulas 4-8; Stripe; rastreamento — David

## Números do dia
- 598 questões no banco. Portal PM: 3 de 8 aulas montadas. Logins de teste: teste@ (Construtor) e teste-pm@ (PM), senha WisePro2026!.

## Próxima sessão — onde retomar
- Migrar os 3 vídeos pro Panda (ou confirmar compartilhamento no Drive).
- Receber descrição da Aula 1 e próximas aulas.
- Quando o David quiser: Stripe + rastreamento.

## Bloqueios
- Vídeos, Stripe e rastreamento dependem do David.
