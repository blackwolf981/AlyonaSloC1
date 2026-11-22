import './style.css';
import { naloziNaloge } from './data';
import type { Naloga, TipNaloge } from './types';
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
};

const VRZEL = /_{3,}/;
const steviloVrzeli = (n: Naloga) => n.kontekst.split(VRZEL).length - 1;

/* ---------- stanje ---------- */

let naloge: Naloga[] = [];
let napredek: Napredek = preberiNapredek();
const osnutki = new Map<string, string>(); // trenutni (še nepreverjeni) odgovori
const odprteRazlage = new Set<string>();
let filter = 'vse';
let tipFilter: 'vse' | TipNaloge = 'vse';
let samoOdprte = false; // »Samo nerešene / napačne«; vsi trije filtri se kombinirajo

const poId = (id: string | undefined) => naloge.find((n) => n.id === id);
const trenutniOdgovor = (n: Naloga) => napredek[n.id]?.odgovor ?? osnutki.get(n.id) ?? '';
const jeOdprta = (n: Naloga) => !napredek[n.id]?.pravilno; // nerešena ali napačna
const vKategoriji = (n: Naloga) => filter === 'vse' || n.kategorija === filter;
const vTipu = (n: Naloga) => tipFilter === 'vse' || n.tip_naloge === tipFilter;

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

/* ---------- izris: plošča na vrhu ---------- */

function plosca(): string {
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
    <div class="mx-auto max-w-3xl px-4 py-3">
      <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p class="text-base" aria-live="polite">
          <strong>Rešeno:</strong> ${resene.length} / ${naloge.length}
          <span class="mx-1 text-[var(--muted)]" aria-hidden="true">|</span>
          <strong>Uspešnost:</strong> ${uspesnost}
        </p>
        <button type="button" class="gumb gumb-tih gumb-mali" data-akcija="ponastavi" ${resene.length ? '' : 'disabled'}>
          <span aria-hidden="true">↻</span> Ponastavi napredek
        </button>
      </div>
      <div class="napredek-trak mt-2" role="progressbar" aria-label="Delež rešenih nalog"
           aria-valuemin="0" aria-valuemax="${naloge.length}" aria-valuenow="${resene.length}">
        <span style="width:${delez}%"></span>
      </div>
      <p class="mt-1 text-xs text-[var(--muted)]">
        <span aria-hidden="true">✓</span> pravilno: ${pravilne}
        <span class="mx-1" aria-hidden="true">·</span>
        <span aria-hidden="true">!</span> napačno: ${resene.length - pravilne}
      </p>
      <div class="mt-3 space-y-2">
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
      </div>
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
        <p class="text-sm text-[var(--muted)]">Vaš odgovor: <s class="vas-odgovor">${esc(rez.odgovor)}</s></p>
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
  if (!odprteRazlage.has(n.id)) return '';
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
  const rez = napredek[n.id];
  const odgovor = trenutniOdgovor(n);
  const razred = rez ? (rez.pravilno ? 'kartica-ok' : 'kartica-napaka') : '';
  const stanje = rez
    ? rez.pravilno
      ? '<span class="znacka znacka-ok"><span aria-hidden="true">✓</span> Pravilno</span>'
      : '<span class="znacka znacka-napaka"><span aria-hidden="true">!</span> Napačno</span>'
    : '';
  const razlagaOdprta = odprteRazlage.has(n.id);

  const gumbi = rez
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
      </div>
      ${razlagaHtml(n)}
    </article>`;
}

function seznam(): string {
  const izbor = naloge.filter((n) => vKategoriji(n) && vTipu(n));
  const vidne = samoOdprte ? izbor.filter(jeOdprta) : izbor;
  if (vidne.length) return vidne.map(kartica).join('');
  return samoOdprte && izbor.length
    ? '<p class="text-[var(--muted)]"><span aria-hidden="true">✓</span> Vse naloge v tem izboru so rešene pravilno. 🎉</p>'
    : '<p class="text-[var(--muted)]">Za izbrano kombinacijo kategorije in tipa še ni nalog.</p>';
}

/* ---------- osveževanje DOM ---------- */

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
    elKartica(n.id)?.querySelector<HTMLElement>('[data-vnos], [data-akcija="izberi"]')?.focus();
    return;
  }
  napredek[n.id] = { odgovor, pravilno: jePravilno(n, odgovor) };
  shraniNapredek(napredek);
  odprteRazlage.add(n.id);
  osveziKartico(n.id, '[data-akcija="znova"]');
  osveziPlosco();
}

function znova(n: Naloga) {
  const rez = napredek[n.id];
  if (rez) osnutki.set(n.id, rez.odgovor);
  delete napredek[n.id];
  shraniNapredek(napredek);
  odprteRazlage.delete(n.id);
  osveziKartico(n.id, '[data-vnos], [data-akcija="izberi"][aria-pressed="true"], [data-akcija="izberi"]');
  osveziPlosco();
}

function ponastavi() {
  if (!confirm('Res želite pobrisati ves napredek? Vsi odgovori in rezultati bodo izbrisani.')) return;
  napredek = {};
  pobrisiNapredek();
  osnutki.clear();
  odprteRazlage.clear();
  osveziPlosco();
  osveziSeznam();
}

/* ---------- dogodki (delegirani) ---------- */

app.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-akcija]');
  if (!el) return;
  const n = poId(el.closest<HTMLElement>('[data-id]')?.dataset.id);

  switch (el.dataset.akcija) {
    case 'izberi':
      if (n && !napredek[n.id]) {
        osnutki.set(n.id, el.dataset.vrednost ?? '');
        osveziKartico(n.id);
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
    case 'tema':
      preklopiTemo();
      break;
    case 'ponastavi':
      ponastavi();
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
    <header class="mx-auto max-w-3xl px-4 pt-8 pb-4 sm:pt-12">
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm font-semibold uppercase tracking-wide text-[var(--accent-text)]">Raven C1</p>
        ${gumbTema()}
      </div>
      <h1 class="text-2xl font-bold sm:text-4xl">Aljonina spletna vadnica slovenščine</h1>
      <p class="mt-2 text-[var(--muted)]">Vezljivost, frazeologija, glagolski vid, dvojina in slog za napredne.</p>
    </header>
    ${vsebina}`;
}

async function zagon() {
  app.innerHTML = lupina(`<p class="mx-auto max-w-3xl px-4 text-[var(--muted)]">Nalagam naloge …</p>`);
  try {
    ({ naloge } = await naloziNaloge());
    // pozabi rezultate nalog, ki jih v naloge.json ni več
    const ids = new Set(naloge.map((n) => n.id));
    for (const id of Object.keys(napredek)) if (!ids.has(id)) delete napredek[id];

    app.innerHTML = lupina(`
      <div id="plosca" class="plosca"></div>
      <main id="seznam" class="mx-auto max-w-3xl space-y-4 px-4 py-6 sm:space-y-6"></main>`);
    osveziPlosco();
    osveziSeznam();
  } catch (e) {
    const sporocilo = e instanceof Error ? e.message : String(e);
    app.innerHTML = lupina(`
      <div role="alert" class="mx-auto max-w-3xl px-4">
        <div class="odziv odziv-napaka">
          <span class="odziv-znak" aria-hidden="true">!</span>
          <div><strong>Napaka:</strong> ${esc(sporocilo)}</div>
        </div>
      </div>`);
  }
}

zagon();
