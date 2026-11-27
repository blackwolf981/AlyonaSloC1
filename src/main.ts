import './style.css';
import { naloziNaloge } from './data';
import type { Naloga, Raven, TipNaloge } from './types';
import { jePravilno, sprejemljiviOdgovori } from './preverjanje';
import { preberiNapredek, shraniNapredek, pobrisiNapredek, type Napredek, type Rezultat } from './napredek';

const app = document.querySelector<HTMLDivElement>('#app')!;

/* ---------- pomožno ---------- */

const ZNAKI: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ZNAKI[c]);

const KATEGORIJE: Record<string, string> = {
  vezljivost_in_predlogi: 'Vezljivost',
  rodilnik_zanikanja: 'Rodilnik zanikanja',
  frazeologija_in_pregovori: 'Frazeologija',
  glagolski_vid: 'Glagolski vid',
  dvojina: 'Dvojina',
  skladnja_in_slog: 'Skladnja',
  slog_in_sopomenke: 'Slog',
};
const oznakaKategorije = (k: string) =>
  KATEGORIJE[k] ?? (k.charAt(0).toUpperCase() + k.slice(1)).replaceAll('_', ' ');

const TIPI: Record<TipNaloge, string> = {
  izbira: 'Izbira',
  vnos: 'Vnos',
  popravek_napake: 'Popravek napake',
  parafraza: 'Parafraza',
  stavcni_puzzle: 'Sestavi poved',
};

const VRZEL = /_{3,}/;
const steviloVrzeli = (n: Naloga) => n.kontekst.split(VRZEL).length - 1;

/* ---------- stanje ---------- */

let naloge: Naloga[] = [];
let napredek: Napredek = preberiNapredek();
const osnutki = new Map<string, string>(); // trenutni (še nepreverjeni) odgovori
const sestavljanja = new Map<string, number[]>(); // stavcni_puzzle: indeksi v n.moznosti, v vrstnem redu izbire
const odprteRazlage = new Set<string>();
let filter = 'vse';
let tipFilter: 'vse' | TipNaloge = 'vse';
let samoOdprte = false; // »Samo nerešene / napačne«; vsi trije filtri se kombinirajo
let filtriOdprti = false; // zloženi filtri pod 1024 px; na namizju so v stranski letvi vedno vidni

/* Raven (B2 / vse): krovni filter nad kategorijo, tipom in stanjem; velja za seznam in kviz.
   Izbira se zapomni v brskalniku. */
const KLJUC_RAVEN = 'aljona-c1:raven';
type RavenFilter = 'vse' | Raven;
let ravenFilter: RavenFilter = (() => {
  try {
    const v = localStorage.getItem(KLJUC_RAVEN);
    return v === 'B2' || v === 'C1' ? v : 'vse';
  } catch {
    return 'vse';
  }
})();
const vRavni = (n: Naloga) => ravenFilter === 'vse' || n.raven === ravenFilter;
/** Vse naloge izbrane ravni: osnova za statistiko, števce in filtre. */
const naRavni = () => naloge.filter(vRavni);

/* UI besedila za izbiro ravni: nadomestna, za jezikovni pregled (Codex). */
const BESEDILA_RAVEN = {
  skupina: 'Raven nalog',
  b2: 'Samo B2',
  c1: 'Samo C1',
  vse: 'Vse ravni (B2 in C1)',
  nadnaslov: { vse: 'Ravni B2 in C1', B2: 'Raven B2', C1: 'Raven C1' } as Record<RavenFilter, string>,
};

/** Način »Osredotočena vaja«: ena naloga naenkrat, lastni rezultati (ločeni od seznama). */
interface Kviz {
  ids: string[];
  indeks: number;
  rezultati: Map<string, Rezultat>;
  izbor: string; // opis filtra, iz katerega so naloge
  koncan: boolean;
}
type Pogled = 'seznam' | 'kviz';
let pogled: Pogled = 'seznam';
let kviz: Kviz | null = null;
const VELIKOST_KVIZA = 10;
const vKvizu = () => pogled === 'kviz' && !!kviz && !kviz.koncan;
/** Rezultat, ki velja v trenutnem pogledu: v kvizu šteje le odgovor iz tega kviza. */
const rezultatZa = (n: Naloga): Rezultat | undefined => (vKvizu() ? kviz!.rezultati.get(n.id) : napredek[n.id]);

const poId = (id: string | undefined) => naloge.find((n) => n.id === id);
const trenutniOdgovor = (n: Naloga) => rezultatZa(n)?.odgovor ?? osnutki.get(n.id) ?? '';
/** Ali je pri nalogi kaj za ponastaviti (rezultat v trenutnem pogledu, osnutek ali odprta razlaga)? */
const imaStanje = (n: Naloga) => !!rezultatZa(n) || !!osnutki.get(n.id)?.trim() || odprteRazlage.has(n.id);
const jeOdprta = (n: Naloga) => !napredek[n.id]?.pravilno; // nerešena ali napačna
const vKategoriji = (n: Naloga) => filter === 'vse' || n.kategorija === filter;
const vTipu = (n: Naloga) => tipFilter === 'vse' || n.tip_naloge === tipFilter;

/* ---------- sestavljanje povedi (stavcni_puzzle) ---------- */

/** Vrednost osnutka: sestavine, ločene s presledki (normalizacija v preverjanje.ts poenoti presledke pred ločili). */
const zdruziSestavine = (n: Naloga, izbor: number[]) => izbor.map((i) => n.moznosti[i]).join(' ');
/** Za prikaz: brez presledka pred vejico in dvopičjem. */
const brezPresledkaPredLocilom = (s: string) => s.replace(/\s+([,:])/g, '$1');
const prikazSestave = (n: Naloga, izbor: number[]) => brezPresledkaPredLocilom(zdruziSestavine(n, izbor));
/** Zapisan odgovor za prikaz (»Vaš odgovor«, povzetek kviza); pri drugih tipih nespremenjen. */
const prikazOdgovora = (n: Naloga, odgovor: string) =>
  n.tip_naloge === 'stavcni_puzzle' ? brezPresledkaPredLocilom(odgovor) : odgovor;

/** Trenutni izbor sestavin; če ga ni (npr. po osvežitvi strani), ga rekonstruira iz zapisanega odgovora. */
function sestava(n: Naloga, odgovor: string): number[] {
  const obstojeci = sestavljanja.get(n.id);
  if (obstojeci) return obstojeci;
  const izbor: number[] = [];
  for (const del of odgovor.split(/\s+/)) {
    if (!del) continue;
    const i = n.moznosti.findIndex((m, j) => m === del && !izbor.includes(j));
    if (i >= 0) izbor.push(i); // neujemajoče dele tiho izpustimo
  }
  sestavljanja.set(n.id, izbor);
  return izbor;
}

/* ---------- tema (svetla / temna) ---------- */

const KLJUC_TEMA = 'aljona-c1:tema';
type Tema = 'light' | 'dark';

function trenutnaTema(): Tema {
  const t = document.documentElement.dataset.theme;
  if (t === 'light' || t === 'dark') return t;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function gumbTema(): string {
  const temna = trenutnaTema() === 'dark';
  const opis = temna ? 'Preklopi na svetli način' : 'Preklopi na temni način';
  return `
    <button type="button" id="gumb-tema" class="gumb gumb-tih gumb-mali" data-akcija="tema"
            aria-label="${opis}" title="${opis}">
      <span aria-hidden="true">${temna ? '☀️' : '🌙'}</span>
      <span class="hidden sm:inline">${temna ? 'Svetlo' : 'Temno'}</span>
    </button>`;
}

function preklopiTemo() {
  const nova: Tema = trenutnaTema() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nova;
  try {
    localStorage.setItem(KLJUC_TEMA, nova);
  } catch {
    /* tema velja do osvežitve */
  }
  const gumb = document.getElementById('gumb-tema');
  if (gumb) {
    gumb.outerHTML = gumbTema();
    document.getElementById('gumb-tema')?.focus();
  }
}

// Če uporabnik teme ni izbral ročno, gumb sledi sistemski nastavitvi.
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const gumb = document.getElementById('gumb-tema');
  if (gumb && !document.documentElement.dataset.theme) gumb.outerHTML = gumbTema();
});

/* ---------- izbor nalog po filtrih ---------- */

/** Naloge, ki ustrezajo vsem trem filtrom (seznam jih prikaže, kviz izbira med njimi). */
const izbraneNaloge = () => naRavni().filter((n) => vKategoriji(n) && vTipu(n) && (!samoOdprte || jeOdprta(n)));
/** Izbor raven + kategorija + tip, NE glede na stikalo »samo nerešene« (za »Ponastavi rezultate«). */
const izborBrezStanja = () => naRavni().filter((n) => vKategoriji(n) && vTipu(n));

function opisIzbora(zStanjem = true): string {
  const aktivni = [
    ravenFilter !== 'vse' ? ravenFilter : '',
    filter !== 'vse' ? oznakaKategorije(filter) : '',
    tipFilter !== 'vse' ? TIPI[tipFilter] : '',
    samoOdprte && zStanjem ? 'samo nerešene' : '',
  ].filter(Boolean);
  return aktivni.length ? aktivni.join(' · ') : 'vse naloge';
}

/** »Ponastavi rezultate (N)«: N = število nalog z rezultatom v izboru raven + kategorija + tip.
 *  Isti gumb je v plošči (seznam) in pod nalogo v kvizu. */
function gumbPonastaviIzbor(): string {
  const st = izborBrezStanja().filter((n) => napredek[n.id]).length;
  const izbor = opisIzbora(false);
  const opis = `Izbriše shranjene rezultate nalog v izboru: ${izbor}. Filter »samo nerešene« pri tem ne velja.`;
  const dostopno = `Ponastavi rezultate. Število nalog s shranjenim rezultatom: ${st}. Izbor: ${izbor}.`;
  return `
    <button type="button" class="gumb gumb-tih gumb-mali" data-akcija="ponastavi-izbor"
            title="${esc(opis)}" aria-label="${esc(dostopno)}" ${st ? '' : 'disabled'}>
      <span aria-hidden="true">↻</span> Ponastavi rezultate (${st})
    </button>`;
}

/* ---------- izris: plošča na vrhu ---------- */

function plosca(): string {
  // Statistika, števci in seznam kategorij veljajo za izbrano raven (zato zakrije modulski `naloge`).
  const naloge = naRavni();
  const resene = naloge.filter((n) => napredek[n.id]);
  const pravilne = resene.filter((n) => napredek[n.id].pravilno).length;
  const uspesnost = resene.length ? `${Math.round((pravilne / resene.length) * 100)} %` : '– %';
  const delez = naloge.length ? (resene.length / naloge.length) * 100 : 0;

  const kategorije = [...new Set(naloge.map((n) => n.kategorija))];
  const cip = (akcija: string, vrednost: string, oznaka: string, st: number, aktiven: boolean) => `
    <button type="button" class="cip" data-akcija="${akcija}" data-vrednost="${esc(vrednost)}" aria-pressed="${aktiven}">
      ${aktiven ? '<span aria-hidden="true">✓</span>' : ''}${esc(oznaka)} <span class="cip-st">${st}</span>
    </button>`;
  // Števci: kategorije so osnovni nivo (vse naloge), tipi štejejo znotraj izbrane kategorije,
  // stikalo za odprte pa znotraj kategorije in tipa, torej toliko, kolikor se bo prikazalo.
  const vKat = naloge.filter(vKategoriji);
  const tipi = Object.keys(TIPI) as TipNaloge[];


  return `
    <div class="statistika">
      <p class="stat-besedilo" aria-live="polite">
        <strong>Rešeno:</strong> ${resene.length} / ${naloge.length}
        <span class="stat-locilo" aria-hidden="true">·</span>
        <strong>Uspešnost:</strong> ${uspesnost}
        <span class="stat-locilo" aria-hidden="true">·</span>
        <span class="stat-st"><span aria-hidden="true">✓</span><span class="sr-only">pravilno:</span> ${pravilne}</span>
        <span class="stat-st"><span aria-hidden="true">!</span><span class="sr-only">napačno:</span> ${resene.length - pravilne}</span>
      </p>
      <div class="napredek-trak" role="progressbar" aria-label="Delež rešenih nalog"
           aria-valuemin="0" aria-valuemax="${naloge.length}" aria-valuenow="${resene.length}">
        <span style="width:${delez}%"></span>
      </div>
      ${gumbPonastaviIzbor()}
    </div>
    <button type="button" class="filtri-preklop" data-akcija="filtri" aria-expanded="${filtriOdprti}" aria-controls="filtri">
      <span class="font-semibold">Filtri</span>
      <span class="filtri-povzetek">${esc(opisIzbora())} (${izbraneNaloge().length})</span>
      <span aria-hidden="true">${filtriOdprti ? '▴' : '▾'}</span>
    </button>
    <div id="filtri" class="filtri" data-odprto="${filtriOdprti}">
        <nav class="vrsta-filtrov" aria-label="Filter po kategoriji">
          <span class="vrsta-oznaka">Kategorija</span>
          <div class="vrsta-cipi">
            ${cip('filter', 'vse', 'Vse', naloge.length, filter === 'vse')}
            ${kategorije
              .map((k) => cip('filter', k, oznakaKategorije(k), naloge.filter((n) => n.kategorija === k).length, filter === k))
              .join('')}
          </div>
        </nav>
        <nav class="vrsta-filtrov" aria-label="Filter po tipu naloge">
          <span class="vrsta-oznaka">Tip</span>
          <div class="vrsta-cipi">
            ${cip('tip', 'vse', 'Vse', vKat.length, tipFilter === 'vse')}
            ${tipi.map((t) => cip('tip', t, TIPI[t], vKat.filter((n) => n.tip_naloge === t).length, tipFilter === t)).join('')}
          </div>
        </nav>
        <nav class="vrsta-filtrov" aria-label="Filter po stanju">
          <span class="vrsta-oznaka">Stanje</span>
          <div class="vrsta-cipi">
            <button type="button" class="cip cip-stanje" data-akcija="samo-odprte" aria-pressed="${samoOdprte}">
              <span aria-hidden="true">${samoOdprte ? '✓' : '○'}</span>Samo nerešene / napačne
              <span class="cip-st">${vKat.filter((n) => vTipu(n) && jeOdprta(n)).length}</span>
            </button>
          </div>
        </nav>
    </div>`;
}

/* ---------- izris: kartica naloge ---------- */

function vrzel(i: number, besedilo: string, napacno = false): string {
  return besedilo
    ? `<span class="vrzel vrzel-polna${napacno ? ' vrzel-napacna' : ''}" data-vrzel="${i}">${esc(besedilo)}</span>`
    : `<span class="vrzel" data-vrzel="${i}" aria-label="vrzel">&nbsp;</span>`;
}

function vstavkiZaVrzeli(n: Naloga, odgovor: string): string[] {
  return steviloVrzeli(n) > 1 ? odgovor.split(';').map((s) => s.trim()) : [odgovor.trim()];
}

function kontekstHtml(n: Naloga, odgovor: string, napacno = false): string {
  if (n.tip_naloge === 'stavcni_puzzle') return ''; // kontekst je prazen; sestavine so v odgovorHtml
  const deli = n.kontekst.split(VRZEL);
  if (deli.length === 1) {
    const oznaka = n.tip_naloge === 'popravek_napake' ? 'Poved z napako' : 'Izhodiščna poved';
    return `
      <blockquote class="kontekst kontekst-izhodisce">
        <span class="kontekst-oznaka">${oznaka}</span>${esc(n.kontekst)}
      </blockquote>`;
  }
  const vstavki = vstavkiZaVrzeli(n, odgovor);
  return `<p class="kontekst">${deli
    .map((del, i) => esc(del) + (i < deli.length - 1 ? vrzel(i, vstavki[i] ?? '', napacno) : ''))
    .join('')}</p>`;
}

function odgovorHtml(n: Naloga, odgovor: string, rez: Rezultat | undefined): string {
  const zaklenjeno = !!rez;

  if (n.tip_naloge === 'stavcni_puzzle') {
    if (!Array.isArray(n.moznosti) || !n.moznosti.length) {
      return '<p class="text-[var(--muted)]">Ta naloga nima sestavin.</p>';
    }
    const izbor = sestava(n, odgovor);
    const sestavljeno = izbor.length
      ? izbor
          .map((idx, poz) => {
            const b = esc(n.moznosti[idx]);
            return zaklenjeno
              ? `<span class="sestavina sestavina-zaklenjena">${b}</span>`
              : `<button type="button" class="sestavina" data-akcija="sestavina-odstrani" data-pozicija="${poz}"
                         aria-label="Odstrani »${b}« iz povedi">${b}</button>`;
          })
          .join('')
      : '<span class="sestavljeno-prazno">Dotaknite se besed spodaj …</span>';
    const ponujene = n.moznosti
      .map((m, idx) => {
        const b = esc(m);
        const off = zaklenjeno || izbor.includes(idx);
        return `<button type="button" class="sestavina" data-akcija="sestavina" data-vrednost="${idx}"
                        aria-label="Dodaj »${b}« v poved" ${off ? 'disabled' : ''}>${b}</button>`;
      })
      .join('');
    return `
      <div class="sestavljanje">
        <p class="sestavljanje-oznaka">Vaša poved</p>
        <div class="sestavljeno" role="status" aria-live="polite">${sestavljeno}</div>
        ${izbor.length ? `<p class="sr-only">Trenutna poved: ${esc(prikazSestave(n, izbor))}</p>` : ''}
        <div class="sestavine" role="group" aria-label="Sestavine">${ponujene}</div>
        ${
          zaklenjeno
            ? ''
            : `<div class="mt-2 flex flex-wrap items-center justify-between gap-2">
                 <p class="namig !mt-0">Dotaknite se besede, da jo dodate v poved; dotaknite se besede v povedi, da jo odstranite.</p>
                 ${
                   izbor.length
                     ? `<button type="button" class="gumb gumb-tih gumb-mali" data-akcija="pocisti-sestavo">
                          <span aria-hidden="true">✕</span> Počisti
                        </button>`
                     : ''
                 }
               </div>`
        }
      </div>`;
  }

  if (n.tip_naloge === 'izbira') {
    const moznosti = n.moznosti
      .map((m, i) => {
        const izbrana = odgovor === m;
        let razred = '';
        let znak = String.fromCharCode(65 + i);
        let opis = '';
        if (rez) {
          if (jePravilno(n, m)) {
            razred = 'moznost-pravilna';
            znak = '✓';
            opis = '<span class="sr-only"> (pravilna možnost)</span>';
          } else if (izbrana) {
            razred = 'moznost-napacna';
            znak = '!';
            opis = '<span class="sr-only"> (vaša izbira, napačna)</span>';
          } else {
            razred = 'moznost-zatemnjena';
          }
        }
        return `
          <button type="button" class="moznost ${razred}" data-akcija="izberi" data-vrednost="${esc(m)}"
                  aria-pressed="${izbrana}" ${zaklenjeno ? 'disabled' : ''}>
            <span class="moznost-crka" aria-hidden="true">${znak}</span>
            <span class="moznost-besedilo">${esc(m)}${opis}</span>
          </button>`;
      })
      .join('');
    return `<div class="grid gap-2 sm:grid-cols-2" role="group" aria-label="Možnosti">${moznosti}</div>`;
  }

  if (n.tip_naloge === 'vnos') {
    const vrzeli = steviloVrzeli(n);
    const ph = vrzeli > 1 ? Array(vrzeli).fill('oblika').join('; ') : 'Vpišite manjkajočo besedo ali zvezo …';
    return `
      <label class="sr-only" for="vnos-${esc(n.id)}">Vaš odgovor</label>
      <input type="text" id="vnos-${esc(n.id)}" class="vnos" data-vnos value="${esc(odgovor)}" placeholder="${esc(ph)}"
             autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" ${zaklenjeno ? 'readonly' : ''} />
      ${zaklenjeno ? '' : '<p class="namig">Tipka Enter preveri odgovor.</p>'}`;
  }

  const kaj = n.tip_naloge === 'parafraza' ? 'preoblikovano' : 'popravljeno';
  return `
    <label class="sr-only" for="vnos-${esc(n.id)}">Vaš odgovor</label>
    <textarea id="vnos-${esc(n.id)}" class="vnos vnos-dolg" data-vnos rows="3" placeholder="Vpišite celotno ${kaj} poved …"
              spellcheck="false" ${zaklenjeno ? 'readonly' : ''}>${esc(odgovor)}</textarea>
    ${
      zaklenjeno
        ? ''
        : `<div class="mt-2 flex flex-wrap items-center justify-between gap-2">
             <p class="namig !mt-0">Ctrl + Enter preveri odgovor.</p>
             <button type="button" class="gumb gumb-tih gumb-mali" data-akcija="vstavi">
               <span aria-hidden="true">⎘</span> Vstavi izhodiščno poved
             </button>
           </div>`
    }`;
}

function odzivHtml(n: Naloga, rez: Rezultat | undefined): string {
  if (!rez) return '';
  if (rez.pravilno) {
    return `
      <div class="odziv odziv-ok" role="status">
        <span class="odziv-znak" aria-hidden="true">✓</span>
        <div><strong>Pravilno! 🎉</strong></div>
      </div>`;
  }
  const [glavni, ...drugi] = sprejemljiviOdgovori(n);
  return `
    <div class="odziv odziv-napaka" role="status">
      <span class="odziv-znak" aria-hidden="true">!</span>
      <div class="min-w-0 space-y-2">
        <p><strong>Ni povsem pravilno.</strong></p>
        <p class="text-sm text-[var(--muted)]">Vaš odgovor: <s class="vas-odgovor">${esc(prikazOdgovora(n, rez.odgovor))}</s></p>
        <div>
          <p class="text-sm font-semibold">Pričakovana rešitev:</p>
          <p class="resitev">${esc(glavni)}</p>
        </div>
        ${
          drugi.length
            ? `<div>
                 <p class="text-sm font-semibold">Sprejemljive so tudi:</p>
                 <ul class="resitev-seznam">${drugi.map((d) => `<li class="resitev">${esc(d)}</li>`).join('')}</ul>
               </div>`
            : ''
        }
      </div>
    </div>`;
}

function razlagaHtml(n: Naloga): string {
  return odprteRazlage.has(n.id) ? razlagaSekcija(n) : '';
}

function razlagaSekcija(n: Naloga): string {
  return `
    <section class="razlaga" aria-label="Razlaga naloge ${esc(n.id)}">
      <div class="razlaga-blok">
        <h3><span aria-hidden="true">💡</span> Slovnična razlaga</h3>
        <p>${esc(n.slovnicna_razlaga)}</p>
      </div>
      <div class="razlaga-blok razlaga-pozor">
        <h3><span aria-hidden="true">⚠️</span> Pozor: tipična napaka</h3>
        <p>${esc(n.tipicna_napaka)}</p>
      </div>
    </section>`;
}

function kartica(n: Naloga): string {
  const rez = rezultatZa(n);
  const odgovor = trenutniOdgovor(n);
  const razred = rez ? (rez.pravilno ? 'kartica-ok' : 'kartica-napaka') : '';
  const stanje = rez
    ? rez.pravilno
      ? '<span class="znacka znacka-ok"><span aria-hidden="true">✓</span> Pravilno</span>'
      : '<span class="znacka znacka-napaka"><span aria-hidden="true">!</span> Napačno</span>'
    : '';
  const razlagaOdprta = odprteRazlage.has(n.id);

  const zadnjaVKvizu = vKvizu() && kviz!.indeks === kviz!.ids.length - 1;
  const gumbi = rez && vKvizu()
    ? `<button type="button" class="gumb gumb-glavni" data-akcija="naprej">
         ${zadnjaVKvizu ? 'Zaključi kviz <span aria-hidden="true">🏁</span>' : 'Naslednja naloga <span aria-hidden="true">➔</span>'}
       </button>`
    : rez
    ? `<button type="button" class="gumb ${rez.pravilno ? 'gumb-tih' : 'gumb-glavni'}" data-akcija="znova">
         <span aria-hidden="true">↻</span> ${rez.pravilno ? 'Reši znova' : 'Poskusi znova'}
       </button>`
    : `<button type="button" class="gumb gumb-glavni" data-akcija="preveri" ${odgovor.trim() ? '' : 'disabled'}>
         <span aria-hidden="true">✓</span> Preveri
       </button>`;

  return `
    <article class="kartica ${razred}" id="naloga-${esc(n.id)}" data-id="${esc(n.id)}">
      <header class="flex flex-wrap items-center gap-2 text-xs">
        <span class="font-mono font-semibold text-[var(--muted)]">${esc(n.id)}</span>
        <span class="znacka znacka-raven" title="Raven">${esc(n.raven)}</span>
        <span class="znacka znacka-kat">${esc(oznakaKategorije(n.kategorija))}</span>
        <span class="znacka znacka-tip">${esc(TIPI[n.tip_naloge] ?? n.tip_naloge)}</span>
        ${stanje ? `<span class="ml-auto">${stanje}</span>` : ''}
      </header>
      <p class="navodilo"><span class="navodilo-oznaka">Navodilo</span>${esc(n.navodilo)}</p>
      ${kontekstHtml(n, odgovor, rez ? !rez.pravilno : false)}
      <div class="mt-4">${odgovorHtml(n, odgovor, rez)}</div>
      ${odzivHtml(n, rez)}
      <div class="mt-4 flex flex-wrap gap-2">
        ${gumbi}
        <button type="button" class="gumb gumb-tih" data-akcija="razlaga" aria-expanded="${razlagaOdprta}">
          <span aria-hidden="true">💡</span> ${razlagaOdprta ? 'Skrij razlago' : 'Prikaži razlago'}
        </button>
        <button type="button" class="gumb gumb-tih gumb-mali ml-auto self-center" data-akcija="ponastavi-nalogo"
                title="Izbriše odgovor in rezultat ter zapre razlago te naloge." aria-label="Ponastavi nalogo ${esc(n.id)}"
                ${imaStanje(n) ? '' : 'hidden'}>
          <span aria-hidden="true">↺</span> Ponastavi nalogo
        </button>
      </div>
      ${razlagaHtml(n)}
    </article>`;
}

function seznam(): string {
  const izbor = naRavni().filter((n) => vKategoriji(n) && vTipu(n));
  const vidne = samoOdprte ? izbor.filter(jeOdprta) : izbor;
  if (vidne.length) return vidne.map(kartica).join('');
  return samoOdprte && izbor.length
    ? '<p class="text-[var(--muted)]"><span aria-hidden="true">✓</span> Vse naloge v tem izboru so rešene pravilno. 🎉</p>'
    : '<p class="text-[var(--muted)]">Za izbrano kombinacijo kategorije in tipa še ni nalog.</p>';
}

/* ---------- izris: kviz (osredotočena vaja) ---------- */

function premesaj<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/** Do 10 naključnih nalog iz trenutnega filtra; naloge iz prejšnjega kviza pridejo na vrsto zadnje. */
function zacniKviz() {
  const nabor = izbraneNaloge();
  const prej = new Set(kviz?.ids ?? []);
  const vrstni = [...premesaj(nabor.filter((n) => !prej.has(n.id))), ...premesaj(nabor.filter((n) => prej.has(n.id)))];
  const ids = vrstni.slice(0, VELIKOST_KVIZA).map((n) => n.id);
  for (const id of ids) {
    osnutki.delete(id);
    sestavljanja.delete(id);
    odprteRazlage.delete(id);
  }
  kviz = { ids, indeks: 0, rezultati: new Map(), izbor: opisIzbora(), koncan: false };
}

/** Po kvizu: osnutki in odprte razlage iz kviza ne smejo ostati v seznamu. */
function pospraviKviz() {
  for (const id of kviz?.ids ?? []) {
    osnutki.delete(id);
    sestavljanja.delete(id);
    odprteRazlage.delete(id);
  }
}

function trakKviza(k: Kviz): string {
  const segmenti = k.ids
    .map((id, i) => {
      const r = k.rezultati.get(id);
      const trenutni = !k.koncan && i === k.indeks && !r;
      const razred = r ? (r.pravilno ? 'segment-ok' : 'segment-napaka') : trenutni ? 'segment-trenutni' : '';
      const opis = `Naloga ${i + 1}: ${r ? (r.pravilno ? 'pravilno' : 'napačno') : trenutni ? 'trenutna' : 'še ni rešena'}`;
      return `<li class="segment ${razred}" title="${opis}"><span class="sr-only">${opis}</span><span aria-hidden="true">${r ? (r.pravilno ? '✓' : '!') : ''}</span></li>`;
    })
    .join('');
  return `<ol class="kviz-trak" aria-label="Potek kviza">${segmenti}</ol>`;
}

function kvizGlavaVsebina(k: Kviz): string {
  return `
    <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <p class="kviz-korak">Naloga <strong>${k.indeks + 1}</strong> / ${k.ids.length}</p>
      <p class="text-sm text-[var(--muted)]">Izbor: ${esc(k.izbor)}</p>
    </div>
    ${trakKviza(k)}`;
}

function sporociloZaUspeh(odstotek: number): string {
  if (odstotek === 100) return 'Popolno! Mojstrsko obvladaš raven C1. 🏆';
  if (odstotek >= 80) return 'Odlično znanje C1! 🎉';
  if (odstotek >= 60) return 'Dobro! Še malo vaje pri napakah spodaj. 💪';
  if (odstotek >= 40) return 'Na pravi poti si. Preberi razlage in poskusi znova. 📚';
  return 'Ne obupaj, vsaka napaka je korak naprej. Razlage so spodaj. 🌱';
}

function vrsticaPovzetka(n: Naloga, r: Rezultat | undefined, i: number): string {
  const ok = !!r?.pravilno;
  const izhodisce = n.kontekst || n.pravilni_odgovor;
  const kratko = izhodisce.length > 160 ? `${izhodisce.slice(0, 160).trimEnd()} …` : izhodisce;
  return `
    <li class="povzetek-vrstica ${ok ? 'povzetek-ok' : 'povzetek-napaka'}">
      <span class="odziv-znak" aria-hidden="true">${ok ? '✓' : '!'}</span>
      <div class="min-w-0 flex-1">
        <p class="flex flex-wrap items-center gap-2 text-xs">
          <span class="font-semibold">${i + 1}.</span>
          <span class="font-mono text-[var(--muted)]">${esc(n.id)}</span>
          <span class="znacka znacka-tip">${esc(TIPI[n.tip_naloge] ?? n.tip_naloge)}</span>
          <span class="sr-only">${ok ? 'pravilno' : 'napačno'}</span>
        </p>
        <p class="povzetek-kontekst">${esc(kratko)}</p>
        ${
          ok
            ? `<p class="text-sm">Vaš odgovor: <span class="resitev">${esc(prikazOdgovora(n, r!.odgovor))}</span></p>`
            : `<p class="text-sm text-[var(--muted)]">Vaš odgovor: <s class="vas-odgovor">${esc(r ? prikazOdgovora(n, r.odgovor) : '–')}</s></p>
               <p class="text-sm">Pravilno: <span class="resitev">${esc(n.pravilni_odgovor)}</span></p>
               <details class="povzetek-razlaga">
                 <summary><span aria-hidden="true">💡</span> Prikaži razlago</summary>
                 ${razlagaSekcija(n)}
               </details>`
        }
      </div>
    </li>`;
}

function povzetekHtml(k: Kviz): string {
  const skupaj = k.ids.length;
  const pravilne = k.ids.filter((id) => k.rezultati.get(id)?.pravilno).length;
  const odstotek = Math.round((pravilne / skupaj) * 100);
  const naslednji = Math.min(VELIKOST_KVIZA, izbraneNaloge().length);
  return `
    <section class="povzetek" aria-labelledby="povzetek-naslov">
      <div class="povzetek-glava">
        <p class="kviz-oznaka">Kviz zaključen · ${esc(k.izbor)}</p>
        <h2 id="povzetek-naslov" class="povzetek-rezultat" tabindex="-1">
          <span class="povzetek-st">${pravilne} / ${skupaj}</span> pravilno
        </h2>
        <p class="povzetek-odstotek">${odstotek} % uspešnost</p>
        <p class="povzetek-sporocilo">${sporociloZaUspeh(odstotek)}</p>
        ${trakKviza(k)}
      </div>
      <ol class="povzetek-seznam" aria-label="Pregled odgovorov">
        ${k.ids.map((id, i) => vrsticaPovzetka(poId(id)!, k.rezultati.get(id), i)).join('')}
      </ol>
      <div class="povzetek-gumbi">
        ${
          naslednji
            ? `<button type="button" class="gumb gumb-glavni" data-akcija="kviz-nov">
                 <span aria-hidden="true">↻</span> Nov kviz (${naslednji} ${naslednji === 1 ? 'naloga' : naslednji === 2 ? 'nalogi' : naslednji < 5 ? 'naloge' : 'novih nalog'})
               </button>`
            : ''
        }
        <button type="button" class="gumb gumb-tih" data-akcija="kviz-izhod">
          <span aria-hidden="true">✕</span> Nazaj na celotno vadnico
        </button>
      </div>
    </section>`;
}

function kvizHtml(): string {
  if (!kviz) return '';
  const k = kviz;
  if (!k.ids.length) {
    return `
      <div class="povzetek-glava">
        <p>V izboru »${esc(k.izbor)}« ni nalog za kviz. Spremenite filtre v pogledu »Vse naloge«.</p>
        <div class="povzetek-gumbi">
          <button type="button" class="gumb gumb-glavni" data-akcija="kviz-izhod"><span aria-hidden="true">✕</span> Nazaj na vadnico</button>
        </div>
      </div>`;
  }
  if (k.koncan) return povzetekHtml(k);
  return `
    <div id="kviz-glava" class="kviz-glava" tabindex="-1">${kvizGlavaVsebina(k)}</div>
    ${kartica(poId(k.ids[k.indeks])!)}
    <div id="kviz-orodja" class="flex flex-wrap justify-center gap-2">${kvizOrodja()}</div>`;
}

function kvizOrodja(): string {
  return `
    ${gumbPonastaviIzbor()}
    <button type="button" class="gumb gumb-tih gumb-mali" data-akcija="kviz-izhod">
      <span aria-hidden="true">✕</span> Prekini kviz
    </button>`;
}

function preklopnik(): string {
  const gumb = (v: Pogled, ikona: string, oznaka: string) => `
    <button type="button" class="preklop-gumb" data-akcija="pogled" data-vrednost="${v}" aria-pressed="${pogled === v}">
      <span aria-hidden="true">${ikona}</span> ${oznaka}
    </button>`;
  return `
    <div id="preklopnik" class="preklopnik" role="group" aria-label="Način vadbe">
      ${gumb('seznam', '📋', 'Vse naloge')}${gumb('kviz', '🎯', `Kviz (${VELIKOST_KVIZA} nalog)`)}
    </div>`;
}

/** Izpostavljen izbirnik ravni (B2 / vse) v glavi; velja za seznam in kviz. */
function ravenPreklop(): string {
  const st = (r: Raven) => naloge.filter((n) => n.raven === r).length;
  const gumb = (v: RavenFilter, oznaka: string, st: number) => `
    <button type="button" class="preklop-gumb" data-akcija="raven" data-vrednost="${v}" aria-pressed="${ravenFilter === v}">
      ${ravenFilter === v ? '<span aria-hidden="true">✓</span>' : ''}${esc(oznaka)} <span class="cip-st">${st}</span>
    </button>`;
  return `
    <div id="raven-preklop" class="preklopnik preklopnik-3" role="group" aria-label="${esc(BESEDILA_RAVEN.skupina)}">
      ${gumb('B2', BESEDILA_RAVEN.b2, st('B2'))}${gumb('C1', BESEDILA_RAVEN.c1, st('C1'))}${gumb('vse', BESEDILA_RAVEN.vse, naloge.length)}
    </div>`;
}

/* ---------- osveževanje DOM ---------- */

function izrisiPogled() {
  const el = document.getElementById('vsebina');
  if (!el) return;
  const pp = document.getElementById('preklopnik');
  if (pp) pp.outerHTML = preklopnik();
  const rp = document.getElementById('raven-preklop');
  if (rp) rp.outerHTML = ravenPreklop();
  const nn = document.getElementById('nadnaslov');
  if (nn) nn.textContent = BESEDILA_RAVEN.nadnaslov[ravenFilter];
  el.classList.toggle('postavitev-kviz', pogled === 'kviz');
  if (pogled === 'seznam') {
    el.innerHTML = `
      <aside id="plosca" class="plosca" aria-label="Napredek in filtri"></aside>
      <main id="seznam" class="seznam"></main>`;
    osveziPlosco();
    osveziSeznam();
  } else {
    el.innerHTML = `<main id="kviz" class="kviz">${kvizHtml()}</main>`;
    el.querySelectorAll<HTMLTextAreaElement>('textarea[data-vnos]').forEach(prilagodiVisino);
  }
}

function osveziKvizGlavo() {
  const el = document.getElementById('kviz-glava');
  if (el && kviz) el.innerHTML = kvizGlavaVsebina(kviz);
  const orodja = document.getElementById('kviz-orodja');
  if (orodja) orodja.innerHTML = kvizOrodja(); // posodobi N v »Ponastavi rezultate (N)«
}

/** Po menjavi naloge: vrh vsebine v pogled, fokus na smiseln element.
 *  Na zaslonih na dotik ne fokusiramo vnosnega polja, da se tipkovnica ne odpre sama. */
function fokusNaVsebino() {
  const v = document.getElementById('vsebina');
  if (!v) return;
  if (v.getBoundingClientRect().top < 0) v.scrollIntoView({ block: 'start', behavior: 'smooth' });
  const dotik = matchMedia('(pointer: coarse)').matches;
  const cilj =
    v.querySelector<HTMLElement>('#povzetek-naslov') ??
    (dotik ? null : v.querySelector<HTMLElement>('[data-vnos]:not([readonly]), [data-akcija="izberi"]:not(:disabled), [data-akcija="sestavina"]:not(:disabled)')) ??
    v.querySelector<HTMLElement>('#kviz-glava');
  cilj?.focus({ preventScroll: true });
}

const elPlosca = () => document.getElementById('plosca');
const elSeznam = () => document.getElementById('seznam');
const elKartica = (id: string) => document.getElementById(`naloga-${id}`);

function osveziPlosco() {
  const el = elPlosca();
  if (el) el.innerHTML = plosca();
}

function osveziSeznam() {
  const el = elSeznam();
  if (!el) return;
  el.innerHTML = seznam();
  el.querySelectorAll<HTMLTextAreaElement>('textarea[data-vnos]').forEach(prilagodiVisino);
}

/** Ponovno izriše eno kartico in fokus postavi na smiseln element (dostopnost s tipkovnico). */
function osveziKartico(id: string, fokus?: string) {
  const staro = elKartica(id);
  if (!staro) return;
  const aktiven = document.activeElement as HTMLElement | null;
  const prejsnji = aktiven && staro.contains(aktiven)
    ? { akcija: aktiven.dataset.akcija, vrednost: aktiven.dataset.vrednost }
    : null;

  staro.outerHTML = kartica(poId(id)!);
  const novo = elKartica(id)!;
  novo.querySelectorAll<HTMLTextAreaElement>('textarea[data-vnos]').forEach(prilagodiVisino);

  let cilj: HTMLElement | null = fokus ? novo.querySelector<HTMLElement>(fokus) : null;
  if (!cilj && prejsnji?.akcija) {
    cilj =
      [...novo.querySelectorAll<HTMLElement>(`[data-akcija="${prejsnji.akcija}"]`)].find(
        (el) => el.dataset.vrednost === prejsnji.vrednost,
      ) ?? null;
  }
  cilj?.focus({ preventScroll: true });
}

function osveziVrzeli(kartica: HTMLElement, n: Naloga, odgovor: string) {
  const vstavki = vstavkiZaVrzeli(n, odgovor);
  kartica.querySelectorAll<HTMLElement>('[data-vrzel]').forEach((el) => {
    const t = vstavki[Number(el.dataset.vrzel)] ?? '';
    el.classList.toggle('vrzel-polna', !!t);
    el.textContent = t || ' ';
  });
}

function prilagodiVisino(t: HTMLTextAreaElement) {
  t.style.height = 'auto';
  t.style.height = `${t.scrollHeight + 4}px`;
}

/* ---------- dejanja ---------- */

function preveri(n: Naloga) {
  const odgovor = (osnutki.get(n.id) ?? '').trim();
  if (!odgovor) {
    elKartica(n.id)?.querySelector<HTMLElement>('[data-vnos], [data-akcija="izberi"], [data-akcija="sestavina"]:not(:disabled)')?.focus();
    return;
  }
  const rez: Rezultat = { odgovor, pravilno: jePravilno(n, odgovor) };
  napredek[n.id] = rez; // tudi odgovor v kvizu šteje v skupni napredek
  shraniNapredek(napredek);
  if (vKvizu()) {
    kviz!.rezultati.set(n.id, rez);
    osveziKvizGlavo();
  }
  odprteRazlage.add(n.id);
  osveziKartico(n.id, '[data-akcija="znova"], [data-akcija="naprej"]');
  osveziPlosco();
}

function znova(n: Naloga) {
  const rez = napredek[n.id];
  if (rez) osnutki.set(n.id, rez.odgovor);
  delete napredek[n.id];
  shraniNapredek(napredek);
  odprteRazlage.delete(n.id);
  osveziKartico(n.id, '[data-vnos], [data-akcija="izberi"][aria-pressed="true"], [data-akcija="izberi"], [data-akcija="sestavina"]:not(:disabled), [data-akcija="preveri"]');
  osveziPlosco();
}

function shraniAliPobrisi() {
  if (Object.keys(napredek).length) shraniNapredek(napredek);
  else pobrisiNapredek();
}

/** »↺ Ponastavi nalogo«: rezultat, osnutek in razlaga ene naloge; v kvizu tudi rezultat kviza. */
function ponastaviNalogo(n: Naloga) {
  delete napredek[n.id];
  shraniAliPobrisi();
  osnutki.delete(n.id);
  sestavljanja.delete(n.id);
  odprteRazlage.delete(n.id);
  if (vKvizu()) {
    kviz!.rezultati.delete(n.id);
    osveziKvizGlavo();
  }
  osveziKartico(n.id, '[data-vnos], [data-akcija="izberi"], [data-akcija="sestavina"]:not(:disabled)');
  osveziPlosco();
}

/** »Ponastavi rezultate (N)«: rezultati za raven + kategorijo + tip (ne glede na »samo nerešene«).
 *  V kvizu se kviz z istimi nalogami začne od začetka. */
function ponastaviIzbor() {
  const izbor = izborBrezStanja().filter((n) => napredek[n.id]);
  if (!izbor.length) return;
  const sporocilo =
    `Želite izbrisati shranjene rezultate za izbor »${opisIzbora(false)}«? ` +
    `Število nalog s shranjenim rezultatom: ${izbor.length}. Filter »samo nerešene« pri tem ne velja.` +
    (pogled === 'kviz' && kviz ? ' Trenutni kviz se bo začel znova z istimi nalogami.' : '');
  if (!confirm(sporocilo)) return;
  for (const n of izbor) {
    delete napredek[n.id];
    osnutki.delete(n.id);
    sestavljanja.delete(n.id);
    odprteRazlage.delete(n.id);
  }
  shraniAliPobrisi();
  if (pogled === 'kviz' && kviz) {
    pospraviKviz();
    kviz.rezultati.clear();
    kviz.indeks = 0;
    kviz.koncan = false;
    izrisiPogled();
    fokusNaVsebino();
  } else {
    osveziPlosco();
    osveziSeznam();
    document.querySelector<HTMLElement>('[data-akcija="filter"][aria-pressed="true"]')?.focus();
  }
}

/* ---------- dogodki (delegirani) ---------- */

app.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-akcija]');
  if (!el) return;
  const n = poId(el.closest<HTMLElement>('[data-id]')?.dataset.id);

  switch (el.dataset.akcija) {
    case 'izberi':
      if (n && !rezultatZa(n)) {
        osnutki.set(n.id, el.dataset.vrednost ?? '');
        osveziKartico(n.id);
      }
      break;
    case 'sestavina':
      if (n && !rezultatZa(n)) {
        const izbor = [...sestava(n, trenutniOdgovor(n))];
        const idx = Number(el.dataset.vrednost);
        if (Number.isInteger(idx) && idx >= 0 && idx < n.moznosti.length && !izbor.includes(idx)) izbor.push(idx);
        sestavljanja.set(n.id, izbor);
        osnutki.set(n.id, zdruziSestavine(n, izbor));
        osveziKartico(n.id, '[data-akcija="sestavina"]:not(:disabled), [data-akcija="pocisti-sestavo"], [data-akcija="preveri"]');
      }
      break;
    case 'sestavina-odstrani':
      if (n && !rezultatZa(n)) {
        const izbor = [...sestava(n, trenutniOdgovor(n))];
        izbor.splice(Number(el.dataset.pozicija), 1); // položaj v izboru je edinstven, niz v moznosti morda ne
        if (izbor.length) osnutki.set(n.id, zdruziSestavine(n, izbor));
        else osnutki.delete(n.id);
        sestavljanja.set(n.id, izbor);
        osveziKartico(n.id, '[data-akcija="sestavina"]:not(:disabled), [data-akcija="preveri"], [data-akcija="znova"]');
      }
      break;
    case 'pocisti-sestavo':
      if (n && !rezultatZa(n)) {
        sestavljanja.delete(n.id);
        osnutki.delete(n.id);
        osveziKartico(n.id, '[data-akcija="sestavina"]:not(:disabled)');
      }
      break;
    case 'preveri':
      if (n) preveri(n);
      break;
    case 'znova':
      if (n) znova(n);
      break;
    case 'razlaga':
      if (n) {
        if (odprteRazlage.has(n.id)) odprteRazlage.delete(n.id);
        else odprteRazlage.add(n.id);
        osveziKartico(n.id);
      }
      break;
    case 'vstavi':
      if (n) {
        osnutki.set(n.id, n.kontekst);
        osveziKartico(n.id, '[data-vnos]');
        const t = elKartica(n.id)?.querySelector<HTMLTextAreaElement>('textarea[data-vnos]');
        t?.setSelectionRange(t.value.length, t.value.length);
      }
      break;
    case 'filter':
      filter = el.dataset.vrednost ?? 'vse';
      osveziPlosco();
      osveziSeznam();
      document.querySelector<HTMLElement>(`[data-akcija="filter"][aria-pressed="true"]`)?.focus();
      break;
    case 'tip':
      tipFilter = (el.dataset.vrednost ?? 'vse') as 'vse' | TipNaloge;
      osveziPlosco();
      osveziSeznam();
      document.querySelector<HTMLElement>(`[data-akcija="tip"][aria-pressed="true"]`)?.focus();
      break;
    case 'samo-odprte':
      // Seznam se filtrira le ob kliku na filter, ne ob vsakem preverjanju,
      // da pravkar rešena kartica ne izgine sredi povratne informacije.
      samoOdprte = !samoOdprte;
      osveziPlosco();
      osveziSeznam();
      document.querySelector<HTMLElement>('[data-akcija="samo-odprte"]')?.focus();
      break;
    case 'raven': {
      const v = el.dataset.vrednost;
      const nova: RavenFilter = v === 'B2' || v === 'C1' ? v : 'vse';
      if (nova === ravenFilter) break;
      ravenFilter = nova;
      try {
        localStorage.setItem(KLJUC_RAVEN, nova);
      } catch {
        /* izbira velja do osvežitve */
      }
      // izbrana kategorija morda na tej ravni nima nalog
      if (filter !== 'vse' && !naRavni().some((n) => n.kategorija === filter)) filter = 'vse';
      if (pogled === 'kviz') {
        pospraviKviz();
        zacniKviz(); // kviz se začne znova z nalogami nove ravni
      }
      izrisiPogled();
      document.querySelector<HTMLElement>(`[data-akcija="raven"][aria-pressed="true"]`)?.focus();
      break;
    }
    case 'pogled': {
      const nov: Pogled = el.dataset.vrednost === 'kviz' ? 'kviz' : 'seznam';
      if (nov === pogled) break;
      if (nov === 'kviz') zacniKviz();
      else pospraviKviz();
      pogled = nov;
      izrisiPogled();
      fokusNaVsebino();
      break;
    }
    case 'naprej':
      if (kviz) {
        if (kviz.indeks >= kviz.ids.length - 1) kviz.koncan = true;
        else kviz.indeks++;
        izrisiPogled();
        fokusNaVsebino();
      }
      break;
    case 'kviz-nov':
      pospraviKviz();
      zacniKviz();
      izrisiPogled();
      fokusNaVsebino();
      break;
    case 'kviz-izhod':
      pospraviKviz();
      pogled = 'seznam';
      izrisiPogled();
      document.querySelector<HTMLElement>('[data-akcija="pogled"][data-vrednost="seznam"]')?.focus();
      break;
    case 'filtri':
      filtriOdprti = !filtriOdprti;
      osveziPlosco();
      document.querySelector<HTMLElement>('[data-akcija="filtri"]')?.focus();
      break;
    case 'tema':
      preklopiTemo();
      break;
    case 'ponastavi-nalogo':
      if (n) ponastaviNalogo(n);
      break;
    case 'ponastavi-izbor':
      ponastaviIzbor();
      break;
  }
});

app.addEventListener('input', (e) => {
  const t = e.target;
  if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) || !t.matches('[data-vnos]')) return;
  const k = t.closest<HTMLElement>('[data-id]');
  const n = poId(k?.dataset.id);
  if (!k || !n) return;
  osnutki.set(n.id, t.value);
  osveziVrzeli(k, n, t.value);
  const gumb = k.querySelector<HTMLButtonElement>('[data-akcija="preveri"]');
  if (gumb) gumb.disabled = !t.value.trim();
  // osnutek se spreminja brez ponovnega izrisa kartice, zato vidnost gumba osvežimo tu
  const ponastavi = k.querySelector<HTMLButtonElement>('[data-akcija="ponastavi-nalogo"]');
  if (ponastavi) ponastavi.hidden = !imaStanje(n);
  if (t instanceof HTMLTextAreaElement) prilagodiVisino(t);
});

app.addEventListener('keydown', (e) => {
  const t = e.target;
  if (e.key !== 'Enter' || e.isComposing) return;
  if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) || !t.matches('[data-vnos]') || t.readOnly) return;
  const jeVrstica = t instanceof HTMLInputElement;
  if (!jeVrstica && !(e.ctrlKey || e.metaKey)) return; // v textarea Enter = nova vrstica
  e.preventDefault();
  const n = poId(t.closest<HTMLElement>('[data-id]')?.dataset.id);
  if (n) preveri(n);
});

/* ---------- zagon ---------- */

function lupina(vsebina: string): string {
  return `
    <header class="ovoj glava">
      <div class="glava-naslov min-w-0">
        <p id="nadnaslov" class="text-sm font-semibold uppercase tracking-wide text-[var(--accent-text)]">${esc(BESEDILA_RAVEN.nadnaslov[ravenFilter])}</p>
        <h1 class="text-2xl font-bold sm:text-3xl lg:text-4xl">Aljonina spletna vadnica slovenščine</h1>
        <p class="mt-1 text-[var(--muted)]">Vezljivost, frazeologija, glagolski vid, dvojina in slog za napredne.</p>
      </div>
      <div class="glava-tema">${gumbTema()}</div>
      <div class="glava-preklop">${preklopnik()}${naloge.length ? ravenPreklop() : ''}</div>
    </header>
    ${vsebina}`;
}

async function zagon() {
  app.innerHTML = lupina(`<p class="ovoj text-[var(--muted)]">Nalagam naloge …</p>`);
  try {
    ({ naloge } = await naloziNaloge());
    // pozabi rezultate nalog, ki jih v naloge.json ni več
    const ids = new Set(naloge.map((n) => n.id));
    for (const id of Object.keys(napredek)) if (!ids.has(id)) delete napredek[id];

    app.innerHTML = lupina(`
      <div id="vsebina" class="ovoj postavitev"></div>`);
    izrisiPogled();
  } catch (e) {
    const sporocilo = e instanceof Error ? e.message : String(e);
    app.innerHTML = lupina(`
      <div role="alert" class="ovoj">
        <div class="odziv odziv-napaka">
          <span class="odziv-znak" aria-hidden="true">!</span>
          <div><strong>Napaka:</strong> ${esc(sporocilo)}</div>
        </div>
      </div>`);
  }
}

zagon();
