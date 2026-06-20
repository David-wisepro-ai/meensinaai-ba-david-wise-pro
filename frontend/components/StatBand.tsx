import { BRAND } from '../lib/brand';

// Faixa de números (dark premium): 4 métricas com ícone sutil + divisórias finas.
// Números reais do conteúdo da escola — não inventar.
type Stat = { icon: string; num: string; label: string };

const STATS: Stat[] = [
  { icon: '✓', num: '598', label: 'questões verificadas no portal' },
  { icon: '⏱', num: '+10 anos', label: 'no mercado americano' },
  { icon: '★', num: '86+', label: 'avaliações 5 estrelas no Google' },
  { icon: '▤', num: '2 cursos', label: 'mais o portal de simulados' },
];

const wrap: React.CSSProperties = { maxWidth: 1140, margin: '0 auto', padding: '0 20px' };

export default function StatBand() {
  return (
    <section
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          ...wrap,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          padding: '34px 20px',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 6,
              padding: '10px 18px',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(201,162,39,0.12)',
                border: '1px solid rgba(201,162,39,0.35)',
                color: BRAND.goldBright,
                fontSize: 17,
                marginBottom: 4,
              }}
            >
              {s.icon}
            </span>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 26, lineHeight: 1.1 }}>
              {s.num}
            </span>
            <span style={{ color: BRAND.textSoft, fontSize: 14, lineHeight: 1.4 }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
