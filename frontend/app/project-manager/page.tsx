import Landing from '../../components/Landing';

export const metadata = {
  title: 'Project Manager — Comece na construção em Massachusetts | Wise Pro Academy',
  description:
    'O primeiro passo pra trabalhar legalmente com construção em Massachusetts. Curso ao vivo em português, acesso de 1 ano e a base pra avançar até a sua licença de construtor (CSL).',
};

export default function Page() {
  return (
    <Landing
      product="project_manager"
      nome="Project Manager"
      preco="US$ 250"
      selo="Porta de entrada"
      headline="O primeiro passo pra trabalhar com construção em Massachusetts do jeito certo"
      subheadline="Entenda como funciona a construção nos EUA, organize sua carreira no ramo e prepare o terreno pra tirar a sua CSL. Tudo ao vivo, em português, com quem já fez acontecer."
      vslLegenda="David apresenta o Project Manager e por que ele é o melhor ponto de partida."
      dores={[
        'Você trabalha (ou quer trabalhar) com construção nos EUA, mas ainda se sente perdido sobre como tudo funciona por aqui.',
        'Quer crescer no ramo de forma legal e profissional, sem depender de improviso.',
        'Sente que a barreira do inglês técnico te trava na hora de evoluir.',
        'Sabe que precisa de uma base sólida antes de encarar a prova da licença de construtor.',
      ]}
      beneficios={[
        {
          titulo: 'Entenda o jogo',
          texto:
            'Como funciona a construção em Massachusetts: papéis, responsabilidades, permits e o caminho até a CSL, explicado em português.',
        },
        {
          titulo: 'Aprenda ao vivo',
          texto:
            'Aulas ao vivo ao longo de cerca de 2 meses, para você tirar dúvidas reais com quem atua no mercado.',
        },
        {
          titulo: 'Acesso por 1 ano',
          texto:
            'Revise o conteúdo no seu ritmo durante 1 ano inteiro, quantas vezes precisar.',
        },
        {
          titulo: 'Base pra avançar',
          texto:
            'Saia preparado para dar o próximo passo: o Curso de Construtor e a conquista da sua licença.',
        },
      ]}
      incluso={[
        'Curso ao vivo em português (turma de aproximadamente 2 meses).',
        'Acesso ao conteúdo por 1 ano.',
        'Fundamentos da construção nos EUA e do mercado de Massachusetts.',
        'Orientação clara sobre o caminho até a CSL.',
      ]}
      formato="Ao vivo · turma de ~2 meses · acesso por 1 ano · em português"
      ctaPrincipal="Quero começar agora"
      ctaForm="Quero começar"
      upsell={{
        texto:
          'Já decidiu que quer a licença? O Curso de Construtor é o próximo passo: 6 dias presenciais e acesso ao portal de simulados que faz você passar na prova.',
        href: '/curso-construtor',
        rotulo: 'Conhecer o Curso de Construtor',
      }}
    />
  );
}
