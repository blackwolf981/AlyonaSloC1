# [OPRAVLJENO] 27. 11. 2026 — Vnos 5 nalog tipa stavcni_puzzle

- Na konec polja `naloge` prenesenih 5 potrjenih objektov 1:1: C1-SKL-016, C1-DVO-016, C1-VID-016, C1-FRA-016, C1-SLO-016; obstoječih 112 nalog je nespremenjenih.
- `predlogi-stavcni-puzzle.json` izbrisan; vsebina je zdaj v `naloge.json`.
- Validacija uspešna: 117 nalog (93 B2 / 24 C1), brez podvojenih ID-jev, natanko 13 polj, UTF-8 brez BOM; sestavine se ujemajo z vsemi rešitvami in alternativami.
- Najmanj nalog na kategorijo je po vnosu 16 (navodila so pričakovala 15); `npm run build` uspešen.
- Brez posegov v `src/`, `brain/` in `napredek.md`; zaključek z lokalnim commitom, brez `git push`.

# 📥 [OPRAVLJENO 27. 11. 2026 — `9c4f23c`] 25 novih sestavljank `stavcni_puzzle` (B2)

**Izid (preveril orkestrator DeepSeek):** vnesenih 25 nalog po razporeditvi (VEZ 020–021, ROD 019–021, FRA/VID/DVO/SKL/SLO 017–020); baza **142 nalog** (118 B2 / 24 C1), **30 sestavljank**, kategorije 20–21; prvih 117 nalog JSON-identičnih; `tmp/preveri-puzzle.cjs` 30/30 OK; UTF-8 brez BOM; `npm run build` OK; lokalni commit brez `git push`. Naloga je zaključena — spodnjih navodil **ne izvajaj ponovno**.
**Odprta želja za naslednji paket (še ni naloga):** 6–8 sestavljank z mešanimi vrstami povedi (vprašanja z `Ali` + naslonke, vprašalnice, velelniki) — med 30 obstoječimi ni neposrednega vprašanja.

---

## Stanje
- Baza ima **117 nalog**; tip `stavcni_puzzle` je v njej s **5 nalogami** (B2), vmesnik ga podpira in je objavljen na GitHub Pages.
- Cilj: dodati **25 novih sestavljank istega tipa**, vse raven **B2**; po vnosu **142 nalog** (93 + 25 B2, 24 C1).
- Shema se ne spreminja: natanko **13 polj** na nalogo, brez novih polj in brez posegov v `src/`.

## Razporeditev (obvezna — da ostaneta baza in kategorije uravnoteženi)
| Kategorija | Oznaka modula | Novi ID-ji | Št. | Skupaj po vnosu |
| :--- | :--- | :--- | :--- | :--- |
| `vezljivost_in_predlogi` | MOD-01 | `C1-VEZ-020`, `C1-VEZ-021` | 2 | 21 |
| `rodilnik_zanikanja` | MOD-02 | `C1-ROD-019` … `C1-ROD-021` | 3 | 21 |
| `frazeologija_in_pregovori` | MOD-03 | `C1-FRA-017` … `C1-FRA-020` | 4 | 20 |
| `glagolski_vid` | MOD-04 | `C1-VID-017` … `C1-VID-020` | 4 | 20 |
| `dvojina` | MOD-05 | `C1-DVO-017` … `C1-DVO-020` | 4 | 20 |
| `skladnja_in_slog` | MOD-06 | `C1-SKL-017` … `C1-SKL-020` | 4 | 20 |
| `slog_in_sopomenke` | MOD-07 | `C1-SLO-017` … `C1-SLO-020` | 4 | 20 |

ID-je uporabi **natanko tako** — brez lukenj, brez novih kategorij, brez novih modulov.

## Pravila za vsako sestavljanko
1. **Polja:** 13 polj; `kontekst` = `""`, `raven` = `"B2"`, `tip_naloge` = `"stavcni_puzzle"`, `alternativni_odgovori` = polje (lahko prazno).
2. **Sestavine (`moznosti`):** 7–9 sestavin v **premešanem** vrstnem redu; vsaka sestavina je ena beseda **ali** eno ločilo, **brez presledkov znotraj**; končnega ločila (`. ? !`) med sestavinami **ni**.
3. **Enoličnost:** vse sestavine so med seboj **različni nizi**; natanko **ena** sestavina se začne z veliko začetnico (začetek povedi). Ne uporabljaj lastnih imen, ki bi zahtevala veliko začetnico sredi povedi — razen če je taka sestavina edina taka (tedaj mora biti začetek povedi še vedno nedvoumen).
4. **Rešitev:** `pravilni_odgovor` = sestavine v pravilnem vrstnem redu, združene z **enim presledkom**, na koncu končno ločilo. Pred vejico ni presledka, za njo je en presledek (npr. `Obljubila sem mu, da se bom vrnila.`).
5. **Vsaka sestavina natanko enkrat:** nobene sestavine ne uporabi dvakrat in ne dodajaj besed, ki jih ni med sestavinami.
6. **Alternative:** v `alternativni_odgovori` navedi samo resnično sprejemljive vrstne rede, sestavljive iz istih sestavin. Če je vrstni red vezan (naslonski niz, zveza z veznikom), alternative **ni**.
7. **Enolična rešljivost:** iz samih sestavin mora biti mogoče sestaviti natanko eno smiselno poved (oz. le navedene alternative). Preden nalogo vneseš, sestavine premešaj in poskusi sestaviti »napačno« poved — če je mogoča, besedo zamenjaj ali dodaj (npr. prislov), da bo rešitev enolična.


8. **Vsebina (B2):** zahtevnejša vezljivost, rodilnik zanikanja, frazeologija/pregovor v rabi, glagolski vid v odvisniku, dvojina v večbesedni zvezi, polstavčne strukture, slogovni register — po `brain/02-SLOVENSCINA.md`. Brez banalnih osnovnošolskih primerov; vsaka poved naj ima 7–12 besed in naj bo vsebinsko zanimiva (vsakdanja situacija, služba, študij, potovanje).
9. **Razlaga (`slovnicna_razlaga`):** 1–2 kratka stavka v vsakdanji slovenščini + kratek praktični zgled; brez težkih izrazov (kot pri obstoječih petih sestavljankah, 130–210 znakov).
10. **Tipična napaka (`tipicna_napaka`):** konkretna napaka, ki jo učenka pri **tej** sestavljanki zlahka naredi (napačen vrstni red naslonk, pozabljena vejica, zamenjana predloga, napačna oblika v dvojini).
11. **Oznake (`oznake`):** natanko trije nizi: `["MOD-0X", "<tema_v_snake_case>", "stavcni_puzzle"]`; tema naj opiše pojav (npr. `naslonski_niz`, `frazem_v_povedi`, `ujemanje_v_dvojini`, `vid_v_kontekstu`).
12. **Podkategorija:** kratka oznaka pojava v `snake_case`, skladna z obstoječim besediščem kategorije (izbor): VEZ `vezljivost_glagolov`, `predlozno_dopolnilo`, `dajalnisko_predlozno_dopolnilo`; ROD `delni_rodilnik_in_rodilnik_zanikanja`, `zanikanje_glavnega_stavka`, `predlog_brez`; FRA `frazem_v_povedi`, `pregovor_v_kontekstu`, `popravek_zamesanega_frazema`; VID `vid_v_kontekstu`, `faza_dejanja_ob_glagolih_zacetka`, `sprotnost_ob_prislovih`; DVO `ujemanje_v_dvojini`, `oba_in_obe`, `dajalnik_dveh_oseb`; SKL `naslonski_niz`, `vejica_pred_ker`, `namen_z_da_bi`; SLO `slogovni_register`, `vljudna_prosnja`, `sopomenka_v_kontekstu`. Nove podkategorije so dovoljene, a naj se ne podvajajo po nepotrebnem.

## Vrstni red v datoteki
- Nove naloge dodaj **na konec** polja `naloge`, v vrstnem redu MOD-01 → MOD-07 (`VEZ`, `ROD`, `FRA`, `VID`, `DVO`, `SKL`, `SLO`), znotraj kategorije naraščajoče po ID.
- Obstoječih **117 nalog ne spreminjaj** — niti vsebine niti vrstnega reda niti presledkov.

## Preverjanje (obvezno pred commitom)
1. Shema (isti ukaz kot v `.clinerules`): 142 nalog, 0 podvojenih ID-jev, 0 manjkajočih polj, min **20**/kategorijo.
2. Zaženi **pripravljeno** skripto: `node tmp/preveri-puzzle.cjs` (pripravil orkestrator; ne spreminjaj je). Za vsako sestavljanko preveri: `kontekst === ''`, `raven === 'B2'`, 13 polj, 7–9 sestavin, sestavine brez presledkov in brez končnega `. ? !`, sestavine med seboj različne, natanko ena z veliko začetnico, `pravilni_odgovor` in vsaka alternativa sestavljiva iz sestavin (ločila kot samostojne enote), brez večkratnih presledkov in presledka pred ločilom, ter da se noben pravilni odgovor ne ponovi. Pričakovano: `117 + 25 = 142` nalog, `sestavljank: 30`, vse `OK`, `BOM: false`, `min/kategorijo: 20`.
   Če skripta karkoli označi s `FAIL`, popravi **nalogo** (ne skripte) in jo zaženi znova.
3. Vseh 25 rešitev preberi **naglas**; preveri, da je vsaka poved naravna, slovnično pravilna in nedvoumna.
4. UTF-8 brez BOM: `node -e "const b=require('fs').readFileSync('naloge.json');console.log('BOM:',b[0]===0xEF&&b[1]===0xBB&&b[2]===0xBF)"` → `BOM: false`.
5. `npm run build` uspešen.

## 🚫 Prepovedi
- Ne posegaj v `src/`, `brain/`, `napredek.md` ali `.ai-tasks/`.
- Ne spreminjaj obstoječih 117 nalog in ne dodajaj novih polj.
- Ne izvajaj `git push`.

## 📤 Obvezni Feedback
```text
[Feedback za Cline]
- Narejeno: 25 novih sestavljank stavcni_puzzle (B2), baza 142 nalog
- Spremenjene datoteke: naloge.json
- Stanje lock: ni aktivnih lock datotek (lock izbrisan)
- Opozorila / Vprašanja: [št. po kategorijah; potrditev, da obstoječih 117 nalog nisi spreminjal; izid preverjanja s tmp/preveri-puzzle.cjs]
```
Zaključi z lokalnim commitom: `git add naloge.json` in `git commit -m "[Codex]: 25 novih sestavljank stavcni_puzzle (B2), baza 142 nalog"` — brez `git push`.

# 🗄️ (arhiv) Prejšnja naloga — vnos 5 potrjenih nalog tipa `stavcni_puzzle` v `naloge.json` (opravljeno, `b5f2087`)

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




