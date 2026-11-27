/** Shema po NAVODILA.md → »Standardna shema za naloge.json«. */
export type TipNaloge = 'izbira' | 'vnos' | 'popravek_napake' | 'parafraza' | 'stavcni_puzzle';

/** Raven po SEJO/CEFR. Filter in prikaz ravni temeljita izključno na tem polju, ne na predponi ID-ja. */
export type Raven = 'B2' | 'C1';

export interface Naloga {
  id: string;
  kategorija: string;
  podkategorija: string;
  raven: Raven;
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
