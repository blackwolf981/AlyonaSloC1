# [OPRAVLJENO] 27. 11. 2026 — Vnos 5 nalog tipa stavcni_puzzle

- Na konec polja `naloge` prenesenih 5 potrjenih objektov 1:1: C1-SKL-016, C1-DVO-016, C1-VID-016, C1-FRA-016, C1-SLO-016; obstoječih 112 nalog je nespremenjenih.
- `predlogi-stavcni-puzzle.json` izbrisan; vsebina je zdaj v `naloge.json`.
- Validacija uspešna: 117 nalog (93 B2 / 24 C1), brez podvojenih ID-jev, natanko 13 polj, UTF-8 brez BOM; sestavine se ujemajo z vsemi rešitvami in alternativami.
- Najmanj nalog na kategorijo je po vnosu 16 (navodila so pričakovala 15); `npm run build` uspešen.
- Brez posegov v `src/`, `brain/` in `napredek.md`; zaključek z lokalnim commitom, brez `git push`.

# 📥 Trenutna naloga (27. 11. 2026) — vnos 5 potrjenih nalog tipa `stavcni_puzzle` v `naloge.json`

## Stanje

* `predlogi-stavcni-puzzle.json` vsebuje 5 potrjenih B2 nalog: `C1-SKL-016`, `C1-DVO-016`, `C1-VID-016`, `C1-FRA-016`, `C1-SLO-016`.
* Podpora tipu v vmesniku je končana (Claude Code, commit `063a834`: `src/types.ts`, `src/main.ts`, `src/style.css`) in v živo preverjena v brskalniku.
* Sanity check DeepSeek (27. 11. 2026): predlog veljaven (13 polj, 7–9 sestavin, brez presledkov v sestavinah, vsaka sestavina enkrat), `naloge.json` še vedno 112 nalog, build uspešen, brez lock datotek.

## 📋 Kaj narediti

1. Preberi `predlogi-stavcni-puzzle.json`.
2. Preveri, da v `naloge.json` ni nobenega od petih ID-jev (27. 11. 2026 so bili prosti).
3. Vstavi vseh 5 objektov na **konec polja `naloge`**, v vrstnem redu: SKL-016, DVO-016, VID-016, FRA-016, SLO-016. Vsak objekt prepiši **1:1** z vsemi 13 polji; ne preimenuj ID-jev, ne dodajaj polj, ne spreminjaj vrstnega reda sestavin v `moznosti`.
4. `kontekst` ostane `""`; končno ločilo ostane samo v `pravilni_odgovor`; `pravilni_odgovor` mora biti natanko združene `moznosti` z enim presledkom med njimi.
5. Dovoljeni so le mikro-popravki jezikovnih besedil v `navodilo`, `slovnicna_razlaga` in `tipicna_napaka` (če najdeš dejansko napako). `moznosti`, `pravilni_odgovor` in `alternativni_odgovori` pusti nespremenjene — ujemati se morajo z različico, ki je bila v vmesniku že preverjena. `C1-VID-016` naj ostane v moški obliki (naloga preverja vid, ne spola).
6. Izbriši `predlogi-stavcni-puzzle.json` (vsebina je zdaj v bazi) in izbris navedi v commitu.
7. `brain/00-INDEX.md` in `napredek.md` ureja orkestrator. Na začetek **te** datoteke dodaj povzetek po ustaljenem vzorcu (`# [OPRAVLJENO] 27. 11. 2026 — Vnos 5 nalog tipa stavcni_puzzle` + 4–5 vrstic); prejšnji povzetek pusti v arhivu.

## 🧪 Preverjanje

1. Shema (koren projekta) — pričakovano `skupaj 117 | podvojeni 0 | manjkajoca polja 0 | min/kategorijo 15`:

   ```powershell
   node -e "const a=JSON.parse(require('fs').readFileSync('naloge.json','utf8')).naloge;const r=['id','kategorija','podkategorija','raven','tip_naloge','navodilo','kontekst','moznosti','pravilni_odgovor','alternativni_odgovori','slovnicna_razlaga','tipicna_napaka','oznake'];const c={};a.forEach(t=>c[t.kategorija]=(c[t.kategorija]||0)+1);const ids=a.map(t=>t.id);console.log('skupaj',a.length,'| podvojeni',ids.filter((x,i)=>ids.indexOf(x)!==i).length,'| manjkajoca polja',a.filter(t=>r.some(k=>!(k in t))).length,'| min/kategorijo',Math.min(...Object.values(c)))"
   ```

2. Za vseh 5 novih nalog: vsaka sestavina brez presledka znotraj sestavine, vsaka uporabljena natanko enkrat, `pravilni_odgovor` se ujema z združenimi sestavinami (velikost črk in končno ločilo ne štejeta).
3. UTF-8 **brez BOM**; `npm run build` (TypeScript + Vite) uspe.
4. Lock: pred delom ustvari `codexprevajam.lock`, ob koncu ga obvezno izbriši.
5. Zaključek: `git add naloge.json .ai-tasks/2-codex.md`, `git rm predlogi-stavcni-puzzle.json`, nato `git commit -m "[Codex]: Vnos 5 nalog tipa stavcni_puzzle (Sestavi poved) v naloge.json"` — **brez `git push`**.

## 🚫 Prepovedi

* Ne urejaj `src/`, `brain/`, `napredek.md`.
* Ne spreminjaj obstoječih 112 nalog, kategorij in sheme.
* Ne izvajaj `git push`.

## 📤 Obvezni Feedback

Na koncu odgovora en sam blok z oznako `text`:

```text
[Feedback za Cline]
- Narejeno: [kaj je vstavljeno + rezultat validacije]
- Spremenjene datoteke: [naloge.json, .ai-tasks/2-codex.md, predlogi-stavcni-puzzle.json (izbrisan)]
- Stanje lock: ni aktivnih lock datotek (lock izbrisan)
- Opozorila / Vprašanja: [brez / opozorilo]
```


# 🗄️ Arhiv prejšnjih predaj


## [OPRAVLJENO] 27. 11. 2026 — Predlog 5 nalog novega tipa stavcni_puzzle (B2)

- Pripravljeni ID-ji: C1-SKL-016, C1-DVO-016, C1-VID-016, C1-FRA-016, C1-SLO-016.
- Predlog: predlogi-stavcni-puzzle.json; natanko 5 objektov s po 13 polji, UTF-8 brez BOM.
- Navodilo omejuje rešitve na začetno besedo z veliko začetnico in nevtralen besedni red; dodane so nevtralne alternative, ne zaznamovane ali pesniške razporeditve.
- Omejitev tipa: VID in SLO utrjujeta rabo že ponujenih oblik; brez odvečnih sestavin ne preverjata samostojne izbire vida oziroma sopomenke.
- naloge.json, src/, brain/ in napredek.md ostajajo nespremenjeni; predlog še ni vključen v aplikacijo.

## [OPRAVLJENO] 25. 11. 2026 — Kratka kontrola petih novih B2 nalog iz commita `045f848`

* **Pregledanih:** natanko 5 nalog (`C1-VEZ-019`, `C1-ROD-018`, `C1-DVO-005`, `C1-VID-012`, `C1-SKL-004`).
* **Spremenjeno:** `C1-ROD-018` — `navodilo` in `slovnicna_razlaga`; `C1-VID-012` — `navodilo`; ostale tri brez popravkov. ID-ji, rešitve in metapodatki nespremenjeni.
* **Commit:** `00311d2` + mikro-popravek `e941ff3` (zveza `sodi za` → `dopolnjuje` v navodilu `C1-ROD-018`), samo `naloge.json`, brez `git push`.
* **Sanity check (DeepSeek):** 3 spremenjena besedilna polja na 2 ID-jih, 112 nalog (88 B2 / 24 C1), 0 podvojenih ID-jev, 0 manjkajočih polj, min 15/kategorijo, UTF-8 brez BOM, brez lock datotek, `npm run build` uspešen.

## [OPRAVLJENO] 25. 11. 2026 — Jezikovni pregled 49 novih B2 nalog in predlogi UI besedil

### Obseg in rezultat

Prejšnja lokalna predaja je vsebovala seznam 44 dodatkov, ne novega seznama 49 nalog. Obseg je zato dopolnjen s petimi nalogami iz zapisa z dne 24. 11. 2026 v brain/00-INDEX.md. Pregledanih je natanko 49 nalog, vsi ID-ji imajo predpono `C1-`:

- VEZ-018, ROD-017, DVO-004, SKL-003, VID-011 (5).
- FRA-011–015 (5), VID-013–015 (3), DVO-006–015 (10), SKL-005–015 (11), SLO-001–015 (15).

Pregledana besedilna polja: `navodilo`, `kontekst`, `moznosti`, `pravilni_odgovor`, `alternativni_odgovori`, `slovnicna_razlaga`, `tipicna_napaka`.
Popravljenih 21 polj pri 18 nalogah: samo navodila, razlage in opozorila. Ostalih 31 pregledanih nalog ne potrebuje popravkov. ID-ji, vrstni red, struktura, metapodatki, konteksti in rešitve so ohranjeni; preostalih 63 nalog je nespremenjenih.

Ključni popravki: »nismo prejeli obeh« ne pomeni nujno, da manjkata oba izvoda; tudi »da« lahko uvaja namen; navodilo o pogoju se zdaj nanaša na število prijavljenih; razlage dvojine in tvorbe pridevnika so jasnejše. Pri več popravkih in parafrazah je izrecno zahtevan vnos celotne povedi. B2 razlage ostajajo dolge 1–2 povedi in vsebujejo praktični zgled.

## Predlogi UI besedil za Claude Code (še niso vneseni v src/)

Pregledana dejanska besedila in vedenje v `src/main.ts`: `BESEDILA_RAVEN`, `gumbPonastaviIzbor`, gumb posamezne naloge in `ponastaviIzbor`.

| Mesto | Predlog |
| --- | --- |
| Izbirnik ravni | »Samo B2« / »Samo C1« / »Vse ravni (B2 in C1)«; ohraniti »Raven nalog«. |
| Nadnaslov za vse ravni | »Ravni B2 in C1«; za posamezno raven ohraniti »Raven B2« oziroma »Raven C1«. |
| Posamezna naloga | Ohraniti »Ponastavi nalogo« in `aria-label` »Ponastavi nalogo {ID}«. |
| Opis posamezne ponastavitve | »Izbriše odgovor in rezultat ter zapre razlago te naloge.« Razlaga se zapre, njeno besedilo se ne izbriše. |
| Gumb izbora | »Ponastavi rezultate (N)«; jasneje pove, da se ne ponastavijo filtri. |
| Opis gumba izbora | »Izbriše shranjene rezultate nalog v izboru: {opisIzbora(false)}. Filter »samo nerešene« pri tem ne velja.« |
| Dostopno ime gumba izbora | »Ponastavi rezultate. Število nalog s shranjenim rezultatom: N. Izbor: {opisIzbora(false)}.« |
| Potrditev v seznamu | »Želite izbrisati shranjene rezultate za izbor »{opisIzbora(false)}«? Število nalog s shranjenim rezultatom: N. Filter »samo nerešene« pri tem ne velja.« |
| Dodatek potrditvi v kvizu | »Trenutni kviz se bo začel znova z istimi nalogami.« |

N pomeni število nalog s shranjenim rezultatom v izboru ravni, kategorije in tipa; ne števila vseh nalog ali vseh osnutkov. Predlagana poved »Število nalog ...: N« se izogne napačnemu sklanjanju pri 1, 2, 3 in 4. Pri posamezni ponastavitvi nova potrditev ni potrebna. Predlogi ne spreminjajo vedenja ponastavljanja.

## Preverjanje

Uspešno: primerjava s HEAD potrjuje omejitev sprememb na navedene naloge in besedilna polja; UTF-8 brez BOM, veljaven JSON, ohranjena shema in enolični ID-ji; 112 nalog (88 B2 / 24 C1), najmanj 15 na kategorijo. Preverjeno ujemanje rešitev z možnostmi in števila vnosov z vrzelmi. `npm run build` (TypeScript + Vite) je uspel. Lock je ob zaključku odstranjen. Samo lokalni commit, brez push.

---

### Arhiv prejšnje predaje

[OPRAVLJENO] 25. 11. 2026 — Pregledanih vseh 44 obstoječih B2 razlag in opozoril; dodatno poenostavljenih 27 razlag ter izbrana opozorila. Dodanih 44 novih B2 nalog: FRA-011–015, VID-013–015, DVO-006–015, SKL-005–015 in SLO-001–015 (vsi ID-ji s predpono C1-). Skupaj 112 nalog: 88 B2 / 24 C1. Vseh sedem projektnih kategorij ima vsaj 15 nalog skupaj: vezljivost 19, rodilnik 18, preostalih pet po 15. Vejice in odvisniki so vključeni v skladnjo, register in besedotvorje v slog. Preverjeni UTF-8 brez BOM, shema, ID-ji, vrzeli, rešitve in build; C1 naloge ohranjene. Brez git push.

_Starejša navodila (poenostavitev B2 razlag in razširitev baze) so izpolnjena in nadomeščena; odstranjena ob pripravi naloge 25. 11. 2026._




