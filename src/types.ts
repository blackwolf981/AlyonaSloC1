/** Shema po NAVODILA.md → »Standardna shema za naloge.json«. */
export type TipNaloge = 'izbira' | 'vnos' | 'popravek_napake' | 'parafraza';

export interface Naloga {
  id: string;
  kategorija: string;
  podkategorija: string;
  raven: string;
  tip_naloge: TipNaloge;
  navodilo: string;
  kontekst: string;
  moznosti: string[];
  pravilni_odgovor: string;
  alternativni_odgovori: string[];
  slovnicna_razlaga: string;
  tipicna_napaka: string;
  oznake: string[];
}

export interface NalogeDatoteka {
  naloge: Naloga[];
}
