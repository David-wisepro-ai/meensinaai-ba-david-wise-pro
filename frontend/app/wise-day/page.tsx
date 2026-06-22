import Landing from '../../components/Landing';
import TrackView from '../../components/TrackView';
import { WA_MSG } from '../../lib/brand';

export const metadata = {
  title: 'Wise Day — Um dia presencial com o David | Wise Pro Academy',
  description:
    'A experiência premium da Wise Pro Academy: um dia inteiro presencial com o David, na prática, resolvendo dúvidas reais de obra, permit e código. Pra quem quer acelerar de verdade na construção em Massachusetts.',
};

export default function Page() {
  return (
    <>
    <TrackView product="wise_day" />
    <Landing
      product="wise_day"
      nome="Wise Day"
      preco="US$ 497"
      selo="Experiência premium"
      headline="Um dia inteiro com o David, na prática, acelerando a sua carreira na construção"
      subheadline="A experiência premium da Wise Pro Academy. Um dia presencial acompanhando quem já faz acontecer no ramo, com tempo dedicado pra resolver as suas dúvidas reais de obra, permit e código."
      imagemTopo="/planta-projeto.jpg"
      vslTitulo="Leitura e planejamento de plantas de obra"
      copyBlocos={[
        'Tem um momento na sua carreira em que o que falta não é mais teoria. É ver, de perto, como o profissional que já chegou lá toma decisão no canteiro: como ele lê uma obra, como resolve um problema de permit, como interpreta o código quando o inspetor aparece. Esse aprendizado não cabe numa aula gravada. Acontece no campo.',
        'O Wise Day é exatamente isso: um dia inteiro, presencial, lado a lado com o David. Você traz as suas dúvidas reais (de obra, de permit, de código, de carreira) e sai com respostas que dá pra aplicar no dia seguinte. É a forma mais rápida de transformar o que você estudou em decisão prática e segura.',
        'É uma experiência premium e de vagas limitadas, pensada pra quem já fez o Curso de Construtor ou já atua no ramo e quer dar o próximo salto com orientação direta de quem fatura mais de US$ 1 milhão por ano na construção americana.',
      ]}
      dores={[
        'Você já estudou, mas ainda tem dúvidas práticas que só se resolvem no campo.',
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
      conteudoTitulo="Como é o seu dia"
      conteudo={[
        { titulo: 'Imersão presencial', texto: 'Um dia inteiro acompanhando de perto a rotina e as decisões de quem domina a construção nos EUA.' },
        { titulo: 'Suas dúvidas no centro', texto: 'A agenda gira em torno das suas perguntas reais de obra, permit, código e carreira.' },
        { titulo: 'Prática de verdade', texto: 'Você vê na prática o que estudou e entende como aplicar no seu próprio contexto.' },
        { titulo: 'Plano de próximos passos', texto: 'Sai com clareza sobre o que fazer a seguir pra acelerar na construção em Massachusetts.' },
      ]}
      incluso={[
        'Um dia inteiro presencial com o David.',
        'Acompanhamento da operação na prática.',
        'Tempo dedicado para as suas dúvidas de obra, permit e código.',
        'Orientação direta para acelerar a sua carreira no ramo.',
      ]}
      formato="Presencial · 1 dia com o David · experiência premium · vagas limitadas · em português"
      garantia="Por ser uma experiência presencial e individual de alto contato, o Wise Day tem vagas limitadas. As datas e os detalhes são confirmados após a sua reserva."
      faq={[
        {
          q: 'Preciso ter feito o Curso de Construtor antes?',
          a: 'Não é obrigatório, mas o Wise Day rende ainda mais para quem já fez o Curso de Construtor ou já atua na construção, porque você chega com dúvidas mais específicas.',
        },
        {
          q: 'Como funciona a marcação da data?',
          a: 'Por ser presencial e de vagas limitadas, a data é combinada após a sua reserva, conforme a agenda do David.',
        },
        {
          q: 'É individual ou em grupo?',
          a: 'É uma experiência de alto contato, com atenção dedicada às suas dúvidas. Os detalhes do formato são alinhados na confirmação.',
        },
      ]}
      ctaPrincipal="Quero o Wise Day"
      whatsappOptions={[{ label: 'Falar no WhatsApp', message: WA_MSG.wise_day }]}
    />
    </>
  );
}
