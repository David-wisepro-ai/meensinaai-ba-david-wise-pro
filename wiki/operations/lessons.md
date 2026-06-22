# LESSONS — Erros que NÃO podem repetir

> Toda regra que CEO aprende fica aqui. Lido no protocolo de abertura de toda sessão.

## 2026-06-18 — Reportei status de campanha Meta pelo botão liga/desliga, não pela entrega real
- **O quê:** ao analisar a conta Wise Pro Academy via MCP do Facebook, chamei duas campanhas de "ativas" porque o `effective_status` vinha ACTIVE (botão on). O David corrigiu pelo print: o campo Delivery mostrava "Completed". As campanhas tinham batido a data de fim (31/mai) e estavam paradas há 18 dias.
- **Por quê:** confiei no toggle (`status`/`effective_status`) em vez do campo `delivery`, que é a verdade sobre se a campanha está realmente entregando.
- **Custo:** retrabalho de refazer a análise; recomendações erradas ("renova criativo pra combater fadiga" numa campanha que já tinha encerrado).
- **Não repetir:** SEMPRE puxar o campo `delivery` (status + substatuses) ao reportar estado de campanha Meta. `delivery: completed`/`off` = não está no ar, mesmo com botão ligado. Toggle on ≠ entregando. Os números de uma campanha "completed" continuam válidos (são finais), mas o enquadramento é post-mortem, não campanha viva.

## 2026-06-22 — Achei que o portal travado em "Carregando" era só o meu navegador; era bug de verdade
- **O quê:** o portal do aluno ficava preso em "Carregando" e nem mostrava o login. Eu tinha dado de ombros ("é só minha sessão bagunçada de tanto logar"). O David reportou que pra ele também travava — era bug real.
- **Por quê:** o código chamava `supabase.auth.getSession()` DENTRO do callback do `onAuthStateChange`. O Supabase segura um lock (navigator.locks) durante o callback, e o getSession dentro dele dá deadlock — a revalidação nunca resolve.
- **Não repetir:** (1) quando algo "trava só pra mim", NÃO descartar — testar a sério antes de assumir que é local. (2) NUNCA chamar `getSession()`/métodos de auth do Supabase dentro do callback do `onAuthStateChange` — adiar com `setTimeout(0)` e usar `getSession` com timeout (Promise.race) como rede de segurança.
