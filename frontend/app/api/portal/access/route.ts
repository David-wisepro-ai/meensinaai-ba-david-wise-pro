import { NextRequest, NextResponse } from 'next/server';
import { getPortalProducts, accessDeniedStatus } from '../../../../lib/portal-access';

// Diz ao client QUAIS portais o aluno logado pode acessar (por produto comprado).
// Tudo server-side: o navegador nunca decide o acesso, so renderiza o que o servidor liberou.
//   200 { products: ['project_manager' | 'construtor', ...] }  -> entra no(s) portal(is)
//   403 { reason }  -> logado, mas sem matricula que abra portal
//   503 { reason }  -> Supabase ainda nao conectado (degrada com elegancia)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const res = await getPortalProducts(req);
  if (!res.ok) {
    return NextResponse.json(
      { error: 'Acesso restrito a alunos.', reason: res.reason, products: [] },
      { status: accessDeniedStatus(res.reason) },
    );
  }
  return NextResponse.json(
    { products: res.products, email: res.email },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } },
  );
}
