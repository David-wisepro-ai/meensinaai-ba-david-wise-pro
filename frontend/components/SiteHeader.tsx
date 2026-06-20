import Link from 'next/link';
import { BRAND, PRODUCTS } from '../lib/brand';

const wrap: React.CSSProperties = { maxWidth: 1140, margin: '0 auto', padding: '0 20px' };

// Menu institucional. A escola tem 2 cursos (Project Manager e Construtor)
// e a experiência premium Wise Day. Os cursos levam às páginas de venda (next/link);
// âncoras existem na home.
const MENU = [
  { label: 'CURSOS', href: '#cursos', internal: false },
  { label: 'PROJECT MANAGER', href: `/${PRODUCTS.project_manager.slug}`, internal: true },
  { label: 'CONSTRUTOR', href: `/${PRODUCTS.construtor.slug}`, internal: true },
  { label: 'WISE DAY', href: `/${PRODUCTS.wise_day.slug}`, internal: true },
  { label: 'PROFESSOR', href: '#professor', internal: false },
];

// Logo escudo (placeholder). IMAGEM: David sobe o logo escudo dourado depois.
function Logo() {
  return (
    <Link
      href="/"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}
    >
      <span
        aria-hidden
        style={{
          width: 36,
          height: 40,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: BRAND.goldGradient,
          color: BRAND.ink,
          fontWeight: 900,
          fontSize: 19,
          borderRadius: '7px 7px 16px 16px',
          boxShadow: '0 6px 18px rgba(201,162,39,0.35)',
        }}
      >
        W
      </span>
      <span style={{ color: '#fff', fontWeight: 900, fontSize: 16, letterSpacing: 0.6, lineHeight: 1 }}>
        WISE PRO
        <br />
        <span style={{ color: BRAND.goldBright, fontSize: 11.5, fontWeight: 700, letterSpacing: 2 }}>
          ACADEMY
        </span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const linkStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.86)',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.4,
  };

  return (
    <>
      {/* TOPBAR fina — faixa premium escura com fio dourado embaixo */}
      <div
        style={{
          background: BRAND.ink,
          color: 'rgba(255,255,255,0.85)',
          fontSize: 13,
          padding: '8px 0',
          textAlign: 'center',
          borderBottom: '1px solid rgba(201,162,39,0.22)',
        }}
      >
        <div style={wrap}>
          Construção nos EUA, em português{'  '}
          <span style={{ opacity: 0.4 }}>&bull;</span>{'  '}
          Do Project Manager à sua{' '}
          <strong style={{ color: BRAND.goldBright }}>licença de CSL</strong>
        </div>
      </div>

      {/* HEADER dark translúcido (glass + blur) — sticky */}
      <header
        style={{
          background: 'rgba(8,13,26,0.72)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 8px 30px rgba(0,0,0,0.45)',
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
                <Link key={m.label} href={m.href} style={linkStyle}>
                  {m.label}
                </Link>
              ) : (
                <a key={m.label} href={m.href} style={linkStyle}>
                  {m.label}
                </a>
              ),
            )}
            <Link
              href="/portal"
              style={{
                color: BRAND.goldBright,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 0.4,
              }}
            >
              PORTAL DO ALUNO
            </Link>
          </nav>

          {/* CTA do header: dourado cheio. Leva ao curso de entrada (funciona em qualquer página). */}
          <Link
            href={`/${PRODUCTS.project_manager.slug}`}
            className="wpa-gold-cta"
            style={{
              background: BRAND.goldGradient,
              color: BRAND.ink,
              fontWeight: 900,
              fontSize: 13,
              padding: '11px 20px',
              borderRadius: 999,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              letterSpacing: 0.4,
              boxShadow: '0 8px 24px rgba(201,162,39,0.32)',
            }}
          >
            GARANTIR VAGA
          </Link>
        </div>
      </header>
    </>
  );
}
