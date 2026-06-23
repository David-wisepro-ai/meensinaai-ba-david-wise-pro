# Pendências em Aberto — Wise Pro Academy

> Lista viva. Atualizada no fechamento de cada sessão. Lida na abertura.
> Ordem: 🔴 críticas → 🟡 médias → 🟢 baixas
> Marcar resolvidas com ✅ + data, mover pra seção "Resolvidas" no fim.

## Em aberto

### 🔴 Críticas
> Mapa completo passo a passo em [[meu-negocio/SETUP-CREDENCIAIS]]. Enquanto vazias, a escola roda em "modo seguro" (não cobra/não loga/não dispara).

- [x] ✅ **Supabase** — projeto criado (`grjqedhjbsvkqruylqom`), 5 tabelas criadas com RLS, **598 questões carregadas** (2026-06-15, via PostgREST). URL: `https://grjqedhjbsvkqruylqom.supabase.co`
- [x] ✅ **Deploy na Vercel** — site NO AR (2026-06-15). **Renomeado em 2026-06-22 → https://wiseproacademy.vercel.app** (sem meensinaai/david). Plano Hobby grátis, repo público, root `frontend/`, Next.js.
- [x] ✅ **Env vars do Supabase na Vercel** — as 4 variáveis (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY publishable, SUPABASE_SERVICE_ROLE_KEY secret) gravadas em Production+Preview (2026-06-15). Acordam login/leads/portal no próximo deploy.
- [ ] 🔐 **Rotacionar a chave secreta do Supabase** — durante o setup a secret apareceu em texto numa tela da sessão. Boa prática: gerar nova secret no Supabase, atualizar a env var, apagar a antiga. — dono: David + Zuck
- [ ] **Stripe (POR ÚLTIMO)** — criar 3 produtos/preços + chaves + webhook. Sem isso: checkout não cobra (trava em `checkout_iniciado`). — dono: David
- [ ] **IDs de rastreamento na Vercel** — colar `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `META_PIXEL_ID`, `META_CAPI_TOKEN` (código já provisionado; degrada vazio). — dono: David
- [ ] 🎬 **Migrar vídeos das aulas Drive → Panda Video** — Aulas 1, 2 e 3 do Portal PM já montadas (capa + título + descrição), mas com o vídeo no **Google Drive (PROVISÓRIO)**. Drive tem risco de erro de quota no curso pago. Player já aceita YouTube/Drive/Panda — é só trocar a URL em `PortalLessons.tsx`. — dono: David + Zuck
- [ ] 🔗 **Conferir compartilhamento dos vídeos no Drive** — cada arquivo precisa estar "qualquer pessoa com o link → leitor", senão o aluno não vê. — dono: David
- [ ] **Aula 1 do PM sem descrição** + montar **Aulas 4 a 8** (PM) e as aulas do Construtor — David manda capa + vídeo + título de cada. — dono: David
- [ ] **VSLs das landings** — hoje as 3 páginas de venda usam imagem de obra no lugar do VSL. Quando o David gravar, trocar a imagem pelo vídeo (campo `imagemTopo` → `Vsl`). — dono: David
- [ ] **Cron de recuperação** rebaixado pra 1x/dia (limite do plano Hobby; era 15 min). Revisitar se subir pro Pro. — Zuck

### 🟡 Médias

- [ ] **Decidir hospedagem pública dos 4 PDFs de venda** — hoje os PDFs (Construction Project Manager, CSL Online, CSL Presencial, Wise Day) estão só em `~/Downloads/Wise Pro - PDFs de Venda/` (arquivo local). David perguntou se quer transformá-los em link público (Google Drive ou rota `/pdf` no site Vercel) pra vendedora mandar 1 link clicável em vez do anexo. Gerador reproduzível em `/tmp/gerar_pdfs.py`. — dono: David decide
- [ ] **Resend** (e-mail) + **WhatsApp Stevo/Z-API** — pra recuperação de carrinho disparar. — dono: David
- [ ] **Rodar `npm install && npm run build`** no `frontend/` numa máquina com Node pra confirmar compilação (não há Node no ambiente do Cloud Code). — dono: David ou /victor
- [ ] **Lead de WhatsApp (Facebook Ads) não entra no CRM hoje** — furo antigo da escola. Nenhuma rota escreve `lead_novo`/`atendimento` ainda. — dono: David + Zuck
- [ ] **Pedro CRM** — token + criar os 7 estágios do pipeline + etiquetas de upsell. — dono: David

### 🟢 Baixas

- [ ] **Acentuação pt-BR no portal + copy de recuperação de carrinho** — a landing já foi corrigida; falta o mesmo nas telas do portal (`app/portal/`, `Portal*`) e na copy de e-mail/WhatsApp da recuperação (`app/api/recuperacao/copy.ts`). — Zuck

- [ ] **Gravar os 4 VSLs** (3 landings + apresentação). Slots prontos no código. — dono: David
- [ ] **Reviews reais do Google** — popular os cards placeholder (squad gbp-escola). — dono: David
- [ ] **Confirmar dados oficiais** (endereço/telefone) pro schema EducationalOrganization + EIN da empresa. — dono: David
- [ ] **Definir objetivos de 90 dias** com o David (pra calibrar plano de ação). — dono: David
- [ ] **brand-voice.md** ainda não gerado (squad de marca). — Zuck

## Resolvidas

(vazio)

---

## Como usar este arquivo

**No fechamento da sessão:**
1. Adicionar pendências novas que surgiram
2. Marcar com ✅ + data as que foram resolvidas hoje (mover pra "Resolvidas")
3. Reordenar por prioridade

**Na abertura:**
1. Ler tudo em "Em aberto"
2. Reportar as 5 mais críticas pro dono
3. Sugerir prioridade do dia baseada nelas
