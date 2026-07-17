# DECISOES — Regras travadas desta empresa (ledger)

> Este arquivo e a memoria de decisoes da SUA empresa. Cada regra resolvida de verdade e gravada
> aqui pelos agentes — e o `guardiao` confere toda entrega contra esta lista pra nenhuma regra
> resolvida voltar a quebrar. Voce (dono) nao precisa mexer aqui; os agentes cuidam disso.
>
> REGRAS DO ARQUIVO (pros agentes):
> - **Append-only:** entrada nova sempre NO TOPO da lista. Nunca editar nem apagar entrada antiga
>   (o historico e a prova). Se uma decisao mudar, grava-se uma NOVA entrada que substitui a
>   anterior, citando-a.
> - **Formato de cada entrada:** data + decisao em 1 frase + por que + evidencia/contexto.
> - **O que entra:** regra estrutural resolvida (ex.: "moeda sempre em centavos inteiros",
>   "este relatorio fecha ao centavo", "nunca usar o tom X nas mensagens"). O que NAO entra:
>   preferencia passageira, tarefa do dia.

---

## Decisoes travadas (mais recente primeiro)

<!-- Os agentes gravam as entradas abaixo desta linha. Exemplo de formato:

### 2026-01-01 — [Titulo curto da decisao]
- **Decisao:** [1 frase objetiva]
- **Por que:** [motivo em 1-2 frases]
- **Evidencia/contexto:** [onde foi resolvido, arquivo ou conversa]
-->

### 2026-06-15 — Banco de questoes CSL: SO questoes ORIGINAIS ancoradas em fonte oficial (LINHA VERMELHA)
- **Decisao:** O gerador de questoes cria SOMENTE questoes originais ancoradas em fontes oficiais (780 CMR Mass State Building Code, IRC, IBC, IECC, OSHA + blueprint publico do exame CSL), cada uma com explicacao + referencia a secao. NUNCA copiar, "misturar" ou raspar banco de concorrente, Quizlet, ou questoes protegidas da Prometric.
- **Por que:** Propriedade intelectual / etica — risco #1 do build. O banco da Prometric e protegido; copiar e ilegal e indefensavel. O caminho original entrega MAIS questao e e defensavel, que e o que o David quer.
- **Evidencia/contexto:** ADR (adr.md), Riscos #1 + Parametros confirmados 2026-06-15.

### 2026-06-15 — Questao so vai pro aluno se VERIFIED
- **Decisao:** Cada questao so e servida ao aluno com gabarito confirmado + citacao da secao anexada + flag `verified`. Questao nao verificada vai pra fila de revisao, NUNCA pro aluno.
- **Por que:** Resposta/explicacao/referencia erradas ensinam errado e reprovam o aluno na prova real. O motor de simulado e o item-rei do produto.
- **Evidencia/contexto:** ADR, Parametros confirmados 2026-06-15 (motor = gerador+verificador).

### 2026-06-15 — Portal NAO constroi nem auxilia colinha de prova
- **Decisao:** O portal treina o aluno a achar a resposta no codigo rapido (livro aberto, anotacao a mao permitida). NUNCA construir, gerar ou auxiliar "colinha" impressa pra esconder no livro.
- **Por que:** Burla de regra de exame; linha vermelha etica.
- **Evidencia/contexto:** ADR, Riscos #2.

### 2026-06-15 — Construtora (2a empresa) FORA DE ESCOPO
- **Decisao:** A empresa de construcao do David esta fora do build inicial (ja tem CRM/automacao pela "Inov"). So recebe agentes carimbados de trafego/SEO/Google. Nenhuma estrutura dedicada de 2a empresa agora.
- **Por que:** Escopo fechado na aprovacao; nao inflar entrega com o que ja e resolvido por outro time.
- **Evidencia/contexto:** ADR, Manifesto de Build + Parametros 2026-06-15.

### 2026-06-15 — Capturar nome/email/telefone ANTES do Stripe; CRM = Pedro
- **Decisao:** O funil grava o lead (nome/email/telefone) no Supabase ANTES de iniciar o checkout Stripe (habilita recuperacao de carrinho). CRM/pipeline dos 3 produtos = Pedro (nao reconstruir). Marca = azul-marinho + dourado.
- **Por que:** Sem captura pre-Stripe nao ha recuperacao de carrinho, dor central da escola (leads perdidos no WhatsApp).
- **Evidencia/contexto:** ADR, Manifesto + Parametros 2026-06-15.

### 2026-07-17 — Ledger semeado do ADR na migracao v2
- **Decisao:** As entradas acima foram travadas a partir do ADR aprovado (adr.md) para o guardiao vigiar. Segredos (Stripe, Resend, Z-API) sempre no `.env` (gitignored) e escrubados.
- **Por que:** Enforcement v2 — as regras estruturais do negocio passam a ser conferidas em toda entrega.
- **Evidencia/contexto:** Varredura v2 da frota, 2026-07-17.
