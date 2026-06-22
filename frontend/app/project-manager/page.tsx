import Landing from '../../components/Landing';
import TrackView from '../../components/TrackView';
import { WA_MSG } from '../../lib/brand';

export const metadata = {
  title: 'Curso de Project Manager na Construção dos EUA | Wise Pro Academy',
  description:
    'Saia da execução pesada da obra e se torne um Project Manager valorizado na construção civil dos EUA. Treinamento ao vivo em português, 8 aulas, gravações disponíveis e acesso por 1 ano.',
};

export default function Page() {
  return (
    <>
    <TrackView product="project_manager" />
    <Landing
      product="project_manager"
      nome="Project Manager"
      preco="US$ 250"
      selo="Porta de entrada"
      headline="Saia da execução pesada da obra e se torne um Project Manager valorizado na construção civil dos EUA"
      subheadline="Um treinamento ao vivo, em português, criado para brasileiros que querem parar de depender só da força física e aprender como funciona a gestão de obras no mercado americano."
      imagemTopo="/pm-equipe-planejando.jpg"
      vslTitulo="Equipe de gestão planejando a obra"
      copyBlocos={[
        'Você acorda cedo, carrega peso o dia inteiro e volta pra casa exausto. No fim do mês, o dinheiro mal cobre as contas e a sensação é sempre a mesma: você trabalha demais e ganha de menos. O problema não é falta de esforço. É falta de preparo pra ocupar as posições que realmente pagam bem na construção americana.',
        'Nos Estados Unidos, quem organiza a obra, conversa com o cliente, lê a planta, cuida dos permits e coordena os subcontratados ganha muito mais do que quem só executa. São funções de gestão, com salários que costumam variar de US$ 95 mil a US$ 138 mil por ano. E a porta de entrada pra esse mundo é entender como tudo funciona por aqui, em português, com quem já fez acontecer.',
        'O Wise Project Manager foi criado pra isso. Em 8 aulas ao vivo, você aprende a pensar e agir como um gestor de obras: comunicação profissional, sequência correta da execução, leitura de plantas, aplicação de permits, gestão de subcontratados e o inglês técnico do dia a dia da construção. É o primeiro passo concreto pra você sair da mão de obra e construir uma carreira de verdade nos EUA.',
      ]}
      dores={[
        'Você trabalha (ou quer trabalhar) com construção nos EUA, mas ainda se sente perdido sobre como tudo funciona por aqui.',
        'Está cansado de depender só da força física e quer ocupar posições mais valorizadas e bem remuneradas.',
        'Sente que a barreira do inglês técnico te trava na hora de evoluir no canteiro.',
        'Sabe que precisa de uma base sólida antes de encarar a prova da licença de construtor (CSL).',
      ]}
      beneficios={[
        {
          titulo: 'Entenda o jogo',
          texto:
            'Como funciona a construção nos EUA: papéis, responsabilidades, permits e o caminho até a CSL, tudo explicado em português.',
        },
        {
          titulo: 'Aulas ao vivo',
          texto:
            '8 aulas ao vivo ao longo de cerca de 2 meses, para você tirar dúvidas reais com quem atua no mercado americano.',
        },
        {
          titulo: 'Acesso por 1 ano',
          texto:
            'Participe ao vivo e revise as gravações no seu ritmo durante 1 ano inteiro, quantas vezes precisar.',
        },
        {
          titulo: 'Base pra avançar',
          texto:
            'Saia preparado para dar o próximo passo: o Curso de Construtor e a conquista da sua licença de CSL.',
        },
      ]}
      // PROFESSORES: fotos recortadas e no ar. Bios de Rony, Luciana e Juliana sao provisorias ate David enviar o texto completo de cada um.
      professoresTitulo="Quem vai te ensinar"
      professores={[
        {
          nome: 'David Piazzarollo',
          papel: 'Construção nos EUA e CSL',
          foto: '/david-piazzarollo.jpg',
          bio: 'Fundador da Wise Pro Academy. Mais de 10 anos no mercado americano da construção, passou na prova de CSL e construiu a própria carteira de clientes diretos.',
        },
        {
          nome: 'Rony Jabour',
          papel: 'Professor licenciado de OSHA',
          foto: '/rony-jabour.jpg',
          bio: 'Professor licenciado para certificação de OSHA. Ensina segurança do trabalho e os riscos que devem ser evitados no canteiro de obras nos EUA.',
        },
        {
          nome: 'Fábio Borges',
          papel: 'Inteligência Artificial e Automação',
          foto: '/fabio-borges.jpg',
          bio: 'Especialista em inteligência artificial aplicada a negócios e automação. Mostra como usar IA pra ganhar produtividade no dia a dia profissional.',
        },
        {
          nome: 'Luciana Triplett',
          papel: 'Arquiteta, leitura de plantas',
          foto: '/luciana-triplett.jpg',
          bio: 'Arquiteta. Ensina leitura e interpretação de plantas de obra, do projeto à execução, com olhar prático pra realidade da construção nos EUA.',
        },
        {
          nome: 'Juliana Melo',
          papel: 'Gestão de empresas',
          foto: '/juliana-melo.jpg',
          bio: 'Especialista em gestão de empresas. Mostra como organizar, profissionalizar e fazer crescer um negócio de construção de forma estruturada.',
        },
      ]}
      incluso={[
        '8 aulas ao vivo em português (turma de aproximadamente 2 meses).',
        'Gravações disponíveis e acesso ao conteúdo por 1 ano.',
        'Fundamentos da gestão de obras no mercado americano.',
        'Orientação clara sobre o caminho até a CSL.',
        'Bônus: aplicações práticas de IA nos negócios com Fábio Borges.',
      ]}
      formato="Ao vivo · 8 aulas · ~2 meses · acesso por 1 ano · em português"
      garantia="Importante: este é um curso preparatório. Ele não promete emprego garantido, visto ou enriquecimento rápido. O que ele entrega é clareza, postura profissional e visão de gestão para você buscar oportunidades melhores."
      faq={[
        {
          q: 'O curso é uma formação ou um curso preparatório?',
          a: 'É um curso preparatório. Ele te prepara para entender a função de Project Manager e a rotina da construção nos EUA. Não emite diploma nem licença oficial.',
        },
        {
          q: 'As aulas ficam gravadas?',
          a: 'Sim. Você participa ao vivo e tem as gravações disponíveis na plataforma para revisar quando quiser, com acesso por 1 ano.',
        },
        {
          q: 'Preciso morar nos Estados Unidos?',
          a: 'O conteúdo é voltado à realidade da construção nos EUA. Morar nos Estados Unidos ajuda a aplicar tudo na prática, mas o curso é online e ao vivo, então você acompanha de onde estiver.',
        },
        {
          q: 'O curso garante emprego?',
          a: 'Não. O curso prepara você com clareza, postura profissional e visão de gestão para buscar melhores oportunidades. Conquistar a vaga depende do seu esforço e do mercado.',
        },
      ]}
      ctaPrincipal="Quero começar agora"
      whatsappOptions={[{ label: 'Falar no WhatsApp', message: WA_MSG.project_manager }]}
      upsell={{
        texto:
          'Já decidiu que quer a licença? O Curso de Construtor é o próximo passo: aulas online (de segunda a sexta) ou presenciais (em 4 sábados) e acesso ao portal de simulados que faz você passar na prova de CSL.',
        href: '/curso-construtor',
        rotulo: 'Conhecer o Curso de Construtor',
      }}
    />
    </>
  );
}
