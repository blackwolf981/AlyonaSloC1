# [OPRAVLJENO] Jezikovni pregled 49 novih B2 nalog — 25. 11. 2026

## Obseg in rezultat

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

## Arhiv prejšnje predaje

[OPRAVLJENO] 25. 11. 2026 — Pregledanih vseh 44 obstoječih B2 razlag in opozoril; dodatno poenostavljenih 27 razlag ter izbrana opozorila. Dodanih 44 novih B2 nalog: FRA-011–015, VID-013–015, DVO-006–015, SKL-005–015 in SLO-001–015 (vsi ID-ji s predpono C1-). Skupaj 112 nalog: 88 B2 / 24 C1. Vseh sedem projektnih kategorij ima vsaj 15 nalog skupaj: vezljivost 19, rodilnik 18, preostalih pet po 15. Vejice in odvisniki so vključeni v skladnjo, register in besedotvorje v slog. Preverjeni UTF-8 brez BOM, shema, ID-ji, vrzeli, rešitve in build; C1 naloge ohranjene. Brez git push.

# Navodila za Codex (.ai-tasks/2-codex.md)

## 🎯 Glavni cilj za Codex:
1. **Temeljita poenostavitev B2 razlag in tipičnih napak v `naloge.json`:**
   - Preglej vse obstoječe B2 naloge ter dodatno poenostavi `slovnicna_razlaga` in `tipicna_napaka` v popolnoma naraven, domač in vsakdanji jezik.
   - Odstrani vso suhoparno slovnično terminologijo, kadar ni nujno potrebna, in prepreči nepotrebno ponavljanje besedila.
2. **Razširitev nabora nalog (vsaj 15 nalog na kategorijo):**
   - Preglej število nalog po kategorijah in dopolni manjše kategorije (npr. dvojina, skladnja, vejice, odvisniki, glagolski načini, besedotvorje in register), da bo **vsaka kategorija štela najmanj 15 nalog**.
3. **Validacija in lokalni commit:**
   - Preveri veljavnost JSON, UTF-8 in zaženi `npm run build`.
   - Naredi lokalni `git add naloge.json` in `git commit -m "[Codex]: Dodatno poenostavljene B2 razlage in razširitev baze na vsaj 15 nalog na kategorijo"` (brez `git push`).
4. **Pravila zaklepanja:**
   - Pred delom preveri in ustvari `codexprevajam.lock`, ob zaključku pa jo obvezno izbriši.




