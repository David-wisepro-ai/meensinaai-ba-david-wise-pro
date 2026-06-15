---
versao: 1.0.0
ultima_atualizacao: 2026-06-15
gerado_por: juliana (Cart Recovery)
status: pronto (depende de credenciais do David pra disparar)
---

# Recuperacao de Carrinho - Copy dos 3 produtos

> Sequencia por produto: e-mail na hora do abandono (Resend) + WhatsApp ~3h depois (Stevo/Z-API) + handoff humano pra atendente.
> Tom: acolhedor, autoridade, sem pressao agressiva. Foco em "te ajudar a passar e a tirar a licenca". Portugues acentuado. Horarios em AM/PM.
> Variaveis: `{{nome}}` = primeiro nome do lead, `{{link}}` = link de retomada do checkout.

---

## Regras de copy (todos os produtos)

- NUNCA prometer "gabarito" nem atalho ilegal. O gancho e: voce ja comecou, falta pouco, a gente te ajuda a chegar la.
- Zero hifen longo (- -). Acentuacao completa.
- E-mail: um CTA claro (botao "Retomar minha inscricao"). WhatsApp: curto, humano, uma pergunta aberta no fim pra abrir conversa (prepara o handoff).
- Sem contagem regressiva falsa. Escassez so quando real (turma com data, vaga presencial limitada).

---

# 1. Project Manager (~US$ 250 - porta de entrada, ao vivo ~2 meses, acesso 1 ano)

**Dor:** quer comecar no ramo da construcao nos EUA, deu o primeiro passo e parou. Risco: adiar o comeco mais um ciclo.

### E-mail (T+0, Resend)

**Assunto:** {{nome}}, sua vaga no Project Manager ficou guardada

**Corpo:**

```
Oi {{nome}},

Vi que voce comecou sua inscricao no Project Manager e parou no meio. Acontece, sem problema.

So queria te lembrar do porque voce chegou ate aqui: voce quer comecar pra valer no ramo da construcao aqui nos EUA, e o Project Manager e o primeiro passo certo pra isso. Sao quase 2 meses de aulas ao vivo, com 1 ano de acesso, pra voce entender a base antes de partir pra licenca.

Sua vaga ainda esta guardada. E so retomar de onde voce parou:

[ Retomar minha inscricao ]  ->  {{link}}

Qualquer duvida sobre conteudo, datas ou pagamento, e so responder este e-mail. A gente te ajuda a dar esse primeiro passo direito.

Um abraco,
Equipe Wise Pro Academy
```

### WhatsApp (T+~3h, Stevo/Z-API - numero da atendente)

```
Oi {{nome}}, aqui e da Wise Pro Academy. Vi que voce comecou sua inscricao no Project Manager e nao chegou a concluir. Ficou alguma duvida sobre as aulas, as datas ou o pagamento? Se quiser, retomo aqui com voce em 2 minutos. Seu link pra continuar: {{link}}
```

---

# 2. Curso de Construtor (US$ 597 - PRINCIPAL, presencial 6 dias, destrava o portal de simulados)

**Dor:** quer tirar a CSL, tem medo da prova em ingles cheia de codigo (IRC, IBC, IECC, OSHA), e adiar significa adiar a licenca e o crescimento no ramo.

### E-mail (T+0, Resend)

**Assunto:** {{nome}}, falta pouco pra destravar seus simulados de CSL

**Corpo:**

```
Oi {{nome}},

Vi que voce comecou sua inscricao no Curso de Construtor e parou antes de concluir. Queria te dar uma mao com isso.

Voce sabe melhor do que ninguem: a prova da CSL e em ingles e cheia de codigo. So assistir aula nao basta, o que faz passar e treinar ate achar a resposta no codigo em segundos. E exatamente isso que o Construtor te entrega: 6 dias presenciais com a gente e o acesso ao portal de simulados, com explicacao e a secao do codigo em cada questao.

Quem termina o curso para de "estudar no escuro" e passa a treinar do jeito que a prova cobra. Sua inscricao ainda esta aberta:

[ Retomar minha inscricao ]  ->  {{link}}

Se ficou alguma duvida sobre as datas presenciais, o portal ou o pagamento, responde este e-mail que a gente resolve. Voce ja deu o passo mais dificil, que e decidir. Vamos terminar isso juntos.

Um abraco,
Equipe Wise Pro Academy
```

### WhatsApp (T+~3h, Stevo/Z-API - numero da atendente)

```
Oi {{nome}}, aqui e da Wise Pro Academy. Vi que voce comecou a inscricao no Curso de Construtor e parou no meio. Esse e o curso que te da os 6 dias presenciais mais o portal de simulados pra treinar pra CSL. Posso te tirar alguma duvida sobre as datas ou o pagamento? Seu link pra continuar de onde parou: {{link}}
```

---

# 3. Wise Day (US$ 497 - premium, 1 dia presencial com o David)

**Dor:** quer um dia intensivo, direto com o David, pra fechar as lacunas antes da prova. Vagas presenciais limitadas por data.

### E-mail (T+0, Resend)

**Assunto:** {{nome}}, sua vaga no Wise Day com o David

**Corpo:**

```
Oi {{nome}},

Vi que voce comecou sua inscricao no Wise Day e nao concluiu. Como esse e um dia presencial e direto com o David, as vagas por data sao poucas, entao quis te avisar pessoalmente.

O Wise Day e pra quem quer sentar um dia inteiro com quem ja fez acontecer no ramo e sair com as duvidas da CSL resolvidas, os pontos do codigo destravados e um plano claro pra prova. E o empurrao final pra quem nao quer adiar a licenca mais um ciclo.

Sua vaga ainda esta reservada. E so concluir:

[ Garantir minha vaga ]  ->  {{link}}

Se quiser confirmar a data ou tirar qualquer duvida sobre o pagamento, responde este e-mail. A gente segura sua vaga enquanto voce decide.

Um abraco,
Equipe Wise Pro Academy
```

### WhatsApp (T+~3h, Stevo/Z-API - numero da atendente)

```
Oi {{nome}}, aqui e da Wise Pro Academy. Vi que voce comecou a inscricao no Wise Day, o dia presencial com o David. Como as vagas por data sao limitadas, quis falar com voce direto. Quer que eu confirme a data disponivel e te ajude a fechar? Seu link pra concluir: {{link}}
```

---

## Apos o WhatsApp: handoff humano

Depois do WhatsApp automatico, o lead fica marcado como `recuperacao_enviada` no Supabase. A atendente entra manual na conversa do WhatsApp dela (ela ja atende leads ali hoje), continua o atendimento e fecha. Sem terceira mensagem automatica, sem spam.

## Linha vermelha (vale pros 3)

- Sequencia curta: 1 e-mail + 1 WhatsApp. Nada alem disso e automatico.
- Sem promessa de gabarito, sem atalho ilegal, sem "decore X respostas".
- Se o lead pagar entre o e-mail e o WhatsApp, o disparo de WhatsApp NAO acontece (a logica so dispara em quem ainda esta `abandonado`/`recuperacao_email_enviada`).
