import Landing from '../../components/Landing';

export const metadata = {
  title: 'Curso de Construtor — Tire sua CSL em Massachusetts | Wise Pro Academy',
  description:
    'Curso presencial de 6 dias mais portal de simulados CSL. A preparação completa, em português, pra você passar na prova de Construction Supervisor License e trabalhar legalmente na construção em Massachusetts.',
};

export default function Page() {
  return (
    <Landing
      product="construtor"
      nome="Curso de Construtor"
      preco="US$ 597"
      selo="Curso principal"
      headline="Tire sua CSL e trabalhe legalmente na construção em Massachusetts"
      subheadline="Curso presencial de 6 dias em português mais o portal de simulados que treina você até passar na prova de Construction Supervisor License. A aula te ensina; o portal te aprova."
      vslLegenda="David mostra como funciona o curso e por que o portal de simulados é o que faz o aluno passar."
      dores={[
        'A prova é em inglês e cheia de código (IRC, IBC, IECC, OSHA) e você tem medo de não passar.',
        'Não consegue achar a resposta no livro rápido o suficiente durante a prova.',
        'Já fez curso antes e não passou, porque só a aula não basta sem treino de verdade.',
        'Está comparando escolas e quer a que realmente faz o aluno ser aprovado.',
      ]}
      beneficios={[
        {
          titulo: '6 dias presenciais',
          texto:
            'Preparação intensiva e presencial que cobre o que cai na prova de CSL, conduzida em português.',
        },
        {
          titulo: 'Portal de simulados',
          texto:
            'Acesso ao portal com quizzes por categoria e provas completas. Cada questão tem feedback, explicação e referência ao código oficial.',
        },
        {
          titulo: 'Aprenda a achar no livro',
          texto:
            'No nível iniciante mostramos a seção; no avançado, você acha sozinho. É assim que você ganha velocidade na prova real.',
        },
        {
          titulo: 'Questões originais e atualizadas',
          texto:
            'Banco de questões ancorado no código oficial (780 CMR, IRC, IBC, IECC, OSHA), sempre atualizado e exclusivo da Wise Pro.',
        },
      ]}
      incluso={[
        'Curso presencial de 6 dias, em português.',
        'Acesso ao portal de simulados CSL (quizzes por categoria e provas completas).',
        'Feedback, explicação e referência ao código em cada questão.',
        'Níveis iniciante e avançado para você evoluir até passar.',
        'Material de apoio focado na prova de Construction Supervisor License.',
      ]}
      formato="Presencial · 6 dias · portal de simulados incluso · em português"
      ctaPrincipal="Quero minha licença"
      ctaForm="Quero minha licença"
      upsell={{
        texto:
          'Quer ir além da prova e ver tudo na prática? O Wise Day é um dia presencial com o David, no campo, resolvendo dúvidas reais de obra, permit e código.',
        href: '/wise-day',
        rotulo: 'Conhecer o Wise Day',
      }}
    />
  );
}
