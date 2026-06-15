import Link from 'next/link';
import { BRAND } from '../lib/brand';

const wrap: React.CSSProperties = { maxWidth: 1140, margin: '0 auto', padding: '0 20px' };

const MENU = [
  { label: 'CURSO', href: '#curso' },
  { label: 'ACESSO', href: '#acesso' },
  { label: 'CRONOGRAMA', href: '#cronograma' },
  { label: 'PROFESSOR', href: '#professor' },
  { label: 'INSCRICAO', href: '#inscricao' },
];

// Logo escudo (placeholder). IMAGEM: David sobe o logo escudo dourado depois.
function Logo() {
  return (
    <Link
      href="/"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
    >
      <span
        aria-hidden
        style={{
          width: 34,
          height: 38,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BRAND.gold,
          color: BRAND.navy,
          fontWeight: 800,
          fontSize: 18,
          borderRadius: '6px 6px 14px 14px',
        }}
      >
        W
      </span>
      <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: 0.5, lineHeight: 1 }}>
        WISE PRO
        <br />
        <span style={{ color: BRAND.gold, fontSize: 12, fontWeight: 700 }}>ACADEMY</span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <>
      {/* TOPBAR fina preta */}
      <div style={{ background: '#000', color: '#fff', fontSize: 13, padding: '8px 0', textAlign: 'center' }}>
        <div style={wrap}>
          Curso Preparatorio para Project Manager{'  '}
          <span style={{ opacity: 0.5 }}>&bull;</span>{'  '}
          Nova turma ao vivo em{' '}
          <strong style={{ color: BRAND.gold }}>03 de junho de 2026</strong>
        </div>
      </div>

      {/* HEADER gradiente azul */}
      <header
        style={{
          background: BRAND.gradient,
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 2px 14px rgba(10,31,68,0.18)',
        }}
      >
        <div
          style={{
            ...wrap,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            gap: 16,
          }}
        >
          <Logo />

          <nav
            style={{
              display: 'flex',
              gap: 22,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {MENU.map((m) => (
              <a
                key={m.label}
                href={m.href}
                style={{ color: '#fff', textDecoration: 'none', fontSize: 13.5, fontWeight: 600, letterSpacing: 0.4 }}
              >
                {m.label}
              </a>
            ))}
          </nav>

          <a
            href="#inscricao"
            className="wpa-btn"
            style={{
              background: '#fff',
              color: BRAND.royal,
              fontWeight: 800,
              fontSize: 13.5,
              padding: '11px 20px',
              borderRadius: 999,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            GARANTIR VAGA
          </a>
        </div>
      </header>
    </>
  );
}
