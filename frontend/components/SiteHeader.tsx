import Link from 'next/link';
import { BRAND, PRODUCTS } from '../lib/brand';

const wrap: React.CSSProperties = { maxWidth: 1140, margin: '0 auto', padding: '0 20px' };

// Menu institucional. A escola tem 2 cursos (Project Manager e Construtor).
// Os cursos levam às páginas de venda (next/link); âncoras existem na home.
const MENU = [
  { label: 'CURSOS', href: '#cursos', internal: false },
  { label: 'PROJECT MANAGER', href: `/${PRODUCTS.project_manager.slug}`, internal: true },
  { label: 'CONSTRUTOR', href: `/${PRODUCTS.construtor.slug}`, internal: true },
  { label: 'PROFESSOR', href: '#professor', internal: false },
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
          Construção nos EUA, em português{'  '}
          <span style={{ opacity: 0.5 }}>&bull;</span>{'  '}
          Do Project Manager à sua{' '}
          <strong style={{ color: BRAND.gold }}>licença de CSL</strong>
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
              gap: 20,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {MENU.map((m) =>
              m.internal ? (
                <Link
                  key={m.label}
                  href={m.href}
                  style={{ color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600, letterSpacing: 0.4 }}
                >
                  {m.label}
                </Link>
              ) : (
                <a
                  key={m.label}
                  href={m.href}
                  style={{ color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600, letterSpacing: 0.4 }}
                >
                  {m.label}
                </a>
              ),
            )}
            <Link
              href="/portal"
              style={{ color: BRAND.gold, textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: 0.4 }}
            >
              PORTAL DO ALUNO
            </Link>
          </nav>

          {/* CTA do header: leva ao curso de entrada (funciona em qualquer página). */}
          <Link
            href={`/${PRODUCTS.project_manager.slug}`}
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
          </Link>
        </div>
      </header>
    </>
  );
}
