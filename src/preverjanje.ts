import type { Naloga } from './types';

/**
 * Normalizacija za primerjavo odgovorov:
 * - odvečni presledki (začetek, konec, večkratni) ne štejejo,
 * - presledki pred ločili in za njimi se poenotijo,
 * - različni narekovaji in pomišljaji se poenotijo,
 * - končno ločilo (. ! ? …) ni obvezno,
 * - velikost črk ne šteje.
 * Notranja ločila (npr. vejica pred »čeprav«) pa ostanejo pomembna, ker so na C1 del naloge.
 */
export function normaliziraj(s: string): string {
  return s
    .normalize('NFC')
    .replace(/[‘’‚′`]/g, "'")
    .replace(/[“”„«»″]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:])(?=\S)/g, '$1 ')
    .replace(/[\s.!?…]+$/u, '')
    .toLocaleLowerCase('sl');
}

export function sprejemljiviOdgovori(n: Naloga): string[] {
  return [n.pravilni_odgovor, ...(n.alternativni_odgovori ?? [])];
}

export function jePravilno(n: Naloga, odgovor: string): boolean {
  const v = normaliziraj(odgovor);
  return v !== '' && sprejemljiviOdgovori(n).some((r) => normaliziraj(r) === v);
}
