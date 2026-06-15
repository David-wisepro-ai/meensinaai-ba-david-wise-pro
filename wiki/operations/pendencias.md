# Pendências em Aberto — Wise Pro Academy

> Lista viva. Atualizada no fechamento de cada sessão. Lida na abertura.
> Ordem: 🔴 críticas → 🟡 médias → 🟢 baixas
> Marcar resolvidas com ✅ + data, mover pra seção "Resolvidas" no fim.

## Em aberto

### 🔴 Críticas
> Mapa completo passo a passo em [[meu-negocio/SETUP-CREDENCIAIS]]. Enquanto vazias, a escola roda em "modo seguro" (não cobra/não loga/não dispara).

- [x] ✅ **Supabase** — projeto criado (`grjqedhjbsvkqruylqom`), 5 tabelas criadas com RLS, **598 questões carregadas** (2026-06-15, via PostgREST). URL: `https://grjqedhjbsvkqruylqom.supabase.co`
- [ ] **Deploy na Vercel** — conectar repo (root = `frontend/`) + colar env vars (publishable + secret key do Supabase). Sem isso: site não fica no ar. — dono: David + Zuck (próximo passo)
- [ ] **Stripe** — criar 3 produtos/preços + chaves + webhook. Sem isso: checkout não cobra (trava em `checkout_iniciado`). — dono: David

### 🟡 Médias

- [ ] **Resend** (e-mail) + **WhatsApp Stevo/Z-API** — pra recuperação de carrinho disparar. — dono: David
- [ ] **Rodar `npm install && npm run build`** no `frontend/` numa máquina com Node pra confirmar compilação (não há Node no ambiente do Cloud Code). — dono: David ou /victor
- [ ] **Lead de WhatsApp (Facebook Ads) não entra no CRM hoje** — furo antigo da escola. Nenhuma rota escreve `lead_novo`/`atendimento` ainda. — dono: David + Zuck
- [ ] **Pedro CRM** — token + criar os 7 estágios do pipeline + etiquetas de upsell. — dono: David

### 🟢 Baixas

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
