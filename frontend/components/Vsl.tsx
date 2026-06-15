import { BRAND } from '../lib/brand';

// Slot de VSL — placeholder ate o David gravar o video.
export default function Vsl({ titulo }: { titulo: string }) {
  return (
    <div style={{
      aspectRatio: '16 / 9', background: BRAND.navy, color: BRAND.gold,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 12, border: `2px solid ${BRAND.gold}`, margin: '24px 0',
    }}>
      {/* VSL: David grava depois — trocar este bloco por <video>/<iframe> do video */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Video de apresentacao</div>
        <div style={{ fontSize: 13, opacity: 0.8 }}>{titulo}</div>
      </div>
    </div>
  );
}
