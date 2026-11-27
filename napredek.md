# 📊 NAPREDEK PROJEKTA: Aljonina spletna vadnica slovenščine (B2–C1)

**Zadnja posodobitev:** 27. november 2026  
**Vsebina in uredniški pregled:** Codex & Gemini/DeepSeek; **vmesnik:** Claude Code  
**Status projekta:** 🟡 V teku (Faza 3: vse kategorije ≥ 15 nalog; Faza 4: UX in jezikovni pregled novih B2 nalog)

---

## 🎯 Pregled stanja (Dashboard)

| Metrika | Vrednost | Cilj |
| :--- | :--- | :--- |
| **Nalog v bazi B2–C1** | `112 / 110` (88 B2, 24 C1) | `≥ 110` |
| **Vsebinsko potrjenih nalog** | `112 / 112` (88 B2, 24 C1; 49 novih B2 pregledanih 25. 11. 2026) | `112 / 112` |
| **Tematski moduli z nalogami** | `7 / 7` (vse kategorije vsaj 15 nalog ✅) | `7 / 7` |
| **Spletni vmesnik (Frontend)** | 🟢 Polno interaktivna vadnica + 🎯 Kviz + filter B2/C1 + ponastavitev naloge/izbora (pogojna vidnost) + prenovljena UI besedila | Delujoča interaktivna aplikacija |

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
- [x] Modul 1: Vezljivost glagolov in predložne zveze (19 nalog; cilj 15 presežen)
- [x] Modul 2: Rodilnik zanikanja in delni rodilnik (18 nalog; cilj 15 presežen)
- [x] Modul 3: Napredna frazeologija in idiomi (15 / 20 nalog; cilj modula še ni dosežen)
- [x] Modul 4: Glagolski vid in pomeni v kontekstu (15 / 15 nalog)
- [x] Modul 5: Dvojina in zahtevna ujemanja (15 / 15 nalog)
- [x] Modul 6: Polstavčne strukture in skladnja (15 / 15 nalog)
- [x] Modul 7: Slogovni registri in sopomenke (15 / 15 nalog)
- [x] Jezikovni pregled 49 novih B2 nalog (Codex; 21 popravljenih polj pri 18 nalogah; commit `1911aed`; sanity check DeepSeek OK)

### Faza 4: Uporabniško testiranje, jezikovno brušenje in napredne funkcije (»Pika na i«)
- [ ] Testiranje uporabniške izkušnje z Aljono na telefonu
- [ ] Odprava morebitnih hroščev in optimizacija delovanja na mobilnih napravah
- [x] **Način »Osredotočena vaja« (Dnevni kviz):** Način reševanja 10 naključnih nalog po korakih (ena naloga naenkrat) s končnim povzetkom uspešnosti *(Claude Code — implementirano v commitu de62611!)*
- [ ] **Zvočna izgovorjava (Text-to-Speech):** Gumb z zvočnikom ob povedi za poslušanje naravne slovenske izgovorjave (`window.speechSynthesis` z `sl-SI`) *(Claude Code — naslednji korak)*
- [ ] **Nov tip naloge `stavcni_puzzle` (»Sestavi poved«, B2):** učenka sestavi pravilno poved iz premešanih besed in ločil (kot puzzle) *(Codex — predlog natanko 5 stavkov v `predlogi-stavcni-puzzle.json`, 27. 11. 2026; Claude Code — podpora tipu v UI; vnos v `naloge.json` po objavi podpore)*
- [ ] Končna jezikovna revizija vseh nalog in razlag *(Codex; po novem dogovoru z uporabnikom)*

---

## 📚 Stanje tematskih modulov (Naloge B2–C1)

Raven določa obstoječe polje `raven`: dovoljeni vrednosti sta `B2` in `C1`. Claude naj filter in prikaz ravni veže na to polje, ne na predpono ID-ja. Obstoječi ID-ji ostajajo nespremenjeni zaradi shranjenega napredka uporabnice.

Razvrstitev je začetna uredniška ocena zahtevnosti posamezne naloge, ne uradna kalibracija SEJO. B2 vključuje vodeno uporabo vezav, oblik in običajnih frazemov; C1 vključuje povezovanje več slovničnih zahtev, razlikovanje dosega zanikanja, skladenjske pretvorbe ter presojo registra. Upoštevata se sobesedilo in pomoč v navodilu, ne le dolžina razlage. Po preizkusu z Aljono lahko raven prilagodimo.

| Šifra | Tematski modul (kategorija) | B2 | C1 | Skupaj | Cilj |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **MOD-01** | Vezljivost in predlogi (`vezljivost_in_predlogi`) | 13 | 6 | 19 | 15 |
| **MOD-02** | Rodilnik ob zanikanju (`rodilnik_zanikanja`) | 5 | 13 | 18 | 15 |
| **MOD-03** | Frazeologija in pregovori (`frazeologija_in_pregovori`) | 13 | 2 | 15 | 20 |
| **MOD-04** | Glagolski vid (`glagolski_vid`) | 14 | 1 | 15 | 15 |
| **MOD-05** | Dvojina in ujemanje (`dvojina`) | 14 | 1 | 15 | 15 |
| **MOD-06** | Skladnja in deležniki (`skladnja_in_slog`) | 14 | 1 | 15 | 15 |
| **MOD-07** | Slog in sopomenke (`slog_in_sopomenke`) | 15 | 0 | 15 | 15 |
| **SKUPAJ** | | **88** | **24** | **112** | **110+** |

---

## 📝 Dnevnik sprememb in aktivnosti (Changelog)
### [27. 11. 2026]
* **DeepSeek (Orkestrator, predaja Codexu):**
  - Opredeljen nov tip naloge `stavcni_puzzle` (v UI »Sestavi poved«, raven B2): učenka sestavi pravilno poved iz premešanih besed in ločil. Shema `naloge.json` ostaja nespremenjena — sestavine so v obstoječem polju `moznosti`, `kontekst` je prazen, končno ločilo ni sestavina.
  - V `.ai-tasks/2-codex.md` pripravljena naloga za Codex: predlog natanko 5 stavkov v novi datoteki `predlogi-stavcni-puzzle.json` — `C1-SKL-016` (naslonski niz), `C1-DVO-016` (dvojina), `C1-VID-016` (glagolski vid), `C1-FRA-016` (frazem), `C1-SLO-016` (slogovni register). Vsi ID-ji preverjeno prosti.
  - V `naloge.json` se predlog še ne vpisuje: vmesnik tipa še ne podpira, zato bi naloge delovale kot navadno besedilno polje. Vnos sledi po objavi podpore v UI (Claude Code).
  - Usklajena dokumentacija: `NAVODILA.md` (5. dovoljeni tip), `brain/02-SLOVENSCINA.md` (pravila za sestavine), `brain/00-INDEX.md`, `napredek.md`. Brez posegov v `src/` in `naloge.json`.

### [25. 11. 2026]
* **Claude Code (Frontend & UX):**
  - Dodan gumb »↺ Ponastavi nalogo« na vsako kartico: pobriše rezultat, vpisan odgovor in odprto razlago; v kvizu izprazni tudi segment na traku.
  - Gumb »Ponastavi« zamenjan z »↻ Ponastavi izbor (N)«: pobriše rezultate samo za trenutni izbor raven + kategorija + tip (stikalo »samo nerešene« ne vpliva), dosegljiv tudi v kvizu.
  - Uspešen `npm run build`, testirano v Chromu (seznam in kviz); lokalni commit `e94bf18` brez `git push`.
  - Gumb »↺ Ponastavi nalogo« je viden le ob rezultatu, osnutku ali odprti razlagi (sproti med tipkanjem, tudi v kvizu) in ima `aria-label` z ID-jem naloge; commit `438da21`, `npm run build` uspešen.
  - Sanity check orkestratorja (DeepSeek): spremenjen samo `src/main.ts`, shema `naloge.json` OK, brez lock datotek, build uspešen; 36 px na namizju je obstoječa velikost `.gumb-mali`, na telefonu ≥ 44 px.
* **DeepSeek (Orkestrator):**
  - Vzpostavljena enakopravna vloga orkestratorja ob Geminiju (model routing, oznaka `[DeepSeek]`) in obvezni sanity check po vsakem delu Claude Code ali Codexa.
  - Usklajeni `.clinerules`, `CLAUDE.md`, `AGENTS.md`, `NAVODILA.md`, `brain/00-INDEX.md`, `napredek.md` in `.gitignore`; dashboard osvežen na 112 nalog (88 B2 / 24 C1).
* **Codex (Vsebina & UI copy):**
  - Jezikovni pregled 49 novih B2 nalog: popravljenih 21 besedilnih polj pri 18 nalogah (`navodilo`, `slovnicna_razlaga`, `tipicna_napaka`); ID-ji, rešitve in metapodatki nespremenjeni; lokalni commit `1911aed` brez `git push`.
  - Pripravljeni predlogi UI besedil (izbirnik ravni, gumb »Ponastavi rezultate (N)«, opisi, `aria-label`, potrditvena sporočila) — v `src/` ni posegal.
  - Rešeno 25. 11. 2026: kratka kontrola petih B2 nalog iz commita `045f848` (VEZ-019, ROD-018, DVO-005, VID-012, SKL-004) — commit `00311d2`.
* **DeepSeek (Orkestrator):**
  - Sanity check: 18 nalog / 21 polj, samo dovoljena besedilna polja; shema OK (112 nalog: 88 B2 / 24 C1, enolični ID-ji, min 15/kategorijo); brez lock datotek; `npm run build` uspešen.
  - Pripravljena naloga za Claude Code v `.ai-tasks/1-claude.md`: prenos potrjenih UI predlogov v `src/main.ts`.
* **Claude Code (UI besedila):**
  - Prenesena potrjena Codexova besedila v `src/main.ts`: »Samo B2« / »Samo C1« / »Vse ravni (B2 in C1)«, nadnaslov »Ravni B2 in C1«, gumb »↻ Ponastavi rezultate (N)« z novim `title` in `aria-label`, potrditveno sporočilo z dodatkom za kviz, nov `title` gumba »Ponastavi nalogo«; logika nespremenjena; lokalni commit `7f047db` brez `git push`.
* **DeepSeek (Orkestrator):**
  - Sanity check #2: spremenjen samo `src/main.ts` (+18/−12; besedila in trije komentarji), shema `naloge.json` OK (112 nalog: 88 B2 / 24 C1, min 15/kategorijo), brez lock datotek, `npm run build` uspešen; v `index.html` in `src/style.css` ni ostankov starih nizov.
  - Objava: `git push origin main` (`8769961..63cecfa`, 8 commitov) → GitHub Actions deploy; na živo preverjeno, da stran streže nov paket `index-DhED8cZy.js` z novimi UI besedili.

* **Codex (Kratka kontrola petih B2 nalog iz `045f848`):**
  - Pregledanih natanko 5 nalog: novo navodilo in razlaga pri `C1-ROD-018`, novo navodilo pri `C1-VID-012`; `C1-VEZ-019`, `C1-DVO-005` in `C1-SKL-004` brez popravkov. 3 spremenjena besedilna polja; ID-ji, rešitve in metapodatki nespremenjeni; lokalni commit `00311d2` brez `git push`.
* **DeepSeek (Orkestrator):**
  - Sanity check: diff omejen na `navodilo` in `slovnicna_razlaga` pri ROD-018 ter `navodilo` pri VID-012; shema OK (112 nalog: 88 B2 / 24 C1, 0 podvojenih ID-jev, min 15/kategorijo); UTF-8 brez BOM; brez lock datotek; `npm run build` uspešen.
  - Mikro-popravek opravljen: v navodilu ROD-018 zveza `sodi za` zamenjana z `dopolnjuje` (commit `e941ff3`, 1 polje, sanity check ponovljen).
* **DeepSeek (Orkestrator, objava):**
  - Po potrditvi uporabnika `git push origin main` (`63cecfa..50313f6`, 6 commitov, fast-forward); živa stran po ~20 s streže `naloge.json`, ki je po SHA-256 enak lokalnemu `dist/naloge.json` (112 nalog, novi navodili ROD-018 in VID-012).

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
1. **Preizkus v brskalniku (Aljona / uporabnik):**
   - Izbirnik ravni, oba gumba za ponastavitev in potrditveno sporočilo (tudi v kvizu) na namizju in telefonu; lokalni predogled objave z `npm run preview`.
2. **Claude Code (Pika na i):**
   - Gumb za zvočno izgovorjavo povedi (TTS, `window.speechSynthesis` s `sl-SI`).
3. **Aljonin preizkus v živo:**
   - Preizkus ponastavitve posamezne naloge in izbora na telefonu: [https://blackwolf981.github.io/AlyonaSloC1/](https://blackwolf981.github.io/AlyonaSloC1/) (112 nalog v bazi).
   - Objava na GitHub Pages izvedena 25. 11. 2026 (`git push` → GitHub Actions; na živo preverjen nov paket `index-DhED8cZy.js`).

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
Isti seznam kot »Naslednji delovni sklop« zgoraj; stanje in dnevnik se vzdržujeta na enem mestu.
