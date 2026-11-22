/** Shranjevanje napredka v LocalStorage (samo v tem brskalniku). */
export interface Rezultat {
  odgovor: string;
  pravilno: boolean;
}

export type Napredek = Record<string, Rezultat>;

const KLJUC = 'aljona-c1:napredek:v1';

export function preberiNapredek(): Napredek {
  try {
    const surovo = localStorage.getItem(KLJUC);
    const p: unknown = surovo ? JSON.parse(surovo) : {};
    return p && typeof p === 'object' && !Array.isArray(p) ? (p as Napredek) : {};
  } catch {
    return {};
  }
}

export function shraniNapredek(n: Napredek): void {
  try {
    localStorage.setItem(KLJUC, JSON.stringify(n));
  } catch {
    /* zasebni način ali polna shramba: napredek velja le do osvežitve */
  }
}

export function pobrisiNapredek(): void {
  try {
    localStorage.removeItem(KLJUC);
  } catch {
    /* prezri */
  }
}
