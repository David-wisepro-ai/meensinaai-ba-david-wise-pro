# Recebimento de questoes — leia antes de usar

Esta pasta e onde voce **larga os arquivos de questoes** que a Me Ensina AI te manda.
Voce nao precisa entender de banco de dados, SQL ou codigo. Sao 2 passos.

## Como usar (2 passos)

1. **Cole o arquivo aqui.** Quando a Me Ensina AI te enviar um lote de questoes
   (um arquivo que termina em `.json`), salve ele DENTRO desta pasta
   (`meu-negocio/portal-aluno/recebimento/`). Pode colar mais de um de uma vez.

2. **Rode o comando.** No Claude Code, digite e envie:

   ```
   /carregar-questoes
   ```

   Pronto. O seu CEO IA le os arquivos, confere se estao certos, manda as
   questoes verificadas pro banco e te avisa quantas entraram. As questoes
   aparecem no portal do aluno **na hora, sem precisar republicar nada**.

## O que acontece depois

- Os arquivos que ja foram processados sao movidos pra pasta `processados/`
  (pra voce nao carregar o mesmo lote duas vezes sem querer).
- Se voce rodar o comando de novo com o mesmo arquivo, **nada duplica** — o
  sistema reconhece pelo `id` de cada questao e so atualiza.
- Questao marcada como "ainda nao verificada" **nao vai pro aluno**; fica numa
  fila de revisao. O comando te avisa quantas ficaram de fora.

## Onde a Me Ensina AI ve o formato exato

O contrato de como cada arquivo precisa ser montado esta em `FORMATO.md`
(nesta mesma pasta). E a referencia que a equipe usa pra te mandar os lotes
no padrao certo.

## Importante

- Nunca cole aqui senha, chave ou token. So arquivos de questoes (`.json`).
- Se o comando reclamar de algum arquivo, ele te diz **em portugues simples**
  o que esta faltando. E so reenviar pra Me Ensina AI corrigir.
