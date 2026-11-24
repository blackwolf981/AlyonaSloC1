# 🧠 Obsidian Znanje in Arhitektura: Aljonina spletna vadnica slovenščine (C1)

Vstopna točka v projektno dokumentacijo in bazo znanja. Vsi agenti (Gemini, Claude, Codex) obvezno berejo to datoteko pred začetkom dela.

---

## 📋 Kazalo vsebine
* [[01-ARHITEKTURA]] — Tehnični sklad, struktura projekta in ločevanje kode od vsebine.
* [[02-SLOVENSCINA]] — Jezikovna pravila, norme in smernice za Codex (slovnica, slog, oblike nalog).

---

## 📊 Trenutno stanje projekta
* **Status:** 🟡 V teku (Faza 3: iritev vsebinske baze in optimizacija UX)
* **Obseg nalog:** 58 / 110 nalog pripravljenih: 34 B2 in 24 C1. Zadnjih 8 B2 nalog je pripravil in pregledal Codex; čakajo na neodvisni uredniški pregled.
* **Tematski moduli:** MOD-01: 17, MOD-02: 16, MOD-03: 10, MOD-04: 10, MOD-05: 3, MOD-06: 2, MOD-07: 0. Razširitev B2 presega prvotni količinski cilj prvih dveh modulov.
* **Spletni vmesnik (Claude Code):** Polno delujoč odziven vmesnik na GitHub Pages z lokalnim shranjevanjem napredka, filtri in novim načinom »Osredotočena vaja« (kviz).

---

## 📝 Dnevnik dela (Work Log)
### [24. 11. 2026] — Codex (B2 pregled in nove naloge)
* **Narejeno:** Pregledanih 50 obstoječih nalog; ohranjena uredniška razvrstitev 26 B2 / 24 C1 glede na zahtevnost reševanja in pomoč v navodilih. Dodanih 8 izvirnih B2 nalog: C1-VID-009–010, C1-DVO-002–003, C1-VEZ-016–017, C1-ROD-016 in C1-SKL-002 (po dve vsakega tipa). Raven določa polje `raven`, ne zgodovinska predpona ID-ja. Skupaj 34 B2 / 24 C1.
* **Spremenjene datoteke:** `naloge.json`, `brain/00-INDEX.md`, `.ai-tasks/2-codex.md` (lokalna oznaka `[OPRAVLJENO]`). Preverjeni UTF-8 brez BOM, shema, enoličnost ID-jev, vrzeli, odgovori in ohranitev prvotnih 50 nalog; uspešen `npm run build`.
* **Naslednji korak:** Gemini naj pregleda nove vsebine in začetno razvrstitev B2/C1; Claude naj preveri prikaz 34 B2 nalog. Lokalna `.ai-tasks/` je izključena iz Gita; brez potiskanja na oddaljeni repozitorij. UI besedila ostajajo za ločen jezikovni pregled.

### [24. 11. 2026] — Claude Code (Graditelj)
* **Narejeno:** Tip `Raven = 'B2' | 'C1'` (polje `raven`), izpostavljen izbirnik »B2 (jedro) / Vse ravni (B2+C1)« v glavi (velja za seznam in kviz, izbira se zapomni), značka ravni na kartici, statistika in števci po izbrani ravni. Filter temelji samo na `raven`, ne na predponi ID-ja. Testirano v Chromu (namizje, 375 in 320 px).
* **Spremenjene datoteke:** `src/types.ts`, `src/main.ts`, `src/style.css`.
* **Naslednji korak:** Codex naj pregleda nadomestna UI besedila v `BESEDILA_RAVEN` (`src/main.ts`) in podnaslov glave (še omenja »za napredne«); Gemini naj odobri in objavi (`naloge.json` z ravnmi B2 še ni commitan, zato je na živi strani zaenkrat vse C1).

### [24. 11. 2026] — Gemini (Arhitekt & Vodja)
* **Narejeno:**
  - Pregledana celotna projektna struktura, NAVODILA.md, napredek.md in obstoječa koda.
  - Vzpostavljena arhitekturna dokumentacija v brain/01-ARHITEKTURA.md in brain/02-SLOVENSCINA.md.
  - Posodobljen krovni kazalnik in dnevnik v brain/00-INDEX.md.
* **Spremenjene datoteke:**
  - brain/00-INDEX.md, brain/01-ARHITEKTURA.md, brain/02-SLOVENSCINA.md.
* **Naslednji korak:**
  - Priprava operativnih navodil v .ai-tasks/1-claude.md in .ai-tasks/2-codex.md za naslednji delovni cikel (zvočna izgovorjava TTS za Claude in revizija MOD-04 za Codex/Gemini).

---

## 🎯 Naslednji logični korak
1. Pripraviti naloge v .ai-tasks/1-claude.md za Claude Code (implementacija TTS / zvočne izgovorjave).
2. Pripraviti naloge v .ai-tasks/2-codex.md za Codex (dokončanje preostalih nalog v MOD-04 in MOD-03).
