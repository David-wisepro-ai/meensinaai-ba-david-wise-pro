import { BRAND } from '../lib/brand';

// Player de aula do portal. Aceita link do YouTube OU do Panda Video (ou vazio = "em breve").
// O David cola o link como ele copia (YouTube watch/youtu.be/embed/shorts, ou embed do Panda)
// e a funcao abaixo converte pro src de iframe certo.
export function toEmbedSrc(url: string): string | null {
  const u = (url || '').trim();
  if (!u) return null;
  // YouTube: youtu.be/ID, youtube.com/watch?v=ID, /embed/ID, /shorts/ID
  const yt = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1`;
  // Panda Video (ou qualquer outra URL de embed): usa como esta.
  return u;
}

export default function AulaVideo({ url, titulo = 'Aula' }: { url?: string; titulo?: string }) {
  const src = url ? toEmbedSrc(url) : null;

  const wrap: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
    borderRadius: 14,
    overflow: 'hidden',
    border: `1px solid ${BRAND.gold}`,
    background: BRAND.navy,
  };

  if (!src) {
    return (
      <div style={wrap} aria-label={`${titulo} (vídeo em breve)`}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            color: '#fff',
            textAlign: 'center',
            padding: 16,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: BRAND.gold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: BRAND.navy,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            &#9654;
          </div>
          <strong style={{ fontSize: 15 }}>{titulo}</strong>
          <span style={{ opacity: 0.7, fontSize: 13 }}>Vídeo em breve</span>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <iframe
        src={src}
        title={titulo}
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
