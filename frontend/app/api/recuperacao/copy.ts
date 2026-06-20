// Copy das sequencias de recuperacao de carrinho (3 produtos).
// Fonte de verdade legivel: meu-negocio/recuperacao-carrinho/copy-recuperacao.md
// Aqui fica a versao "de maquina" (com placeholders) usada pelo disparo.
// {{nome}} = primeiro nome do lead | {{link}} = link de retomada do checkout.

export type ProductKey = 'project_manager' | 'construtor' | 'wise_day';

type Copy = {
  label: string;
  emailSubject: string;
  emailBody: string; // texto puro; \n vira <br> no envio
  whatsapp: string;
};

export const RECOVERY_COPY: Record<ProductKey, Copy> = {
  project_manager: {
    label: 'Project Manager',
    emailSubject: '{{nome}}, sua vaga no Project Manager ficou guardada',
    emailBody: [
      'Oi {{nome}},',
      '',
      'Vi que voce comecou sua inscricao no Project Manager e parou no meio. Acontece, sem problema.',
      '',
      'So queria te lembrar do porque voce chegou ate aqui: voce quer comecar pra valer no ramo da construcao aqui nos EUA, e o Project Manager e o primeiro passo certo pra isso. Sao quase 2 meses de aulas ao vivo, com 1 ano de acesso, pra voce entender a base antes de partir pra licenca.',
      '',
      'Sua vaga ainda esta guardada. E so retomar de onde voce parou:',
      '',
      '{{cta}}',
      '',
      'Qualquer duvida sobre conteudo, datas ou pagamento, e so responder este e-mail. A gente te ajuda a dar esse primeiro passo direito.',
      '',
      'Um abraco,',
      'Equipe Wise Pro Academy',
    ].join('\n'),
    whatsapp:
      'Oi {{nome}}, aqui e da Wise Pro Academy. Vi que voce comecou sua inscricao no Project Manager e nao chegou a concluir. Ficou alguma duvida sobre as aulas, as datas ou o pagamento? Se quiser, retomo aqui com voce em 2 minutos. Seu link pra continuar: {{link}}',
  },
  construtor: {
    label: 'Curso de Construtor',
    emailSubject: '{{nome}}, falta pouco pra destravar seus simulados de CSL',
    emailBody: [
      'Oi {{nome}},',
      '',
      'Vi que voce comecou sua inscricao no Curso de Construtor e parou antes de concluir. Queria te dar uma mao com isso.',
      '',
      'Voce sabe melhor do que ninguem: a prova da CSL e em ingles e cheia de codigo. So assistir aula nao basta, o que faz passar e treinar ate achar a resposta no codigo em segundos. E exatamente isso que o Construtor te entrega: as aulas com a gente, online (de segunda a sexta) ou presencial (em 4 sabados), mais o acesso ao portal de simulados, com explicacao e a secao do codigo em cada questao.',
      '',
      'Quem termina o curso para de "estudar no escuro" e passa a treinar do jeito que a prova cobra. Sua inscricao ainda esta aberta:',
      '',
      '{{cta}}',
      '',
      'Se ficou alguma duvida sobre as datas (online ou presencial), o portal ou o pagamento, responde este e-mail que a gente resolve. Voce ja deu o passo mais dificil, que e decidir. Vamos terminar isso juntos.',
      '',
      'Um abraco,',
      'Equipe Wise Pro Academy',
    ].join('\n'),
    whatsapp:
      'Oi {{nome}}, aqui e da Wise Pro Academy. Vi que voce comecou a inscricao no Curso de Construtor e parou no meio. Esse e o curso que te da as aulas (online ou presencial) mais o portal de simulados pra treinar pra CSL. Posso te tirar alguma duvida sobre as datas ou o pagamento? Seu link pra continuar de onde parou: {{link}}',
  },
  wise_day: {
    label: 'Wise Day',
    emailSubject: '{{nome}}, sua vaga no Wise Day com o David',
    emailBody: [
      'Oi {{nome}},',
      '',
      'Vi que voce comecou sua inscricao no Wise Day e nao concluiu. Como esse e um dia presencial e direto com o David, as vagas por data sao poucas, entao quis te avisar pessoalmente.',
      '',
      'O Wise Day e pra quem quer sentar um dia inteiro com quem ja fez acontecer no ramo e sair com as duvidas da CSL resolvidas, os pontos do codigo destravados e um plano claro pra prova. E o empurrao final pra quem nao quer adiar a licenca mais um ciclo.',
      '',
      'Sua vaga ainda esta reservada. E so concluir:',
      '',
      '{{cta}}',
      '',
      'Se quiser confirmar a data ou tirar qualquer duvida sobre o pagamento, responde este e-mail. A gente segura sua vaga enquanto voce decide.',
      '',
      'Um abraco,',
      'Equipe Wise Pro Academy',
    ].join('\n'),
    whatsapp:
      'Oi {{nome}}, aqui e da Wise Pro Academy. Vi que voce comecou a inscricao no Wise Day, o dia presencial com o David. Como as vagas por data sao limitadas, quis falar com voce direto. Quer que eu confirme a data disponivel e te ajude a fechar? Seu link pra concluir: {{link}}',
  },
};

export function isProductKey(p: string | null | undefined): p is ProductKey {
  return p === 'project_manager' || p === 'construtor' || p === 'wise_day';
}

export function firstName(name?: string | null): string {
  if (!name) return 'tudo bem';
  return name.trim().split(/\s+/)[0] || 'tudo bem';
}

// Escapa HTML pra montar o corpo do e-mail com seguranca.
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function fillEmail(product: ProductKey, nome: string, link: string) {
  const c = RECOVERY_COPY[product];
  const subject = c.emailSubject.replace(/\{\{nome\}\}/g, nome);

  const ctaLabel = product === 'wise_day' ? 'Garantir minha vaga' : 'Retomar minha inscricao';
  const safeLink = encodeURI(link);
  const ctaHtml =
    `<a href="${safeLink}" style="display:inline-block;background:#0A1F44;color:#C9A227;` +
    `padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">${escapeHtml(ctaLabel)}</a>`;

  const bodyHtml = c.emailBody
    .replace(/\{\{nome\}\}/g, escapeHtml(nome))
    .split('\n')
    .map((line) => (line === '{{cta}}' ? ctaHtml : escapeHtml(line)))
    .join('<br>');

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#0A1F44">${bodyHtml}</div>`;

  // versao texto puro (fallback) com o link visivel
  const text = c.emailBody
    .replace(/\{\{nome\}\}/g, nome)
    .replace('{{cta}}', `${ctaLabel}: ${link}`);

  return { subject, html, text };
}

export function fillWhatsapp(product: ProductKey, nome: string, link: string) {
  return RECOVERY_COPY[product].whatsapp
    .replace(/\{\{nome\}\}/g, nome)
    .replace(/\{\{link\}\}/g, link);
}
