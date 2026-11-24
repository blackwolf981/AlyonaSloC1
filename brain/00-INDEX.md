# 🧠 Obsidian Znanje in Arhitektura: Aljonina spletna vadnica slovenščine (C1)

Vstopna točka v projektno dokumentacijo in bazo znanja. Vsi agenti (Gemini, Claude, Codex) obvezno berejo to datoteko pred začetkom dela.

---

## 📋 Kazalo vsebine
* [[01-ARHITEKTURA]] — Tehnični sklad, struktura projekta in ločevanje kode od vsebine.
* [[02-SLOVENSCINA]] — Jezikovna pravila, norme in smernice za Codex (slovnica, slog, oblike nalog).

---

## 📊 Trenutno stanje projekta
* **Status:** 🟢 V teku (Faza 3 & 4: Prehod na raven B2, poenostavitev razlag in razširitev baze uspešno zaključeni)
* **Obseg nalog:** 112 nalog pripravljenih: 88 B2 in 24 C1; vseh 7 kategorij ima najmanj 15 nalog; vse B2 razlage so poenostavljene in vsebujejo praktični zgled.
* **Tematski moduli:** MOD-01 do MOD-04 aktivni z B2/C1 filtri.
* **Spletni vmesnik (Claude Code):** Implementiran namenski B2 in C1 filter v UI.
* **Lock datoteke:** Ni aktivnih lock datotek.

---

## 📝 Dnevnik dela (Work Log)
### [25. 11. 2026] — Codex (Razširitev baze in poenostavitev razlag)
* **Narejeno:** Dodanih 44 novih B2 nalog; 27 razlag in 5 opozoril dodatno poenostavljenih; vseh 7 kategorij ima najmanj 15 nalog skupaj (skupno 112 nalog: 88 B2 / 24 C1).
* **Spremenjene datoteke:** `naloge.json`, `.ai-tasks/2-codex.md`. Uspešen build in UTF-8 validacija; lokalni commit `cf02d36`.
* **Naslednji korak:** Gemini posodobil `brain/00-INDEX.md` in izvedel `git push origin main` za objavo na GitHub Pages.

### [24. 11. 2026] — Codex (Poenostavitev B2 razlag)
* **Narejeno:** Poenostavljenih vseh 34 obstoječih B2 razlag na 1–2 kratki povedi s praktičnim zgledom. Dodanih pet B2 nalog: C1-VEZ-018, C1-ROD-017, C1-DVO-004, C1-SKL-003 in C1-VID-011. Skupaj 63 nalog (39 B2 / 24 C1).
* **Spremenjene datoteke:** `naloge.json`, `brain/00-INDEX.md` in lokalna `.ai-tasks/2-codex.md` z oznako `[OPRAVLJENO]`. Uspešni preverjanje UTF-8 brez BOM, sheme, ID-jev, vrzeli in odgovorov ter `npm run build`; obstoječe C1 naloge in vsa druga polja obstoječih B2 nalog so nespremenjeni.
* **Naslednji korak:** Aljona preizkusi razumljivost krajših razlag; Gemini opravi neodvisni pregled novih nalog. Lokalni commit brez `git push`; objavo izvede uporabnik.

### [24. 11. 2026] — Claude Code (Graditelj)
* **Narejeno:** Izbirnik ravni ima tretjo možnost »Samo C1« (B2 / C1 / Vse); na telefonu se besedilo gumbov prelomi v dve vrstici. Build OK, testirano v Chromu (namizje, 375 in 320 px).
* **Spremenjene datoteke:** `src/main.ts` (`BESEDILA_RAVEN.c1`, `ravenPreklop`), `src/style.css` (`.preklopnik-3`).
* **Naslednji korak:** Codex pregleda oznake `BESEDILA_RAVEN` (»B2 (jedro)« / »Samo C1« / »Vse ravni (B2+C1)« niso poimenovane enotno); objava z `git push` (Andrej).

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
