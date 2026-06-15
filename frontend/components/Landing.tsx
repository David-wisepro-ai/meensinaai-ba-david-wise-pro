import Vsl from './Vsl';
import LeadForm from './LeadForm';
import { BRAND } from '../lib/brand';

export default function Landing({
  product, nome, preco, headline, bullets, cta,
}: {
  product: 'project_manager'|'construtor'|'wise_day';
  nome: string; preco: string; headline: string; bullets: string[]; cta: string;
}) {
  return (
    <main style={{ maxWidth: 820, margin: '0 auto', padding: 24 }}>
      <div style={{ color: BRAND.gold, fontWeight: 800 }}>{nome} &middot; {preco}</div>
      <h1 style={{ fontSize: 34 }}>{headline}</h1>
      <Vsl titulo={`VSL ${nome}`} />
      <ul style={{ lineHeight: 1.8 }}>
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: `1px solid ${BRAND.gold}`, marginTop: 24 }}>
        <h3 style={{ marginTop: 0 }}>Garanta sua vaga</h3>
        <LeadForm product={product} cta={cta} />
      </div>
      <footer style={{ marginTop: 48, color: BRAND.navyLight, fontSize: 13 }}>{BRAND.name} — {BRAND.domain}</footer>
    </main>
  );
}
