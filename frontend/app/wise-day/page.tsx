import Landing from '../../components/Landing';

export const metadata = {
  title: 'Wise Day — Um dia presencial com o David | Wise Pro Academy',
  description:
    'A experiência premium da Wise Pro Academy: um dia inteiro presencial com o David, na prática, resolvendo dúvidas reais de obra, permit e código. Pra quem quer acelerar de verdade na construção em Massachusetts.',
};

export default function Page() {
  return (
    <Landing
      product="wise_day"
      nome="Wise Day"
      preco="US$ 497"
      selo="Experiência premium"
      headline="Um dia inteiro com o David, na prática, acelerando a sua carreira na construção"
      subheadline="A experiência premium da Wise Pro Academy. Um dia presencial acompanhando quem já faz acontecer no ramo, com tempo dedicado pra resolver as suas dúvidas reais de obra, permit e código."
      vslLegenda="David explica como é o Wise Day e pra quem essa imersão de um dia foi feita."
      dores={[
        'Você já estudou, mas ainda tem dúvidas práticas que só veem solução no campo.',
        'Quer aprender com quem já está construindo de verdade nos EUA, não só na teoria.',
        'Precisa de atenção dedicada para destravar pontos específicos da sua operação.',
        'Quer acelerar os resultados depois do curso, com orientação direta.',
      ]}
      beneficios={[
        {
          titulo: 'Um dia presencial com o David',
          texto:
            'Tempo dedicado e próximo, acompanhando a prática com quem domina o mercado de construção em Massachusetts.',
        },
        {
          titulo: 'Dúvidas reais resolvidas',
          texto:
            'Traga suas questões de obra, permit e código e saia com respostas aplicáveis ao seu dia a dia.',
        },
        {
          titulo: 'Da teoria para o campo',
          texto:
            'Veja na prática o que o curso ensina e ganhe confiança para tomar decisões no canteiro.',
        },
        {
          titulo: 'Aceleração depois do curso',
          texto:
            'O complemento ideal pra quem fez o Curso de Construtor e quer dar o próximo salto com orientação direta.',
        },
      ]}
      incluso={[
        'Um dia inteiro presencial com o David.',
        'Acompanhamento da operação na prática.',
        'Tempo dedicado para as suas dúvidas de obra, permit e código.',
        'Orientação direta para acelerar a sua carreira no ramo.',
      ]}
      formato="Presencial · 1 dia com o David · experiência premium · em português"
      ctaPrincipal="Quero o Wise Day"
      ctaForm="Quero o Wise Day"
    />
  );
}
