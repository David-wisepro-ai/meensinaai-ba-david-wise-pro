import Landing from '../../components/Landing';
export default function Page() {
  return <Landing
    product="project_manager"
    nome="Project Manager"
    preco="US$ 250"
    headline="Comece por aqui: entenda como funciona a construcao nos EUA"
    bullets={[
      'Porta de entrada pra quem quer trabalhar com construcao em Massachusetts.',
      'Ao vivo agora (turmas de ~2 meses), com acesso de 1 ano.',
      'Base pra avancar pro Curso de Construtor e tirar a CSL.',
    ]}
    cta="Quero comecar"
  />;
}
