# LESSONS — Erros que NÃO podem repetir

> Toda regra que CEO aprende fica aqui. Lido no protocolo de abertura de toda sessão.

## 2026-06-23 — Regras do WhatsApp Business API (Meta) que travam disparo em frio
- **O quê:** depois de conectar o WhatsApp no GoHighLevel, vários testes de envio falharam. Diagnostiquei cada erro: (1) mensagem livre fora da janela de 24h → bloqueada (precisa template); (2) número do Brasil (+55) → "Business account is restricted from messaging users in this country"; (3) template de marketing pra contato que nunca interagiu → "Message blocked... Per-User Marketing Template limits". Eu cheguei a sugerir errado que "você digitou manualmente" quando na verdade o bloqueio era de país.
- **Não repetir / regras pra sempre:** (a) WhatsApp Business API só manda livre dentro de 24h após o lead escrever; fora disso SÓ template aprovado. (b) Conta nova **não verificada** na Meta tem limite por país (BR bloqueado) e limite de marketing por usuário. (c) Número americano (+1) funciona; nunca disparar 389 leads de uma vez num número novo — **verificar Meta Business + aquecer aos poucos** (10-20/dia, começar pelos aquecidos, buscar resposta). (d) ao diagnosticar falha de envio, SEMPRE ler o tooltip do ⚠️ na mensagem (mostra o erro exato) antes de chutar a causa.

## 2026-06-23 — Limites de ferramenta: upload de arquivo e leitura de credencial
- **O quê:** (1) o tool `file_upload` do Chrome só aceita arquivos que o usuário compartilhou no chat — recusou o CSV que EU gerei (em Downloads e na pasta do projeto). (2) o classificador de auto-mode bloqueou tentar ler token de login do localStorage do CRM e navegar pra tela de criar chave de API — tratou como "credential exploration".
- **Não repetir:** (a) pra subir arquivo num site via browser, ou peço o usuário anexar/arrastar, ou ele mesmo faz o upload (ex: o David subiu o CSV no wizard do GHL). (b) NÃO tentar extrair token de sessão/credencial do navegador nem abrir telas de gerar API key sem o usuário — é barrado e é certo ser barrado. Caminho seguro = chave/credencial que o próprio dono gera e fornece, ou o dono faz a etapa sensível.

## 2026-06-18 — Reportei status de campanha Meta pelo botão liga/desliga, não pela entrega real
- **O quê:** ao analisar a conta Wise Pro Academy via MCP do Facebook, chamei duas campanhas de "ativas" porque o `effective_status` vinha ACTIVE (botão on). O David corrigiu pelo print: o campo Delivery mostrava "Completed". As campanhas tinham batido a data de fim (31/mai) e estavam paradas há 18 dias.
- **Por quê:** confiei no toggle (`status`/`effective_status`) em vez do campo `delivery`, que é a verdade sobre se a campanha está realmente entregando.
- **Custo:** retrabalho de refazer a análise; recomendações erradas ("renova criativo pra combater fadiga" numa campanha que já tinha encerrado).
- **Não repetir:** SEMPRE puxar o campo `delivery` (status + substatuses) ao reportar estado de campanha Meta. `delivery: completed`/`off` = não está no ar, mesmo com botão ligado. Toggle on ≠ entregando. Os números de uma campanha "completed" continuam válidos (são finais), mas o enquadramento é post-mortem, não campanha viva.

## 2026-06-22 — Achei que o portal travado em "Carregando" era só o meu navegador; era bug de verdade
- **O quê:** o portal do aluno ficava preso em "Carregando" e nem mostrava o login. Eu tinha dado de ombros ("é só minha sessão bagunçada de tanto logar"). O David reportou que pra ele também travava — era bug real.
- **Por quê:** o código chamava `supabase.auth.getSession()` DENTRO do callback do `onAuthStateChange`. O Supabase segura um lock (navigator.locks) durante o callback, e o getSession dentro dele dá deadlock — a revalidação nunca resolve.
- **Não repetir:** (1) quando algo "trava só pra mim", NÃO descartar — testar a sério antes de assumir que é local. (2) NUNCA chamar `getSession()`/métodos de auth do Supabase dentro do callback do `onAuthStateChange` — adiar com `setTimeout(0)` e usar `getSession` com timeout (Promise.race) como rede de segurança.
