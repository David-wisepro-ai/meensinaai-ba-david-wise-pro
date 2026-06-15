import Landing from '../../components/Landing';
export default function Page() {
  return <Landing
    product="construtor"
    nome="Curso de Construtor"
    preco="US$ 597"
    headline="Tire sua CSL: curso presencial de 6 dias + portal de simulados"
    bullets={[
      '6 dias presenciais que preparam voce pra prova de Construction Supervisor License.',
      'Acesso ao PORTAL DE SIMULADOS: quizzes por categoria + provas completas, com explicacao e referencia ao codigo.',
      'Voce treina ate achar a resposta no livro rapido — o que faz passar na prova.',
    ]}
    cta="Quero minha licenca"
  />;
}
