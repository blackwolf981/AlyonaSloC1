# 📊 NAPREDEK PROJEKTA: Aljonina spletna vadnica slovenščine (B2–C1)

**Zadnja posodobitev:** 24. november 2026  
**Vsebina in uredniški pregled:** Codex & Gemini; **vmesnik:** Claude Code  
**Status projekta:** 🟡 V teku (Faza 3 & 4: Prehod na B2, poenostavitev razlag in UX)

---

## 🎯 Pregled stanja (Dashboard)

| Metrika | Vrednost | Cilj |
| :--- | :--- | :--- |
| **Število vsebinsko potrjenih nalog B2–C1** | `63 / 110` (39 B2, 24 C1; posodobljene B2 razlage in tipične napake) | `110` |
| **Tematski moduli z nalogami** | `6 / 7` (MOD-01 in MOD-02 zaključena ✅) | `7 / 7` |
| **Spletni vmesnik (Frontend)** | 🟢 Polno interaktivna vadnica + 🎯 Način Kviz + B2/C1 filter | Delujoča interaktivna aplikacija |
| **Lektura in jezikovna potrditev** | 🟢 63 / 63 nalog pregledanih in prilagojenih (100 %) | 100 % pregledanih nalog |


---

## 🚀 Faze projekta

### Faza 1: Nastavitev temeljev in arhitekture
- [x] Priprava projektne strukture in delovnega prostora (`AlyonaSloC1`)
- [x] Priprava operativnih navodil in vlog agentov (`NAVODILA.md`)
- [x] Vzpostavitev sistema za spremljanje napredka (`napredek.md`)
- [x] Izdelava začetnega pilotnega nabora nalog v `naloge.json` *(Codex)*
- [x] Slovnični pregled in odobritev pilotnih nalog *(Gemini)*

### Faza 2: Razvoj spletne aplikacije (Frontend & UX)
- [x] Priprava Git repozitorija, GitHub Pages konfiguracije in base URL poti *(Claude Code)*
- [x] Izbira in postavitev razvojnega ogrodja spletne strani (Vite + TS + Tailwind) *(Claude Code)*
- [x] Mehanizem za dinamično branje `naloge.json` ob zagonu in buildu *(Claude Code)*
- [x] Uspešna objava delujoče spletne strani na GitHub Pages (`https://blackwolf981.github.io/AlyonaSloC1/`)
- [x] Izdelava celovitega odzivnega vmesnika z interaktivnim reševanjem vseh 4 tipov nalog *(Claude Code)*
- [x] Prikaz takojšnje povratne informacije, slovničnih razlag in tipičnih napak *(Claude Code)*
- [x] Lokalno shranjevanje napredka (LocalStorage) in filtri po kategorijah *(Claude Code)*
- [x] Filter »Samo nerešene / napačne« in stikalo za svetlo/temno temo *(Claude Code)*
- [x] Filter po tipu naloge ter optimizacija mobilne odzivnosti z gumbi >= 44 px *(Claude Code)*
- [x] Optimizacija odzivne orodjarne na desktopu: stranska letev na >= 1024 px, širina 72rem *(Claude Code)*

### Faza 3: Širitev vsebinske baze B2–C1
- [x] Modul 1: Vezljivost glagolov in predložne zveze (✅ 15 / 15 nalog odobrenih — MODUL ZAKLJUČEN!)
- [x] Modul 2: Rodilnik zanikanja in delni rodilnik (✅ 15 / 15 nalog odobrenih — MODUL ZAKLJUČEN!)
- [ ] Modul 3: Napredna frazeologija in idiomi (pripravljeno: 10, odobreno: 10, cilj: 20 nalog)
- [ ] Modul 4: Glagolski vid in pomeni v kontekstu (pripravljeno: 8, odobreno: 8, cilj: 15 nalog)
- [ ] Modul 5: Dvojina in zahtevna ujemanja (pripravljeno: 1, odobreno: 1, cilj: 15 nalog)
- [ ] Modul 6: Polstavčne strukture in skladnja (pripravljeno: 1, odobreno: 1, cilj: 15 nalog)
- [ ] Modul 7: Slogovni registri in sopomenke (pripravljeno: 0, odobreno: 0, cilj: 15 nalog)

### Faza 4: Uporabniško testiranje, jezikovno brušenje in napredne funkcije (»Pika na i«)
- [ ] Testiranje uporabniške izkušnje z Aljono na telefonu
- [ ] Odprava morebitnih hroščev in optimizacija delovanja na mobilnih napravah
- [x] **Način »Osredotočena vaja« (Dnevni kviz):** Način reševanja 10 naključnih nalog po korakih (ena naloga naenkrat) s končnim povzetkom uspešnosti *(Claude Code — implementirano v commitu de62611!)*
- [ ] **Zvočna izgovorjava (Text-to-Speech):** Gumb z zvočnikom ob povedi za poslušanje naravne slovenske izgovorjave (`window.speechSynthesis` z `sl-SI`) *(Claude Code — naslednji korak)*
- [ ] Končna jezikovna revizija vseh nalog in razlag *(Codex; po novem dogovoru z uporabnikom)*

---

## 📚 Stanje tematskih modulov (Naloge B2–C1)

Raven določa obstoječe polje `raven`: dovoljeni vrednosti sta `B2` in `C1`. Claude naj filter in prikaz ravni veže na to polje, ne na predpono ID-ja. Obstoječi ID-ji ostajajo nespremenjeni zaradi shranjenega napredka uporabnice.

Razvrstitev je začetna uredniška ocena zahtevnosti posamezne naloge, ne uradna kalibracija SEJO. B2 vključuje vodeno uporabo vezav, oblik in običajnih frazemov; C1 vključuje povezovanje več slovničnih zahtev, razlikovanje dosega zanikanja, skladenjske pretvorbe ter presojo registra. Upoštevata se sobesedilo in pomoč v navodilu, ne le dolžina razlage. Po preizkusu z Aljono lahko raven prilagodimo.

| Šifra | Tematski modul | Načrtovano | Pripravljeno (Codex / Gemini) | Odobreno (Gemini) |
| :--- | :--- | :---: | :---: | :---: |
| **MOD-01** | Vezljivost in predlogi | 15 | 15 | 15 ✅ |
| **MOD-02** | Rodilnik ob zanikanju | 15 | 15 | 15 ✅ |
| **MOD-03** | Frazeologija in pregovori | 20 | 10 | 10 |
| **MOD-04** | Glagolski vid | 15 | 8 | 0 (popravki po recenziji) |
| **MOD-05** | Dvojina in ujemanje | 15 | 1 | 1 |
| **MOD-06** | Skladnja in deležniki | 15 | 1 | 1 |
| **MOD-07** | Slog in sopomenke | 15 | 0 | 0 |
| **SKUPAJ** | | **110** | **50** | **42** |

---

## 📝 Dnevnik sprememb in aktivnosti (Changelog)

### [23. 11. 2026]
* **Codex (razvrstitev B2/C1):**
  - Pregledanih vseh 50 nalog: 26 označenih B2, 24 ohranjenih C1. Spremenjeno je samo polje raven; ID-ji, besedila in rešitve so ohranjeni.
  - B2: VEZ-001, 002, 006, 007, 008, 009, 011, 014, 015; ROD-007, 013; FRA-001, 004–010; VID-001, 002, 004–008. Vsi navedeni ID-ji ohranjajo zgodovinsko predpono C1-.
  - Preverjena nespremenjenost vseh drugih polj in uspešen `npm run build`. Filtre pripravi Claude; Codex prevzame vsebino in uredniški pregled med odsotnostjo Gemini.
* **Gemini (avtor) / Codex (recenzent):**
  - Dodanih 8 nalog `C1-VID-001`–`C1-VID-008` za MOD-04: 3 izbire, 3 vnosi, 1 parafraza in 1 popravek napake. MOD-04: **8/15**, skupaj **50/110**. Prejšnjih 42 nalog je ohranjenih brez sprememb.
  - VID-001: velelnik prestavljen iz odvisnika v samostojno svarilo; VID-003: ločena slogovna nevtralnost od slovnične dopustnosti oblike naprošamo.
  - VID-002 in VID-004: navodili natančno določata zahtevani vid in obseg vnosa; VID-005: popravljeno sklicevanje na odvisnik s preden ter usklajeni pomen ponavljanja in alternativni besedni redi.
  - VID-006: nedvoumna napaka ob faznem glagolu namesto neutemeljene prepovedi dovršnika za medtem ko. VID-007: dodan dopustni odgovor odpravila; sproti ne zahteva samo nedovršnika. VID-008: pojasnjena razlika med ciljnim odvisnikom in namenilnikom.
  - Odpravljene absolutne trditve o glagolskem vidu. Slovarski register preverjen na [Franu](https://fran.si/iskanje?Query=napro%C5%A1ati); ponavljanje z dovršnikom primerjano s [Slavističnim zbornikom 2011](https://zdsds.si/wp-content/uploads/2019/01/zbornik2011.pdf). Spremenjene različice so pripravljene za končno uredniško potrditev Gemini.
  - Uspešni preverjanje UTF-8, sheme, 50 enoličnih ID-jev, vrzeli, odgovorov in nespremenjenosti prejšnjih 42 nalog ter `npm run build`.
* **Codex / ChatGPT (Vsebina):**
  - Dodanih 9 nalog `C1-ROD-007`–`C1-ROD-015` (3 izbire, 6 vnosov). MOD-02 ima pripravljenih 15/15 nalog.
  - Dodanih 8 nalog za MOD-03 (`C1-FRA-003`–`C1-FRA-010`): parafraze s telesnimi in živalskimi frazemi (*iti na roko*, *delati iz muhe slona*), popravki zamešanih frazemov (*maslo na glavi*, *puška v koruzo*), dopolnjevanje ključnih sestavin (*mačka v žaklju*, *jabolko spora*) ter pregovori (*tiha voda bregove dere*, *po toči zvoniti je prepozno*).
  - Skupna baza narasla na **42 nalog**. Uspešno preverjeni UTF-8, enolični ID-ji, shema in `npm run build`.
* **Gemini (Slovnični urednik in vodja projekta):**
  - Opravljen celovit jezikovni in skladenjski pregled vseh novih nalog rodilnika zanikanja in frazeologije.
  - Vseh **42 nalog** v bazi je uradno **odobrenih**!
  - V `NAVODILA.md` sprejeto in vpisano pravilo Claude Code o selektivnem commitanju lastnih datotek in obveznem `git pull` pred objavo.
* **Claude Code (Arhitekt & Frontend):**
  - **UX nadgradnja 3 (commit 8f64a8d):** Odzivna orodjarna na namiznih računalnikih:
    * Na zaslonih >= 1024 px se vsebina razširi na 72rem (1152 px), statistika in filtri so prestavljeni v elegantno lepljivo stransko letev (sidebar).
    * Prva naloga se na namizju začne že pri 13–15 % višine zaslona (prej pri skoraj 50 %).
    * Na telefonih in tablicah: statistika v eni vrstici, filtri zloženi pod »Filtri ▾«, ohranjeni drsni filtri in gumbi >= 44 px. Brez vodoravnega drsenja na vseh resolucijah (1920×1080 do 375 px).

---

## 🔜 Naslednji delovni sklop
1. **Claude Code (Pika na i):**
   - Način »Osredotočena vaja« (kviz 10 naključnih nalog, ena po ena s povzetkom) ali zvočna izgovorjava povedi (TTS).
2. **Kolegialno ustvarjanje (Gemini + Codex):**
   - Gemini potrdi recenzentske popravke nalog `C1-VID-001`–`C1-VID-008`; nato sledi dopolnitev MOD-04 s preostalimi 7 nalogami.
3. **Aljonin preizkus v živo:** 
   - Testiranje vadnice na pametnem telefonu na povezavi [https://blackwolf981.github.io/AlyonaSloC1/](https://blackwolf981.github.io/AlyonaSloC1/) (že 42 nalog v živo!).

### [22. 11. 2026]
* **Gemini (Vodja projekta in urednik):** 
  - Uradni zagon projekta.
  - Sestavljena datoteka `NAVODILA.md` z določenimi pravili sodelovanja za Gemini, Codex in Claude Code ter JSON shemo.
  - Vzpostavljena datoteka `napredek.md` za sledenje ciljem in fazam.
  - Pregledanih in odobrenih prvih 7 pilotnih nalog v `naloge.json`. Slovnična ustreznost, didaktična struktura in razlage ocenjene z odlično oceno.
* **Codex / ChatGPT (Vsebina):**
  - Izdelana začetna datoteka `naloge.json` s 7 pilotnimi nalogami C1 (vezljivost, rodilnik zanikanja, frazeologija, dvojina mešanega osebka, skladenjski deležijski polstavek).
  - Dodan paket 8 nalog za MOD-01 (`C1-VEZ-003`–`C1-VEZ-010`): 3 naloge tipa `izbira` in 5 tipa `vnos`; prvotnih 7 nalog je ohranjenih. Skupaj je pripravljenih 15 nalog, od tega 10 za MOD-01.
  - Preverjeni UTF-8 JSON, shema, enoličnost ID-jev, vrzeli `___` in ločila `; ` pri več rešitvah; uspešno izveden `npm run build`.
  - Dodan naslednji paket 10 nalog: `C1-VEZ-011`–`C1-VEZ-015` za zaključek priprave MOD-01 in `C1-ROD-002`–`C1-ROD-006` za razširitev MOD-02 (3 izbire, 7 vnosov). Obstoječih 15 nalog je ohranjenih brez sprememb; novih 10 čaka na Geminijev pregled.
  - Posebej obravnavani pomenska razlika med bati se česa in bati se za kaj, predložni tožilnik ob zanikanju, delni rodilnik, zanikani deležijski polstavek, nikalni deležnik ter skladenjske meje zanikanja v odvisnikih. Ponovno uspešni validacija JSON in UTF-8, preverjanje vrzeli in rešitev ter `npm run build`.
* **Gemini (Slovnični urednik):**
  - Opravljen poglobljen jezikovni in didaktični pregled vseh novih nalog (`C1-VEZ-003`–`C1-VEZ-015` ter `C1-ROD-002`–`C1-ROD-006`).
  - Potrjene razlage vezav z zanikanjem, pomenskih razlik (*bati se* vs. *bati se za*), delnega rodilnika, deležij ter dosega zanikanja v odvisnikih.
  - Vseh **25 nalog** v bazi je uradno **odobrenih**. Modul 1 (*Vezljivost in predlogi*) je v celoti zaključen (15/15)!
* **Claude Code (Arhitekt & Frontend):**
  - Postavljeno ogrodje Vite + TypeScript + Tailwind CSS v4 (`index.html`, `src/`, `vite.config.ts`).
  - `base: './'`: relativne poti, pripravljeno za GitHub Pages podmapo `/AlyonaSloC1/`.
  - Avtomatiziran build test s preverjanjem veljavnosti `naloge.json` ob buildu.
  - Dodani `.gitignore`, `.github/workflows/deploy.yml` (CI/CD za avtomatsko objavo) in `README.md`.
  - Repozitorij uspešno povezan z GitHubom (`blackwolf981/AlyonaSloC1`), opravljen prvi push na vejo `main`.
  - **Faza 2 zaključena (commita 8f2fe4b in bdaac15):** Polno interaktivno reševanje vseh 4 tipov nalog z dinamičnimi vrzelmi, karticami možnosti A–D, hitrimi tipkami (Enter / Ctrl+Enter), gumbom »Vstavi izhodiščno poved«, takojšnjo povratno informacijo, izpisom didaktičnih razlag in tipičnih napak.
  - Dodana nadzorna vrstica (statistika, filtri kategorij, LocalStorage).
  - Uspešno opravljeno testiranje v Chromu (namizje in 375 px mobilni pogled) ter odprava 3 vizualnih napak.
  - **UX nadgradnja 1 (commit c751799):** 
    * Dodan kombiniran filter »Samo nerešene / napačne« s sprotnim števcem odprtih nalog.
    * Dodano stikalo za temo (☀️ / 🌙) z ohranjanjem v LocalStorage brez utripanja ob zagonu.
    * Uspešno testirano v Chromu (ohranitev stanja, preklop teme, kombinacija filtrov).
  - **UX nadgradnja 2 (commit c0d40eb):**
    * Dodan sekundarni filter po tipu naloge (`tip_naloge`: Vse, Izbira, Vnos, Parafraza, Popravek).
    * Filtri so urejeni v ločene drsne vrstice, optimizirane za enoročno uporabo na telefonih.
    * Vsi klikabilni gumbi imajo višino >= 44 px za udobno zadevanje s palcem.

---

## 🔜 Naslednji takojšnji koraki
1. **Claude Code (Frontend & UX):** 
   - Optimizacija orodjarne na desktopu: širši odzivni layout (npr. max-w-5xl/6xl na lg/xl), združitev statistike v eno vrstico, zmanjšanje navpične višine.
2. **Codex / ChatGPT (Faza 3 - Vsebina):** 
   - Zagon Modula 3 (*Frazeologija in pregovori*): priprava paketa 8–10 novih nalog (`C1-FRA-003` do `C1-FRA-012`).
3. **Aljona & uporabniško testiranje:** 
   - Preizkus vadnice v živo na povezavi [https://blackwolf981.github.io/AlyonaSloC1/](https://blackwolf981.github.io/AlyonaSloC1/) (že 34 nalog v živo!).
