# 🧠 Obsidian Znanje in Arhitektura: Aljonina spletna vadnica slovenščine (C1)

Vstopna točka v projektno dokumentacijo in bazo znanja. Vsi agenti (DeepSeek/Gemini, Claude, Codex) obvezno berejo to datoteko pred začetkom dela.

---

## 📋 Kazalo vsebine
* [[01-ARHITEKTURA]] — Tehnični sklad, struktura projekta in ločevanje kode od vsebine.
* [[02-SLOVENSCINA]] — Jezikovna pravila, norme in smernice za Codex (slovnica, slog, oblike nalog).

---

## 📊 Trenutno stanje projekta
* **Status:** 🟢 V teku (Faza 3: baza 112 nalog; Faza 4: jezikovni pregled 49 novih B2 nalog, UX in uporabniško testiranje)
* **Obseg nalog:** 112 nalog pripravljenih: 88 B2 in 24 C1; vseh 7 kategorij ima najmanj 15 nalog; vse B2 razlage so poenostavljene in vsebujejo praktični zgled.
* **Tematski moduli:** MOD-01 do MOD-07 aktivni z B2/C1 filtri; vse kategorije imajo vsaj 15 nalog.
* **Spletni vmesnik (Claude Code):** Filter ravni B2 / C1 / Vse ter ločena gumba za ponastavitev posamezne naloge (pogojna vidnost) in trenutnega izbora (tudi v kvizu).
* **Lock datoteke:** Ni aktivnih lock datotek.

---

## 📝 Dnevnik dela (Work Log)
### [25. 11. 2026] — Claude Code (Pogojna vidnost gumba za ponastavitev)
* **Narejeno:** Gumb »↺ Ponastavi nalogo« je viden le, kadar ima naloga rezultat, osnutek odgovora ali odprto razlago (tudi sproti med tipkanjem in v kvizu); dodan `aria-label` z ID-jem naloge.
* **Spremenjene datoteke:** `src/main.ts` (+7/−1); lokalni commit `438da21`, brez `git push`.
* **Sanity check (DeepSeek):** git status/diff OK (samo `src/main.ts`), shema `naloge.json` OK (112 nalog, 0 podvojenih ID-jev, min 15/kategorijo), brez lock datotek, `npm run build` uspešen.

### [25. 11. 2026] — DeepSeek (Orkestrator: pravila, sanity check, dokumentacija)
* **Narejeno:** Enakopravna vloga orkestratorja DeepSeek ob Geminiju (model routing `deepseek-v4-flash` privzeto / `deepseek-v4-pro` za zahtevnejše odločitve, oznaka `[DeepSeek]`) in obvezni sanity check po vsakem delu Claude Code ali Codexa (git status/diff, shema `naloge.json`, lock datoteke, build).
* **Spremenjene datoteke:** `.clinerules`, `CLAUDE.md`, `AGENTS.md`, `brain/00-INDEX.md`, `NAVODILA.md`, `napredek.md`, `.gitignore`. Lokalni commit brez `git push`.
* **Naslednji korak:** Codex pregleda UI copy novih gumbov; Aljona preizkusi ponastavitev naloge in izbora na telefonu.

### [25. 11. 2026] — Claude Code (Ponastavitev naloge in izbora)
* **Narejeno:** Gumb »↺ Ponastavi nalogo« na vsaki kartici (pobriše rezultat, osnutek in razlago; v kvizu tudi segment na traku) in »↻ Ponastavi izbor (N)«, ki pobriše rezultate samo za trenutni izbor raven + kategorija + tip (ne glede na stikalo »samo nerešene«); dosegljiv tudi v kvizu.
* **Spremenjene datoteke:** `src/main.ts`; lokalni commit `e94bf18`. `npm run build` uspešen, testirano v Chromu (seznam in kviz).
* **Sanity check (DeepSeek):** git status/diff OK (samo `src/main.ts`), shema `naloge.json` OK (112 nalog, brez podvojenih ID-jev in manjkajočih polj), brez lock datotek, `tsc --noEmit` brez napak.

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
1. Po potrditvi uporabnika izvesti `git push origin main` za objavo novih gumbov na GitHub Pages.
2. Codex naj pregleda UI copy novih gumbov (»Ponastavi nalogo«, »Ponastavi izbor (N)« ter potrditvena besedila).
3. Aljona preizkusi ponastavitev posamezne naloge in izbora na telefonu.
