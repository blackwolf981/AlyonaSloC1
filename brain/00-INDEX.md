# 🧠 Obsidian Znanje in Arhitektura: Aljonina spletna vadnica slovenščine (C1)

Vstopna točka v projektno dokumentacijo in bazo znanja. Vsi agenti (Gemini, Claude, Codex) obvezno berejo to datoteko pred začetkom dela.

---

## 📋 Kazalo vsebine
* [[01-ARHITEKTURA]] — Tehnični sklad, struktura projekta in ločevanje kode od vsebine.
* [[02-SLOVENSCINA]] — Jezikovna pravila, norme in smernice za Codex (slovnica, slog, oblike nalog).

---

## 📊 Trenutno stanje projekta
* **Status:** 🟢 V teku (Faza 3 & 4: Prehod na raven B2 in optimizacija UX uspešno izvedena)
* **Obseg nalog:** 50 / 110 nalog pripravljenih (z ustreznimi oznakami ravni B2 / C1).
* **Tematski moduli:** MOD-01 do MOD-04 aktivni z B2/C1 filtri.
* **Spletni vmesnik (Claude Code):** Implementiran namenski B2 filter v UI (commita ef53896 in baf5cc9).
* **Lock datoteke:** Ni aktivnih lock datotek.

---

## 📝 Dnevnik dela (Work Log)
### [24. 11. 2026] — Claude Code & Codex & Gemini
* **Claude Code:**
  - Dodal izpostavljen B2 filter v uporabniški vmesnik ter posodobil tipe za podporo ravni B2/C1 (ef53896).
* **Codex:**
  - Pregledal, prilagodil in označil obstoječe ter dodal nove B2 naloge v naloge.json (baf5cc9).
* **Gemini (Arhitekt & Vodja):**
  - Preveril stanje repozitorija (git status), potrdil odsotnost lock datotek ter posodobil brain/00-INDEX.md.
* **Spremenjene datoteke:**
  - brain/00-INDEX.md, src/ (Claude), naloge.json (Codex).
* **Naslednji korak:**
  - Uporabniško testiranje z Aljono na GitHub Pages (git push za objavo).

---

## 🎯 Naslednji logični korak
1. Izvesti git push origin main za osvežitev spletne strani na GitHub Pages.
2. Testiranje delovanja B2 filtra in nalog v živo na mobilni napravi.
