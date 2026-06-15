import Landing from '../../components/Landing';
export default function Page() {
  return <Landing
    product="wise_day"
    nome="Wise Day"
    preco="US$ 497"
    headline="Um dia na pratica acompanhando quem ja faz acontecer"
    bullets={[
      '1 dia presencial acompanhando a operacao na pratica.',
      'Tire duvidas reais de obra, permit e codigo no campo.',
      'Pra quem quer acelerar depois do curso.',
    ]}
    cta="Quero o Wise Day"
  />;
}
