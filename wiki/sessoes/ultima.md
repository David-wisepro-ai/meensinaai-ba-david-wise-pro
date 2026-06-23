# Última Sessão — espelho

> Este arquivo é SEMPRE uma cópia do relatório da sessão mais recente.
> O Protocolo de Abertura lê este arquivo pra saber onde paramos.
> O Protocolo de Fechamento sobrescreve este arquivo com o relatório novo.

# Sessão 2026-06-22 (noite ~20h40)

> Duração aproximada: ~1h | CEO: Zuck

## O que rodou hoje (noite)
- Trocada a frase da seção de autoridade da home: "quem viveu a obra" → "quem **vive** a obra de verdade" (presente). No ar (commit 42f5890).
- Criados **4 PDFs de venda** pra vendedora, um por produto: Construction Project Manager, CSL Online, CSL Presencial e Wise Day. Cada um com cabeçalho de marca (logo + faixa dourada), foto do produto no topo, todo o conteúdo da landing (gancho, sobre, pra-quem, o que ganha, incluso, formato, FAQ) e CTA verde de WhatsApp com **mensagem automática por produto**.
- Instalado reportlab + pillow no ambiente (não vinham). Gerador reproduzível em `/tmp/gerar_pdfs.py`. PDFs salvos em `~/Downloads/Wise Pro - PDFs de Venda/`.

## Decisões tomadas
- PDFs de venda sem preço dentro (vendedora passa o valor no WhatsApp — mesma lógica do funil só-WhatsApp).
- PDFs ficam no Downloads como anexo; hospedar como link público (Drive ou `/pdf` no site) ficou em aberto pro David decidir.

## Pendências geradas/atualizadas
- 🟡 Decidir hospedagem pública dos 4 PDFs (link clicável vs anexo) — dono: David.

## Números do dia
- 4 PDFs de venda gerados (1 por produto).
- 3 produtos ativos; 598 questões verificadas no banco; Portal PM com 3 de 8 aulas.

## Próxima sessão — onde retomar
- Se o David quiser, hospedar os 4 PDFs como link público (Drive ou rota `/pdf` no Vercel).
- Seguir o backlog crítico: migrar vídeos Drive → Panda + conferir compartilhamento dos vídeos; rotacionar a secret do Supabase.

## Bloqueios
- Nenhum novo. Stripe e tracking seguem "por último" conforme o David.
