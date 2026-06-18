# LESSONS — Erros que NÃO podem repetir

> Toda regra que CEO aprende fica aqui. Lido no protocolo de abertura de toda sessão.

## 2026-06-18 — Reportei status de campanha Meta pelo botão liga/desliga, não pela entrega real
- **O quê:** ao analisar a conta Wise Pro Academy via MCP do Facebook, chamei duas campanhas de "ativas" porque o `effective_status` vinha ACTIVE (botão on). O David corrigiu pelo print: o campo Delivery mostrava "Completed". As campanhas tinham batido a data de fim (31/mai) e estavam paradas há 18 dias.
- **Por quê:** confiei no toggle (`status`/`effective_status`) em vez do campo `delivery`, que é a verdade sobre se a campanha está realmente entregando.
- **Custo:** retrabalho de refazer a análise; recomendações erradas ("renova criativo pra combater fadiga" numa campanha que já tinha encerrado).
- **Não repetir:** SEMPRE puxar o campo `delivery` (status + substatuses) ao reportar estado de campanha Meta. `delivery: completed`/`off` = não está no ar, mesmo com botão ligado. Toggle on ≠ entregando. Os números de uma campanha "completed" continuam válidos (são finais), mas o enquadramento é post-mortem, não campanha viva.
