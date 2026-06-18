'use client';
import { useEffect } from 'react';
import { trackViewContent, type Produto } from '../lib/tracking';

// Dispara ViewContent ao carregar uma página de venda. Sem UI.
// Degrada com elegância: se GTM/Pixel não carregaram, o helper é no-op.
export default function TrackView({ product }: { product: Produto }) {
  useEffect(() => {
    trackViewContent(product);
  }, [product]);
  return null;
}
