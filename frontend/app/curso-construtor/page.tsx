import Landing from '../../components/Landing';
import TrackView from '../../components/TrackView';

export const metadata = {
  title: 'Curso de Construtor — Tire sua CSL em Massachusetts | Wise Pro Academy',
  description:
    'Curso preparatório para a CSL em 2 formatos (online de segunda a sexta ou presencial em 4 sábados) mais o portal de simulados. Em português, pra você passar na prova de Construction Supervisor License e trabalhar legalmente na construção em Massachusetts.',
};

export default function Page() {
  return (
    <>
    <TrackView product="construtor" />
    <Landing
      product="construtor"
      nome="Curso de Construtor"
      preco="US$ 597"
      selo="Curso principal"
      headline="Tire sua CSL e trabalhe legalmente na construção em Massachusetts"
      subheadline="Curso preparatório para a CSL em português, no formato que combina com você: turma online de segunda a sexta, das 6 PM às 9 PM (horário de Massachusetts), ou presencial em 4 sábados, das 7:30 AM às 12 PM. O mesmo conteúdo, mais o portal de simulados que treina você até passar. A aula te ensina; o portal te aprova."
      imagemTopo="/construtor-equipe-planta.jpg"
      vslTitulo="Profissionais gerenciando a obra no canteiro"
      copyBlocos={[
        'A prova de CSL é em inglês, longa e recheada de código: 780 CMR, IRC, IBC, IECC, OSHA. A maioria das pessoas estuda, faz um curso, acha que está pronta e reprova. Não por falta de inteligência, mas porque só assistir aula não prepara ninguém pra encontrar a resposta certa, no código certo, dentro do tempo da prova.',
        'É exatamente aí que o Curso de Construtor é diferente. Em português, no formato que você escolher (turma online de segunda a sexta, das 6 PM às 9 PM no horário de Massachusetts, ou presencial em 4 sábados, das 7:30 AM às 12 PM), o David cobre o que realmente cai na prova e te ensina a navegar pelo código oficial. Mas o que faz o aluno passar de verdade é o que vem depois da aula: o portal de simulados da Wise Pro.',
        'No portal você treina com quizzes por categoria e provas completas, com questões originais ancoradas no código oficial. Cada questão traz feedback, explicação e a referência exata do código. No nível iniciante a gente te mostra a seção; no avançado, você aprende a achar sozinho e ganha velocidade. Você repete até a aprovação virar consequência, não sorte.',
      ]}
      dores={[
        'A prova é em inglês e cheia de código (IRC, IBC, IECC, OSHA) e você tem medo de não passar.',
        'Não consegue achar a resposta no livro rápido o suficiente durante a prova.',
        'Já fez curso antes e não passou, porque só a aula não basta sem treino de verdade.',
        'Está comparando escolas e quer a que realmente faz o aluno ser aprovado.',
      ]}
      beneficios={[
        {
          titulo: 'Online ou presencial',
          texto:
            'Você escolhe: turma online de segunda a sexta, das 6 PM às 9 PM (horário de Massachusetts), ou presencial em 4 sábados, das 7:30 AM às 12 PM. Mesmo conteúdo, em português.',
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
      conteudoTitulo="Como você é preparado"
      conteudo={[
        { titulo: 'Aulas com o David (online ou presencial)', texto: 'Online de segunda a sexta, das 6 PM às 9 PM (horário de Massachusetts), ou presencial em 4 sábados, das 7:30 AM às 12 PM, em português, cobrindo o que mais cai na prova de CSL.' },
        { titulo: 'Navegação pelo código oficial', texto: 'Você aprende onde está cada resposta no 780 CMR, IRC, IBC, IECC e OSHA, e como chegar rápido.' },
        { titulo: 'Quizzes por categoria', texto: 'Treine tópico por tópico no portal, identificando seus pontos fracos antes da prova.' },
        { titulo: 'Provas completas simuladas', texto: 'Simule a prova real inteira, no formato e no ritmo da Construction Supervisor License.' },
        { titulo: 'Feedback em cada questão', texto: 'Errou? Você recebe a explicação e a referência exata do código pra fixar de verdade.' },
        { titulo: 'Níveis iniciante e avançado', texto: 'Comece guiado e evolua até achar tudo sozinho, no tempo da prova.' },
      ]}
      incluso={[
        'Curso completo em português, no formato online (seg a sex) ou presencial (4 sábados).',
        'Acesso ao portal de simulados CSL (quizzes por categoria e provas completas).',
        'Feedback, explicação e referência ao código em cada questão.',
        'Níveis iniciante e avançado para você evoluir até passar.',
        'Material de apoio focado na prova de Construction Supervisor License.',
      ]}
      formato="Online (seg a sex, 6 PM às 9 PM, horário de Massachusetts) ou presencial (4 sábados, 7:30 AM às 12 PM) · portal de simulados incluso · em português"
      garantia="Nosso diferencial não é prometer aprovação. É te dar o método e o treino que aumentam de verdade as suas chances: a aula (online ou presencial) mais simulados ilimitados ancorados no código oficial."
      faq={[
        {
          q: 'O curso é online ou presencial?',
          a: 'Você escolhe o formato. A turma online acontece de segunda a sexta, das 6 PM às 9 PM (horário de Massachusetts). A turma presencial começa logo em seguida, em 4 sábados, das 7:30 AM às 12 PM. O conteúdo é o mesmo nos dois. O portal de simulados é online em qualquer caso, para você treinar de onde estiver até a data da prova.',
        },
        {
          q: 'As questões do portal são confiáveis?',
          a: 'Sim. São questões originais da Wise Pro, ancoradas no código oficial (780 CMR, IRC, IBC, IECC, OSHA). Não copiamos de concorrente nem de bancos de terceiros, e mantemos tudo atualizado.',
        },
        {
          q: 'A prova é em inglês. O curso me prepara pra isso?',
          a: 'Sim. O curso é em português, mas treina você no vocabulário técnico e na navegação do código em inglês, que é exatamente o que cai na prova.',
        },
        {
          q: 'Por quanto tempo tenho acesso ao portal?',
          a: 'O acesso ao portal acompanha a sua preparação para a prova de CSL. Os detalhes de período são confirmados na matrícula.',
        },
      ]}
      ctaPrincipal="Quero minha licença"
      ctaForm="Quero garantir minha vaga"
    />
    </>
  );
}
