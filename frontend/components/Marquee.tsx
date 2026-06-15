import { BRAND } from '../lib/brand';

// Ticker horizontal rolando (CSS puro, sem JS). Duplica os itens pra loop contínuo.
export default function Marquee({ items }: { items: string[] }) {
  const row = (key: string) => (
    <span key={key} style={{ display: 'inline-flex', alignItems: 'center' }}>
      {items.map((it, i) => (
        <span key={key + i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span style={{ padding: '0 10px', fontWeight: 600 }}>{it}</span>
          <span aria-hidden style={{ color: BRAND.gold, fontSize: 10 }}>&#9679;</span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      style={{
        background: BRAND.navy,
        color: '#fff',
        overflow: 'hidden',
        padding: '13px 0',
        fontSize: 14.5,
        letterSpacing: 0.2,
      }}
    >
      <div className="wpa-marquee-track">
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}
