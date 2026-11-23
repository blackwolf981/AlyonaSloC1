# 📊 NAPREDEK PROJEKTA: Aljonina spletna vadnica slovenščine (C1)

**Zadnja posodobitev:** 23. november 2026  
**Vodja projekta in urednik:** Gemini  
**Status projekta:** 🟡 V teku (Zagonska faza)

---

## 🎯 Pregled stanja (Dashboard)

| Metrika | Vrednost | Cilj |
| :--- | :--- | :--- |
| **Število potrjenih C1 nalog** | `42` | `100+` |
| **Tematski moduli z nalogami** | `5 / 7` (MOD-01 in MOD-02 zaključena ✅) | `7 / 7` |
| **Spletni vmesnik (Frontend)** | 🟢 Polno interaktivna aplikacija (vsi filtri, tema, mobilna odzivnost) | Delujoča interaktivna aplikacija |
| **Lektura in jezikovna potrditev** | 🟢 42 / 42 nalog potrjenih (100 %) | 100 % pregledanih nalog |

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

### Faza 3: Širitev vsebinske baze C1
- [x] Modul 1: Vezljivost glagolov in predložne zveze (✅ 15 / 15 nalog odobrenih — MODUL ZAKLJUČEN!)
- [x] Modul 2: Rodilnik zanikanja in delni rodilnik (✅ 15 / 15 nalog odobrenih — MODUL ZAKLJUČEN!)
- [ ] Modul 3: Napredna frazeologija in idiomi (pripravljeno: 10, odobreno: 10, cilj: 20 nalog)
- [ ] Modul 4: Glagolski vid in pomeni v kontekstu (pripravljeno: 0, odobreno: 0, cilj: 15 nalog)
- [ ] Modul 5: Dvojina in zahtevna ujemanja (pripravljeno: 1, odobreno: 1, cilj: 15 nalog)
- [ ] Modul 6: Polstavčne strukture in skladnja (pripravljeno: 1, odobreno: 1, cilj: 15 nalog)
- [ ] Modul 7: Slogovni registri in sopomenke (pripravljeno: 0, odobreno: 0, cilj: 15 nalog)

### Faza 4: Uporabniško testiranje, jezikovno brušenje in napredne funkcije (»Pika na i«)
- [ ] Testiranje uporabniške izkušnje z Aljono na telefonu
- [ ] Odprava morebitnih hroščev in optimizacija delovanja na mobilnih napravah
- [ ] **Način »Osredotočena vaja« (Dnevni kviz):** Način reševanja 10 naključnih nalog po korakih (ena naloga naenkrat) s končnim povzetkom uspešnosti *(Claude Code — v načrtu)*
- [ ] **Zvočna izgovorjava (Text-to-Speech):** Gumb z zvočnikom ob povedi za poslušanje naravne slovenske izgovorjave (`window.speechSynthesis` z `sl-SI`) *(Claude Code — v načrtu)*
- [ ] Končna jezikovna revizija vseh nalog in razlag *(Gemini)*

---

## 📚 Stanje tematskih modulov (Naloge C1)

| Šifra | Tematski modul | Načrtovano | Pripravljeno (Codex) | Odobreno (Gemini) |
| :--- | :--- | :---: | :---: | :---: |
| **MOD-01** | Vezljivost in predlogi | 15 | 15 | 15 ✅ |
| **MOD-02** | Rodilnik ob zanikanju | 15 | 15 | 15 ✅ |
| **MOD-03** | Frazeologija in pregovori | 20 | 10 | 10 |
| **MOD-04** | Glagolski vid | 15 | 0 | 0 |
| **MOD-05** | Dvojina in ujemanje | 15 | 1 | 1 |
| **MOD-06** | Skladnja in deležniki | 15 | 1 | 1 |
| **MOD-07** | Slog in sopomenke | 15 | 0 | 0 |
| **SKUPAJ** | | **110** | **42** | **42** |

---

## 📝 Dnevnik sprememb in aktivnosti (Changelog)

### [23. 11. 2026]
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
   - Gemini pripravi nabor nalog za novo poglavje (npr. MOD-04: Glagolski vid), Codex pa opravi tehnični in vsebinski recenzentski pregled!
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
