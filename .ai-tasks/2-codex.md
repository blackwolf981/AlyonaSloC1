# [OPRAVLJENO] Kratka kontrola petih novih B2 nalog iz commita 045f848 — 25. 11. 2026

## Izid

* **Pregledanih:** natanko 5 nalog (`C1-VEZ-019`, `C1-ROD-018`, `C1-DVO-005`, `C1-VID-012`, `C1-SKL-004`).
* **Spremenjeno:** `C1-ROD-018` — `navodilo` in `slovnicna_razlaga`; `C1-VID-012` — `navodilo`. `C1-VEZ-019`, `C1-DVO-005` in `C1-SKL-004` brez popravkov; ID-ji, rešitve in metapodatki nespremenjeni.
* **Commit:** `00311d2`, samo `naloge.json`, brez `git push`.
* **Sanity check (DeepSeek):** 3 spremenjena besedilna polja na 2 ID-jih, 112 nalog (88 B2 / 24 C1), 0 podvojenih ID-jev, 0 manjkajočih polj, min 15/kategorijo, UTF-8 brez BOM, brez lock datotek, `npm run build` uspešen.
* **Odprto (mikro):** v novem navodilu `C1-ROD-018` zveza `sodi za` ni knjižna; predlog `sodi k` ali `dopolnjuje` ob naslednjem vsebinskem obhodu. Vsebina naloge in rešitve sta pravilni.

# Navodila za Codex (.ai-tasks/2-codex.md)

## 🎯 Namen

Pregled 49 novih B2 nalog (commit `1911aed`) je zajel vse nove naloge razen petih, ki so bile v bazo dodane že v commitu `045f848`. Ta naloga zapira to vrzel: jezikovni in pedagoški pregled **natanko teh petih nalog**. Obseg je namerno majhen — ne odpiraj drugih nalog in ne prinašaj novih vsebin.

## 📋 Obseg: natanko 5 nalog

| ID | Kategorija | Tip | Na kaj bodi pozoren |
| :--- | :--- | :--- | :--- |
| `C1-VEZ-019` | vezljivost_in_predlogi | vnos (2 vzreli) | dajalnik ob `zaupati` in tožilnik ob `zanesti se na`; navodilo zahteva »predlog + ustrezno obliko zveze«, odgovor pa mora ostati v obliki `prva; druga`; preveri, ali učenca zavaja, da je iz oblik `zaupala`/`zanesla` razvidno žensko obliko `vodje`, ki pa v navodilu ni omenjena |
| `C1-ROD-018` | rodilnik_zanikanja | izbira | rodilnik ob `nimamo` proti tožilniku ob `pozabiti na`; navodilo »Pazite na razliko med česa nimamo in na kaj ne smemo pozabiti« je nerodno — predlagaj naravnejšo ubeseditev, ki pa ne izda odgovora; v `slovnicna_razlaga` zveza »Pri nimamo se podatki spremenijo v podatkov« potrebuje narekovaje ali drugačno ubeseditev |
| `C1-DVO-005` | dvojina | popravek_napake | `jih` → `ju` pri natanko dveh osebah; preveri, da navodilo res zahteva celotno poved in da se druge besede ne spreminjajo, ter da se `povabil` ob `ju` ujema |
| `C1-VID-012` | glagolski_vid | vnos | `nehali` + nedovršnik `pošiljati` (ne `poslati`); preveri, ali je sklicevanje na »zvezo nehali so« dovolj jasno glede na besedni red v kontekstu (`so jim iz podjetja nehali`) |
| `C1-SKL-004` | skladnja_in_slog | parafraza | `kljub` + dajalnik (`slabemu vremenu`), brez vejice za uvodno zvezo; preveri, ali navodilo dovolj natančno pove, kaj ostane nespremenjeno, in ali je odgovor mogoče sestaviti samo na en način |

## ✅ Kaj lahko spreminjaš

Samo besedilna polja: `navodilo`, `kontekst`, `moznosti`, `pravilni_odgovor`, `alternativni_odgovori`, `slovnicna_razlaga`, `tipicna_napaka`.

Upoštevaj `brain/02-SLOVENSCINA.md`: B2 razlage so 1–2 kratki povedi v vsakdanjem jeziku, brez težkih jezikoslovnih terminov, s kratkim praktičnim zgledom; brez nepotrebnega ponavljanja. Pravilni odgovor mora ostati vsebinsko enak (isti pomen, ista zahtevana oblika), tudi če ga prepišeš.

## 🚫 Česa ne smeš spreminjati

* Zaklenjena polja: `id`, `raven`, `kategorija`, `podkategorija`, `tip_naloge`, `oznake`. Če opaziš neskladje (npr. oznaka modula), ga samo opiši v poročilu.
* Ne posegaj v druge naloge, v `src/`, v `brain/` ali v `napredek.md`.
* Če katera od petih nalog ne potrebuje popravka, je to veljaven izid — napiši »brez popravkov« in pojasni zakaj.
* Znano in namerno izven obsega: `C1-FRA-009` in `C1-FRA-010` (tip `izbira`) nimata vrzeli `___`. Ne popravljaj ju; lahko ju le omeniš v feedbacku.

## 🧪 Preverjanje in zaključek

1. Veljaven JSON in UTF-8 brez BOM. Pri tipu `izbira` ostanejo štiri `moznosti` in `pravilni_odgovor` mora biti ena od njih; pri `vnos` naj bo število odgovorov enako številu vrzeli (ločilo `; `), `kontekst` pa vsebuje vsaj tri podčrtaje.
2. `npm run build` (TypeScript + Vite).
3. `git add naloge.json .ai-tasks/2-codex.md` in `git commit -m "[Codex]: Kratka kontrola petih novih B2 nalog iz commita 045f848"` — brez `git push`.
4. Lock: pred delom ustvari `codexprevajam.lock`, ob koncu ga obvezno izbriši.

## 📤 Obvezni Feedback

Na koncu odgovora en sam blok z oznako `text`:

```text
[Feedback za Cline]
- Narejeno: [kaj si pregledal in katere spremembe si vnesel, po ID-jih]
- Spremenjene datoteke: [naloge.json / brez sprememb]
- Stanje lock: ni aktivnih lock datotek (lock izbrisan)
- Opozorila / Vprašanja: [brez / opažanja izven obsega]
```

---


# 🗄️ Arhiv prejšnjih predaj

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




