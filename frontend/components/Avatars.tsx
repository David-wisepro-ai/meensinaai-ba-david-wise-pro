import { BRAND } from '../lib/brand';

// Linha de avatares circulares sobrepostos (placeholders).
// IMAGEM: David / squad SEO trocam por fotos reais de alunos aprovados.
const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #2E2ECC, #4B3FE4)',
  'linear-gradient(135deg, #16335f, #2E2ECC)',
  'linear-gradient(135deg, #C9A227, #E7C24B)',
  'linear-gradient(135deg, #0B1A30, #16335f)',
  'linear-gradient(135deg, #4B3FE4, #6f64ff)',
];

export default function Avatars({
  count = 5,
  size = 38,
}: {
  count?: number;
  size?: number;
}) {
  const initials = ['JS', 'MR', 'AC', 'LP', 'RB'];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
            border: '2px solid rgba(7,11,22,0.9)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            marginLeft: i === 0 ? 0 : -12,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: size * 0.34,
            fontWeight: 800,
            letterSpacing: 0.2,
          }}
        >
          {initials[i % initials.length]}
        </span>
      ))}
    </div>
  );
}

export function Stars({ size = 16 }: { size?: number }) {
  return (
    <span aria-hidden style={{ color: BRAND.goldBright, fontSize: size, letterSpacing: 2 }}>
      &#9733;&#9733;&#9733;&#9733;&#9733;
    </span>
  );
}
