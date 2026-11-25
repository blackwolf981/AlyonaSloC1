# 🧠 Obsidian Znanje in Arhitektura: Aljonina spletna vadnica slovenščine (C1)

Vstopna točka v projektno dokumentacijo in bazo znanja. Vsi agenti (DeepSeek/Gemini, Claude, Codex) obvezno berejo to datoteko pred začetkom dela.

---

## 📋 Kazalo vsebine
* [[01-ARHITEKTURA]] — Tehnični sklad, struktura projekta in ločevanje kode od vsebine.
* [[02-SLOVENSCINA]] — Jezikovna pravila, norme in smernice za Codex (slovnica, slog, oblike nalog).

---

## 📊 Trenutno stanje projekta
* **Status:** 🟢 Objavljeno (Faza 3 zaključena: 112 nalog, vseh 49 novih B2 jezikovno pregledanih; Faza 4: UI besedila objavljena na GitHub Pages 25. 11. 2026, čaka UX preizkus)
* **Obseg nalog:** 112 nalog pripravljenih: 88 B2 in 24 C1; vseh 7 kategorij ima najmanj 15 nalog; vse B2 razlage so poenostavljene in vsebujejo praktični zgled; vseh 112 nalog je vsebinsko pregledanih.
* **Tematski moduli:** MOD-01 do MOD-07 aktivni z B2/C1 filtri; vse kategorije imajo vsaj 15 nalog.
* **Spletni vmesnik (Claude Code):** Izbirnik ravni »Samo B2« / »Samo C1« / »Vse ravni (B2 in C1)«, ločena gumba za ponastavitev posamezne naloge (pogojna vidnost) in trenutnega izbora »↻ Ponastavi rezultate (N)« (tudi v kvizu) z novimi opisi in `aria-label`.
* **Lock datoteke:** Ni aktivnih lock datotek.

---

## 📝 Dnevnik dela (Work Log)
### [25. 11. 2026] — Codex (Kratka kontrola petih B2 nalog iz commita `045f848`)
* **Narejeno:** Pregledanih natanko pet B2 nalog iz commita `045f848`. Novo navodilo in razlaga pri `C1-ROD-018`, novo navodilo pri `C1-VID-012`; `C1-VEZ-019`, `C1-DVO-005` in `C1-SKL-004` po pregledu brez popravkov. Skupaj 3 spremenjena besedilna polja; ID-ji, rešitve in metapodatki nespremenjeni.
* **Spremenjene datoteke:** `naloge.json` (3 vrstice); lokalni commit `00311d2`, brez `git push`.
* **Sanity check (DeepSeek):** git status čist, diff omejen na `C1-ROD-018` (`navodilo`, `slovnicna_razlaga`) in `C1-VID-012` (`navodilo`); shema OK (112 nalog: 88 B2 / 24 C1, 0 podvojenih ID-jev, 0 manjkajočih polj, min 15/kategorijo); UTF-8 brez BOM; brez lock datotek; `npm run build` uspešen (131 ms, paket `index-DhED8cZy.js` nespremenjen).
* **Opomba:** v novem navodilu `C1-ROD-018` zveza `sodi za` ni knjižna; predlog za naslednji vsebinski obhod je `sodi k` oziroma `dopolnjuje`. Vsebina naloge in rešitve sta pravilni.

### [25. 11. 2026] — DeepSeek (Objava na GitHub Pages)
* **Narejeno:** Po izrecni potrditvi uporabnika izveden `git push origin main` (`8769961..63cecfa`, 8 commitov); GitHub Actions (`deploy.yml`) je objavil novo različico.
* **Preverjeno na živo:** https://blackwolf981.github.io/AlyonaSloC1/ streže nov paket `./assets/index-DhED8cZy.js`; v njem so nizi »Ponastavi rezultate«, »Samo B2«, »Vse ravni (B2 in C1)« in »Ravni B2 in C1«, starega »Ponastavi izbor« ni več.
* **Opomba:** `gh` CLI ni prijavljen (brez `GH_TOKEN`), zato je bila objava preverjena neposredno prek HTTP in ne prek `gh run list`.

### [25. 11. 2026] — Claude Code (UI besedila po jezikovnem pregledu)
* **Narejeno:** Preneseni potrjeni predlogi Codexa v `src/main.ts`: izbirnik ravni »Samo B2« / »Samo C1« / »Vse ravni (B2 in C1)« z nadnaslovom »Ravni B2 in C1«; gumb »↻ Ponastavi rezultate (N)« z novim `title` in `aria-label`; potrditveno sporočilo z obrazložitvijo filtra in dodatkom za kviz; nov `title` gumba »Ponastavi nalogo«. Posodobljeni tudi trije komentarji v kodi; logika in stanja nespremenjeni.
* **Spremenjene datoteke:** `src/main.ts` (+18/−12); lokalni commit `7f047db`, brez `git push`.
* **Sanity check (DeepSeek):** git status/diff OK (samo `src/main.ts`, samo besedilni nizi in komentarji), shema `naloge.json` OK (112 nalog: 88 B2 / 24 C1, 0 podvojenih ID-jev, min 15/kategorijo), brez lock datotek, `npm run build` uspešen; v `index.html` in `src/style.css` ni ostankov starih nizov.
* **Opomba:** v brskalniku ni testirano (Claude); najdaljši možen `aria-label` meri ~115 znakov, torej znotraj dogovorjene meje.

### [25. 11. 2026] — Codex (Jezikovni pregled 49 novih B2 nalog in predlogi UI besedil)
* **Narejeno:** Pregledanih 49 novih B2 nalog (dopolnitev seznama s petimi nalogami iz dnevnika 24. 11. + FRA-011–015, VID-013–015, DVO-006–015, SKL-005–015, SLO-001–015); popravljenih 21 besedilnih polj pri 18 nalogah (`navodilo`, `slovnicna_razlaga`, `tipicna_napaka`), ID-ji, rešitve in metapodatki nespremenjeni. Pripravljeni predlogi novih UI besedil (izbirnik ravni, »Ponastavi rezultate (N)«, opisi, `aria-label`, potrditvena sporočila); v `src/` ni posegal.
* **Spremenjene datoteke:** `naloge.json`, `.ai-tasks/2-codex.md`; lokalni commit `1911aed`, brez `git push`.
* **Sanity check (DeepSeek):** git status/diff OK (18 nalog / 21 polj, samo dovoljena besedilna polja), shema `naloge.json` OK (112 nalog: 88 B2 / 24 C1, 0 podvojenih ID-jev, 0 manjkajočih polj, min 15/kategorijo), brez lock datotek, `npm run build` uspešen.
* **Odprto vprašanje:** v seznamu pregledanih nalog ni petih B2 nalog iz commita `045f848` (VEZ-019, ROD-018, DVO-005, VID-012, SKL-004); priporočena kratka dodatna kontrola. Kratka kontrola izvedena 25. 11. 2026 (`00311d2`, glej novejši vnos zgoraj).

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
1. Aljona preizkusi objavljeno različico na telefonu in namizju: izbirnik ravni, oba gumba za ponastavitev, potrditveno sporočilo in prelom gumbov.
2. Claude Code: gumb za zvočno izgovorjavo povedi (TTS, `window.speechSynthesis` s `sl-SI`).
3. Zaključeno 25. 11. 2026: kratka kontrola petih B2 nalog iz commita `045f848` (VEZ-019, ROD-018, DVO-005, VID-012, SKL-004) — commit `00311d2`; odprt le mikro-popravek zveze `sodi za` v navodilu ROD-018.
