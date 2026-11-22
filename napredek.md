# 📊 NAPREDEK PROJEKTA: Aljonina spletna vadnica slovenščine (C1)

**Zadnja posodobitev:** 22. november 2026  
**Vodja projekta in urednik:** Gemini  
**Status projekta:** 🟡 V teku (Zagonska faza)

---

## 🎯 Pregled stanja (Dashboard)

| Metrika | Vrednost | Cilj |
| :--- | :--- | :--- |
| **Število potrjenih C1 nalog** | `7` | `100+` |
| **Tematski moduli z nalogami** | `5 / 7` | `7 / 7` |
| **Spletni vmesnik (Frontend)** | 🟢 Ogrodje & GitHub Pages pripravljeno | Delujoča interaktivna aplikacija |
| **Lektura in jezikovna potrditev** | 🟢 7 / 7 nalog potrjenih (100 %) | 100 % pregledanih nalog |

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
- [ ] Izdelava celovitega odzivnega vmesnika z interaktivnim reševanjem vseh 4 tipov nalog *(Claude Code)*
- [ ] Prikaz takojšnje povratne informacije, slovničnih razlag in tipičnih napak *(Claude Code)*
- [ ] Lokalno shranjevanje napredka (LocalStorage) in filtri po kategorijah *(Claude Code)*

### Faza 3: Širitev vsebinske baze C1
- [ ] Modul 1: Vezljivost glagolov in predložne zveze (trenutno: 2, cilj: 15 nalog)
- [ ] Modul 2: Rodilnik zanikanja in delni rodilnik (trenutno: 1, cilj: 15 nalog)
- [ ] Modul 3: Napredna frazeologija in idiomi (trenutno: 2, cilj: 20 nalog)
- [ ] Modul 4: Glagolski vid in pomeni v kontekstu (trenutno: 0, cilj: 15 nalog)
- [ ] Modul 5: Dvojina in zahtevna ujemanja (trenutno: 1, cilj: 15 nalog)
- [ ] Modul 6: Polstavčne strukture in skladnja (trenutno: 1, cilj: 15 nalog)
- [ ] Modul 7: Slogovni registri in sopomenke (trenutno: 0, cilj: 15 nalog)

### Faza 4: Uporabniško testiranje in jezikovno brušenje
- [ ] Testiranje uporabniške izkušnje z Aljono
- [ ] Odprava morebitnih hroščev in optimizacija delovanja na mobilnih napravah
- [ ] Končna jezikovna revizija vseh nalog in razlag *(Gemini)*

---

## 📚 Stanje tematskih modulov (Naloge C1)

| Šifra | Tematski modul | Načrtovano | Pripravljeno (Codex) | Odobreno (Gemini) |
| :--- | :--- | :---: | :---: | :---: |
| **MOD-01** | Vezljivost in predlogi | 15 | 2 | 2 |
| **MOD-02** | Rodilnik ob zanikanju | 15 | 1 | 1 |
| **MOD-03** | Frazeologija in pregovori | 20 | 2 | 2 |
| **MOD-04** | Glagolski vid | 15 | 0 | 0 |
| **MOD-05** | Dvojina in ujemanje | 15 | 1 | 1 |
| **MOD-06** | Skladnja in deležniki | 15 | 1 | 1 |
| **MOD-07** | Slog in sopomenke | 15 | 0 | 0 |
| **SKUPAJ** | | **110** | **7** | **7** |

---

## 📝 Dnevnik sprememb in aktivnosti (Changelog)

### [22. 11. 2026]
* **Gemini (Vodja projekta in urednik):** 
  - Uradni zagon projekta.
  - Sestavljena datoteka `NAVODILA.md` z določenimi pravili sodelovanja za Gemini, Codex in Claude Code ter JSON shemo.
  - Vzpostavljena datoteka `napredek.md` za sledenje ciljem in fazam.
  - Pregledanih in odobrenih prvih 7 pilotnih nalog v `naloge.json`. Slovnična ustreznost, didaktična struktura in razlage ocenjene z odlično oceno.
* **Codex / ChatGPT (Vsebina):**
  - Izdelana začetna datoteka `naloge.json` s 7 pilotnimi nalogami C1 (vezljivost, rodilnik zanikanja, frazeologija, dvojina mešanega osebka, skladenjski deležijski polstavek).
* **Claude Code (Arhitekt & Frontend):**
  - Postavljeno ogrodje Vite + TypeScript + Tailwind CSS v4 (`index.html`, `src/`, `vite.config.ts`).
  - `base: './'`: relativne poti, pripravljeno za GitHub Pages podmapo `/AlyonaSloC1/`.
  - Avtomatiziran build test s preverjanjem veljavnosti `naloge.json` ob buildu.
  - Dodani `.gitignore`, `.github/workflows/deploy.yml` (CI/CD za avtomatsko objavo) in `README.md`.
  - Repozitorij uspešno povezan z GitHubom (`blackwolf981/AlyonaSloC1`), opravljen prvi push na vejo `main`.

---

## 🔜 Naslednji takojšnji koraki
1. Predati prvi ukaz agentu **Codex / ChatGPT** za generiranje pilotne baze nalog (`naloge.json`).
2. **Gemini** opravi slovnični pregled generiranih nalog v `naloge.json`.
3. Predati nalogo agentu **Claude Code** za pripravo ogrodja spletne strani.
