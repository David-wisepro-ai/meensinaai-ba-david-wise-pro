import Link from 'next/link';
import { BRAND, WHATSAPP_URL, PRODUCTS } from '../lib/brand';

const wrap: React.CSSProperties = { maxWidth: 1140, margin: '0 auto', padding: '0 20px' };

const colTitle: React.CSSProperties = {
  color: BRAND.gold,
  fontWeight: 800,
  fontSize: 13,
  letterSpacing: 1,
  textTransform: 'uppercase',
  marginBottom: 14,
};

const linkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: 14.5,
  opacity: 0.92,
  lineHeight: 1.9,
};

// Rodapé institucional da Wise Pro Academy — usado em todas as páginas.
export default function SiteFooter() {
  return (
    <footer style={{ background: BRAND.navy, color: '#fff', padding: '48px 0 36px' }}>
      <div style={wrap}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* Marca */}
          <div>
            <Link
              href="/"
              style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: 0.5, textDecoration: 'none' }}
            >
              WISE PRO <span style={{ color: BRAND.gold }}>ACADEMY</span>
            </Link>
            <div style={{ opacity: 0.7, fontSize: 13.5, marginTop: 10 }}>{BRAND.domain}</div>
            <p style={{ opacity: 0.78, fontSize: 13.5, lineHeight: 1.6, marginTop: 12, maxWidth: 280 }}>
              Preparação prática para brasileiros na construção civil dos Estados Unidos.
            </p>
          </div>

          {/* Cursos — a escola tem 2 cursos */}
          <div>
            <div style={colTitle}>Cursos</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Link href={`/${PRODUCTS.project_manager.slug}`} style={linkStyle}>
                {PRODUCTS.project_manager.name}
              </Link>
              <Link href={`/${PRODUCTS.construtor.slug}`} style={linkStyle}>
                {PRODUCTS.construtor.name}
              </Link>
            </div>
          </div>

          {/* Aluno */}
          <div>
            <div style={colTitle}>Aluno</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/portal" style={linkStyle}>
                Portal do aluno
              </Link>
            </div>
          </div>

          {/* Contato */}
          <div>
            <div style={colTitle}>Contato</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* WhatsApp externo: usa <a>, não next/link. */}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                Fale no WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.14)',
            marginTop: 36,
            paddingTop: 20,
            opacity: 0.6,
            fontSize: 12.5,
          }}
        >
          &copy; {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
