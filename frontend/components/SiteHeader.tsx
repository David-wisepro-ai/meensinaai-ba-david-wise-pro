'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BRAND, PRODUCTS } from '../lib/brand';

const wrap: React.CSSProperties = { maxWidth: 1140, margin: '0 auto', padding: '0 20px' };

// Menu institucional. Os 2 cursos (Construction Project Manager e Construction
// Supervisor License) + a experiência premium Wise Day levam às páginas de venda.
const MENU = [
  { label: 'Construction Project Manager', href: `/${PRODUCTS.project_manager.slug}`, internal: true },
  { label: 'Construction Supervisor License', href: `/${PRODUCTS.construtor.slug}`, internal: true },
  { label: 'Wise Day', href: `/${PRODUCTS.wise_day.slug}`, internal: true },
];

// Logo escudo (placeholder). IMAGEM: David sobe o logo escudo dourado depois.
function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}
    >
      <img
        src="/logo-wise.png"
        alt="Wise Pro Academy"
        className="wpa-logo-img"
        style={{ height: 56, width: 'auto', display: 'block' }}
      />
    </Link>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // trava o scroll do body enquanto o drawer está aberto
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('wpa-menu-open', open);
    return () => document.body.classList.remove('wpa-menu-open');
  }, [open]);

  const close = () => setOpen(false);

  const linkStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.86)',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0.4,
  };

  // estilo de cada link dentro do drawer mobile (área de toque confortável)
  const drawerLink: React.CSSProperties = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 0.4,
    padding: '15px 4px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'block',
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
        <div style={wrap} className="wpa-wrap">
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
          className="wpa-header-bar"
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

          {/* NAV DESKTOP — escondido no mobile via .wpa-nav-desktop */}
          <nav
            className="wpa-nav-desktop"
            style={{
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

          {/* CTA do header: dourado cheio (desktop). Leva ao curso de entrada. */}
          <Link
            href={`/${PRODUCTS.project_manager.slug}`}
            className="wpa-gold-cta wpa-header-cta"
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

          {/* BOTÃO HAMBURGER — só aparece no mobile via .wpa-burger */}
          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="wpa-burger"
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              width: 46,
              height: 46,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(201,162,39,0.35)',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'block',
                width: 20,
                height: 2,
                borderRadius: 2,
                background: BRAND.goldBright,
                transition: 'transform .22s ease, opacity .22s ease',
                transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              aria-hidden
              style={{
                display: 'block',
                width: 20,
                height: 2,
                borderRadius: 2,
                background: BRAND.goldBright,
                transition: 'opacity .18s ease',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              aria-hidden
              style={{
                display: 'block',
                width: 20,
                height: 2,
                borderRadius: 2,
                background: BRAND.goldBright,
                transition: 'transform .22s ease',
                transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>

        {/* DRAWER MOBILE — overlay dark premium com os mesmos links */}
        {open && (
          <>
            {/* backdrop clicável pra fechar */}
            <div
              onClick={close}
              aria-hidden
              style={{
                position: 'fixed',
                inset: 0,
                top: 0,
                background: 'rgba(4,7,14,0.6)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                zIndex: 40,
              }}
            />
            <div
              role="dialog"
              aria-label="Menu"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 55,
                background:
                  'linear-gradient(180deg, rgba(8,13,26,0.98), rgba(7,11,22,0.99))',
                borderTop: '1px solid rgba(201,162,39,0.30)',
                borderBottom: '1px solid rgba(201,162,39,0.30)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                padding: '10px 16px 22px',
              }}
            >
              {MENU.map((m) =>
                m.internal ? (
                  <Link key={m.label} href={m.href} onClick={close} style={drawerLink}>
                    {m.label}
                  </Link>
                ) : (
                  <a key={m.label} href={m.href} onClick={close} style={drawerLink}>
                    {m.label}
                  </a>
                ),
              )}
              <Link
                href="/portal"
                onClick={close}
                style={{ ...drawerLink, color: BRAND.goldBright }}
              >
                PORTAL DO ALUNO
              </Link>

              <Link
                href={`/${PRODUCTS.project_manager.slug}`}
                onClick={close}
                className="wpa-gold-cta"
                style={{
                  marginTop: 18,
                  display: 'block',
                  textAlign: 'center',
                  background: BRAND.goldGradient,
                  color: BRAND.ink,
                  fontWeight: 900,
                  fontSize: 15,
                  padding: '15px 20px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  letterSpacing: 0.4,
                  boxShadow: '0 8px 24px rgba(201,162,39,0.32)',
                }}
              >
                GARANTIR VAGA
              </Link>
            </div>
          </>
        )}
      </header>
    </>
  );
}
