import type { NalogeDatoteka } from './types';

/**
 * BASE_URL je './' (glej vite.config.ts), zato je pot relativna na index.html
 * in deluje lokalno in na GitHub Pages (/<repozitorij>/naloge.json).
 */
export async function naloziNaloge(): Promise<NalogeDatoteka> {
  const url = `${import.meta.env.BASE_URL}naloge.json`;
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Nalaganje ${url} ni uspelo (HTTP ${res.status}).`);
  return (await res.json()) as NalogeDatoteka;
}
