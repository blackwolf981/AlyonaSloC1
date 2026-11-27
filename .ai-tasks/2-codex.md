# [OPRAVLJENO] Predlog 5 nalog novega tipa stavcni_puzzle (B2) — 27. 11. 2026

- Pripravljeni ID-ji: C1-SKL-016, C1-DVO-016, C1-VID-016, C1-FRA-016, C1-SLO-016.
- Predlog: predlogi-stavcni-puzzle.json; natanko 5 objektov s po 13 polji, UTF-8 brez BOM.
- Navodilo omejuje rešitve na začetno besedo z veliko začetnico in nevtralen besedni red; dodane so nevtralne alternative, ne zaznamovane ali pesniške razporeditve.
- Omejitev tipa: VID in SLO utrjujeta rabo že ponujenih oblik; brez odvečnih sestavin ne preverjata samostojne izbire vida oziroma sopomenke.
- naloge.json, src/, brain/ in napredek.md ostajajo nespremenjeni; predlog še ni vključen v aplikacijo.

# Navodila za Codex (.ai-tasks/2-codex.md)

## 🎯 Namen

Uvajamo **nov tip naloge `stavcni_puzzle`** (v vmesniku se bo prikazal kot »Sestavi poved«): učenka dobi poved, razsuto na posamezne besede in ločila, in jih mora sestaviti v pravilno poved — kot puzzle. Tvoja naloga je **predlog natanko 5 stavkov na ravni B2**.

**Pomembno:** v tej fazi nalog še **ne vpisuj v `naloge.json`**. Podpora novemu tipu v vmesniku (`src/`) še ni narejena; če bi naloge zdaj dodal v bazo, bi se prikazale kot navadno besedilno polje in bi jih bilo mogoče »rešiti« s prepisovanjem povedi. Zato predlog zapišeš v ločeno datoteko (glej spodaj), vnos v `naloge.json` sledi šele po tem, ko Claude Code doda podporo tipu.

## 📋 Obseg: natanko 5 predlogov, vsak v svoji kategoriji

| ID | Kategorija | Podkategorija (predlog) | Kaj naj poved preverja |
| :--- | :--- | :--- | :--- |
| `C1-SKL-016` | skladnja_in_slog | naslonski_niz | mesto naslonskega niza in vejica pred odvisnikom |
| `C1-DVO-016` | dvojina | ujemanje_v_dvojini | dvojina in ujemanje povedka ter prilastka |
| `C1-VID-016` | glagolski_vid | vid_v_kontekstu | dovršnik proti nedovršniku ob prislovnem določilu |
| `C1-FRA-016` | frazeologija_in_pregovori | frazem_v_povedi | frazem ostane nespremenjen, vstavi se v poved |
| `C1-SLO-016` | slog_in_sopomenke | slogovni_register | slogovno ustrezna izbira besede v povedi |

Vseh petih ID-jev v bazi še ni (preverjeno 27. 11. 2026), nobena obstoječa naloga pa še nima tipa `stavcni_puzzle`. Vseh pet predlogov je raven **B2**.

## 📦 Kam zapišeš predlog

1. **`predlogi-stavcni-puzzle.json`** v korenu projekta (nova datoteka, veljaven JSON, UTF-8 **brez BOM**) s strukturo, enako kot `naloge.json`: `{ "naloge": [ … natanko 5 objektov … ] }`. Datoteka je začasna; po pregledu bo vsebina združena v `naloge.json`.
2. **Na začetek te datoteke** (`.ai-tasks/2-codex.md`) dodaj kratek povzetek po ustaljenem vzorcu: `# [OPRAVLJENO] Predlog 5 nalog novega tipa stavcni_puzzle (B2) — 27. 11. 2026` in pod njim 3–6 vrstic (katere ID-je si pripravil, kje je predlog, opozorila). Spodnjih navodil ne spreminjaj in ne briši.

## 📐 Shema posameznega predloga (vseh 13 polj)

```json
{
  "id": "C1-SKL-016",
  "kategorija": "skladnja_in_slog",
  "podkategorija": "naslonski_niz",
  "raven": "B2",
  "tip_naloge": "stavcni_puzzle",
  "navodilo": "Sestavite pravilno poved iz ponujenih besed in ločil. Vsako sestavino uporabite natanko enkrat; ničesar ne dodajajte ali spreminjajte.",
  "kontekst": "",
  "moznosti": ["je", "Ko", "…premešane sestavine…"],
  "pravilni_odgovor": "…sestavljena poved…",
  "alternativni_odgovori": [],
  "slovnicna_razlaga": "1–2 kratki povedi z zgledom",
  "tipicna_napaka": "konkretno opozorilo v vsakdanjem jeziku",
  "oznake": ["MOD-06", "naslonski_niz", "stavcni_puzzle"]
}
```

* `moznosti` = premešane sestavine (besede in notranja ločila), `kontekst` = `""` (prazen, ker bi poved izdala rešitev).
* `navodilo` naj bo pri vseh petih enako; lahko mu dodaš eno kratko namigovalno poved, če je nujna (npr. »Pazi na mesto naslonskega niza.«), ne sme pa izdati rešitve.

## ✍️ Pravila za sestavine (`moznosti`) — obvezno

* 7–12 sestavin na poved; vsaka sestavina je **ena beseda ali eno ločilo**, brez presledkov znotraj sestavine.
* Premešaj jih tako, da prve tri sestavine **niso** začetek pravilne povedi in da se vrstni red ne da uganiti.
* Notranja ločila (`,`, `:`, `–`) so samostojne sestavine.
* Končnega ločila (`.`, `?`, `!`) **ne** dodajaj med sestavine; je samo v `pravilni_odgovor` (vmesnik končnega ločila pri primerjavi ne zahteva).
* Narekovaje `» «` uporabi le, če poved brez dobesednega navedka ne gre; raje sestavi poved brez narekovajev.
* Sestavine zapiši tako, kot so v povedi (prva beseda z veliko začetnico, lastna imena z veliko); primerjava v vmesniku ni občutljiva na velikost črk.
* `pravilni_odgovor` = natanko združene sestavine v pravilnem vrstnem redu, ločene z enim presledkom, s končnim ločilom. Ne dodajaj besed, ki jih ni med sestavinami, in nobene sestavine ne uporabi dvakrat.
* Če slovenščina dopušča več vrstnih redov, vse dopustne variante zapiši v `alternativni_odgovori`, v `slovnicna_razlaga` pa pojasni, kateri del vrstnega reda je vezan (naslonski niz) in kateri prost.
* Vsaka poved mora imeti **eno jasno najboljšo rešitev**; izogibaj se povedim, kjer bi bili dve razporeditvi enako dobri brez jasnega pravila.

## 📚 Vsebinske zahteve

* Raven B2, 7–12 besed, vsakdanje teme (služba, potovanje, družina, šola, prosti čas).
* `slovnicna_razlaga`: 1–2 kratki povedi v vsakdanjem jeziku + praktični zgled (glej `brain/02-SLOVENSCINA.md`).
* `tipicna_napaka`: konkretna, preprosta napaka, ki jo učenka res lahko naredi pri sestavljanju.
* `oznake`: `MOD-0x` (ustrezni modul), pojav (npr. `naslonski_niz`) in `stavcni_puzzle`.
* Pet predlogov naj pokrije pet različnih pojavov; ne ponavljaj istega pojava dvakrat.

## 🚫 Prepovedi

* Ne urejaj `naloge.json`, `src/`, `brain/`, `napredek.md` ali `src/napredek.ts`.
* Ne spreminjaj obstoječih nalog in ID-jev; ne uvajaj novih kategorij.
* Ne dodajaj novih polj v shemo — uporabi natanko 13 obstoječih polj.
* Ne izvajaj `git push`.

## 🧪 Preverjanje in zaključek

1. Veljaven JSON in UTF-8 brez BOM: `node -e "const d=JSON.parse(require('fs').readFileSync('predlogi-stavcni-puzzle.json','utf8'));console.log(d.naloge.length)"` → izpiše `5`.
2. Samokontrola sestavin: vsaka sestavina brez presledka; `pravilni_odgovor` se ujema z združenimi sestavinami (upoštevaj velike/male začetnice in končno ločilo); vseh 13 polj je prisotnih.
3. `npm run build` (TypeScript + Vite) mora uspeti.
4. Lock: pred delom ustvari `codexprevajam.lock`, ob koncu ga obvezno izbriši.
5. `git add predlogi-stavcni-puzzle.json .ai-tasks/2-codex.md` in `git commit -m "[Codex]: Predlog 5 nalog novega tipa stavcni_puzzle (B2)"` — brez `git push`.

## 📤 Obvezni Feedback

Na koncu odgovora en sam blok z oznako `text`:

```text
[Feedback za Cline]
- Narejeno: 5 predlogov (ID-ji) in kje je predlog shranjen
- Spremenjene datoteke: predlogi-stavcni-puzzle.json, .ai-tasks/2-codex.md
- Stanje lock: ni aktivnih lock datotek (lock izbrisan)
- Opozorila / Vprašanja: [brez / npr. kje je vrstni red dvoumen]
```

---


# 🗄️ Arhiv prejšnjih predaj

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




