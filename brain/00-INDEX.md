# 🧠 Obsidian Znanje in Arhitektura: Aljonina spletna vadnica slovenščine (C1)

Vstopna točka v projektno dokumentacijo in bazo znanja. Vsi agenti (DeepSeek/Gemini, Claude, Codex) obvezno berejo to datoteko pred začetkom dela.

---

## 📋 Kazalo vsebine
* [[01-ARHITEKTURA]] — Tehnični sklad, struktura projekta in ločevanje kode od vsebine.
* [[02-SLOVENSCINA]] — Jezikovna pravila, norme in smernice za Codex (slovnica, slog, oblike nalog).

---

## 📊 Trenutno stanje projekta
* **Status:** 🟢 Objavljeno (Faza 3 zaključena: vseh 112 nalog jezikovno pregledanih, vključno s petimi iz commita `045f848`; Faza 4: UI besedila in vsebinski popravki objavljeni na GitHub Pages 25. 11. 2026; **27. 11. 2026 objavljenih 117 nalog** — 5 sestavljank `stavcni_puzzle` + dostopnostni popravek, paket `index-C-COV7AK.js`)
* **Obseg nalog:** 117 nalog pripravljenih: 93 B2 in 24 C1; vseh 7 kategorij ima najmanj **16** nalog; vse B2 razlage so poenostavljene in vsebujejo praktični zgled; vseh 117 nalog je vsebinsko pregledanih.
* **Tematski moduli:** MOD-01 do MOD-07 aktivni z B2/C1 filtri; vse kategorije imajo vsaj **16** nalog.
* **Nov tip naloge `stavcni_puzzle` (v UI »Sestavi poved«, raven B2):** učenka sestavi poved iz premešanih besed in ločil. Podpora v vmesniku (`063a834`), **5 nalog v bazi** (`b5f2087`): `C1-SKL-016`, `C1-DVO-016`, `C1-VID-016`, `C1-FRA-016`, `C1-SLO-016`; dostopnost urejena z enim živim območjem (`p.sr-only`, `19d5e4c`).
* **Spletni vmesnik (Claude Code):** Izbirnik ravni »Samo B2« / »Samo C1« / »Vse ravni (B2 in C1)«, ločena gumba za ponastavitev posamezne naloge (pogojna vidnost) in trenutnega izbora »↻ Ponastavi rezultate (N)« (tudi v kvizu) z novimi opisi in `aria-label`; tip `stavcni_puzzle` s sestavinami kot gumbi (dotik doda/odstrani), brez povleci-in-spusti.
* **Lock datoteke:** Ni aktivnih lock datotek.

---

## 📝 Dnevnik dela (Work Log)
### [27. 11. 2026] — DeepSeek (Objava na GitHub Pages — 117 nalog + dostopnostni popravek)
* **Narejeno:** Po izrecni potrditvi uporabnika izveden `git push origin main` (7 commitov: `063a834`, `aeeb8de`, `b5f2087`, `dc7494d`, `49a4301`, `19d5e4c`, `4fc049c`); `origin/main` = `4fc049c`.
* **Objava preverjena na živo:** GitHub Actions je objavil nov paket `index-C-COV7AK.js` + `index-B-68-mKZ.css` (prejšnji `index-DhED8cZy.js`); v paketu je novi niz `Trenutna poved je prazna.`
* **Preizkus objavljene strani (glava Chrome nad `https://blackwolf981.github.io/AlyonaSloC1/`):** **117 kartic**, **5** kartic »Sestavi poved«, **5×** `p.sr-only[role="status"]`, **0** `role` na `.sestavljeno`; na strežniku `naloge.json` ima **117 nalog** (93 B2 / 24 C1), vseh 5 novih ID-jev (`C1-SKL-016`, `C1-DVO-016`, `C1-VID-016`, `C1-FRA-016`, `C1-SLO-016`) po enkrat.
* **Spremenjene datoteke:** `brain/00-INDEX.md`, `napredek.md` (lokalni commit dokumentacije; objava tega commita še ni izvedena).
* **Naslednji korak:** Aljonin preizkus na telefonu; neobvezno trajno živo območje, če bralnik zaslona ne prebere sestavljene povedi.
### [27. 11. 2026] — DeepSeek (Sanity check mikro popravka dostopnosti — `19d5e4c`)
* **Narejeno:** Preverjeno Claudeovo delo: spremenjena samo `src/main.ts` (+4 / −2, natanko predpisani dve vrstici); `.sestavljeno` nima več `role="status"`/`aria-live` (vsebuje gumbe), `p.sr-only` je edino in **vedno** izrisano živo območje (`Trenutna poved je prazna.` pri praznem izboru). `naloge.json` in `src/style.css` nespremenjena, delovno drevo čisto.
* **Shema + build:** 117 nalog, 0 podvojenih ID-jev, 0 manjkajočih polj, min 16/kategorijo; brez lock datotek; `npm run build` uspešen (131 ms); nov niz `Trenutna poved je prazna.` je v novo zgrajenem paketu.
* **Neodvisni preizkus v brskalniku:** `vite preview` + glava Chrome nad zgrajeno aplikacijo — **5×** `class="sestavljeno"` **brez** `role`, **5×** `<p class="sr-only" role="status" aria-live="polite">Trenutna poved je prazna.</p>`, **0** preostalih `aria-live` na `.sestavljeno`. Interaktivna vsebina torej ni več v živem območju.
* **Znano in sprejeto (Claudeovo opozorilo):** `osveziKartico` zamenja kartico prek `outerHTML`, zato je živo območje ob vsakem kliku **novo vozlišče**; bralniki zaslona ga v praksi pogosto preberejo, a to ni zajamčeno (zlasti VoiceOver/TalkBack na telefonu). Stanje je kljub temu strogo boljše kot prej (prej je bilo isto + neveljavna interaktivna vsebina v `role="status"`). Trajna rešitev, če bo preizkus z bralnikom pokazal tišino: **eno stalno** `div.sr-only[role="status"]` zunaj kartice (npr. ob `#vsebina`) in `oznani(...)` v treh vejah dejanj, hkrati **brez** odstavka v kartici (da ne pride do dvojnega branja).
* **Spremenjene datoteke:** `brain/00-INDEX.md`, `napredek.md`.
* **Naslednji korak:** objava po izrecni potrditvi uporabnika (neobjavljeni: `063a834`, `aeeb8de`, `b5f2087`, `dc7494d`, `49a4301`, `19d5e4c`).
### [27. 11. 2026] — DeepSeek (Sanity check vnosa 5 nalog `stavcni_puzzle` v bazo)
* **Narejeno:** Preverjen Codexov vnos (`b5f2087`): spremenjena samo `naloge.json` (+75 vrstic, 0 izbrisov) in `.ai-tasks/2-codex.md`, `predlogi-stavcni-puzzle.json` izbrisan. Prvih 112 nalog je JSON-identičnih prejšnji različici in v istem vrstnem redu; vseh 5 novih objektov je **1:1** s predlogom iz commita `2621eed` (13 polj, enak vrstni red polj, nobenega mikro-popravka).
* **Shema:** 117 nalog (93 B2 / 24 C1), 0 podvojenih ID-jev, 0 manjkajočih polj, min **16**/kategorijo (prej 15 — vseh pet kategorij se je dvignilo na 16; Codexova opomba je pravilna), UTF-8 brez BOM, brez lock datotek, `npm run build` uspešen (134 ms).
* **Preverjanje rešljivosti:** s prepisom `normaliziraj` iz `src/preverjanje.ts` preverjeno, da vmesnikov osnutek (sestavine, ločene s presledki, npr. `… mu , da …`) ustreza vsem 7 sprejemljivim odgovorom (5 nalog; VID, FRA in SLO imajo po 2). Vseh 5 nalog ima 7–9 sestavin, prazen `kontekst`, končno ločilo samo v rešitvi.
* **Neodvisni preizkus v brskalniku:** `vite preview` + glava Chrome (`--dump-dom`) nad zgrajeno aplikacijo z novo bazo — 5 kartic »Sestavi poved«, 39 gumbov sestavin, 5 blokov »Vaša poved« v praznem stanju, filter »Sestavi poved« s števcem 5.
* **Spremenjene datoteke:** `brain/00-INDEX.md`, `napredek.md` (dashboard 117 nalog, tabela modulov, checklist, changelog).
* **Naslednji korak:** objava (`git push origin main`) šele po izrecni potrditvi uporabnika; nato Aljonin preizkus sestavljank na telefonu. Odprta neblokirajoča opomba: podvojen `aria-live` pri sestavljeni povedi (glej vnos zgoraj).
### [27. 11. 2026] — DeepSeek (Sanity check UI podpore `stavcni_puzzle` in predaja Codexu)
* **Narejeno:** Preverjeno Claudeovo delo (`063a834`): spremenjene samo `src/types.ts`, `src/main.ts`, `src/style.css` (+130 / −9 vrstic), `naloge.json` nespremenjen (112 nalog, 13 polj, 0 podvojenih ID-jev, min 15/kategorijo), ni lock datotek, `npm run build` uspešen.
* **Neodvisno preverjanje v brskalniku:** 5 predlogov začasno združenih v `naloge.json`, zgrajeno, postreženo z `vite preview` in izpisan DOM z glavo Chrome (`--headless --dump-dom`). Izid: 5 kartic »Sestavi poved«, 5 blokov »Vaša poved« v praznem stanju, **39 gumbov sestavin** (8+7+7+8+9, natanko kot v predlogu), 5 namigov, filter »Sestavi poved« s števcem 5; »Preveri« je ob praznem sestavljanju onemogočen, »Počisti« se prikaže šele ob izbiri. Po preizkusu je bil `naloge.json` obnovljen in s `git diff --quiet` potrjen kot nespremenjen (tudi `dist/` je znova zgrajen z originalno bazo).
* **Spremenjene datoteke:** `.ai-tasks/2-codex.md` (nova naloga: vnos 5 nalog v bazo), `brain/00-INDEX.md`, `napredek.md`.
* **Opomba (ne blokira):** `aria-live`/`role="status"` je na vsebniku sestavljene povedi, ki vsebuje tudi gumbe, obenem pa je dodan `sr-only` odstavek s celotno povedjo; za bralnike zaslona bi zadoščal samo eden. Priporočilo za kasnejši mikro-popravek: obdržati `sr-only` odstavek, z gumbov odstraniti `role="status"`.
* **Naslednji korak:** Codex vnese 5 potrjenih nalog v `naloge.json` in izbriše `predlogi-stavcni-puzzle.json`; nato končni sanity check in dnevnik; objava (`git push`) samo po izrecni potrditvi uporabnika.
### [27. 11. 2026] — DeepSeek (Sanity check predloga `stavcni_puzzle` in predaja Claude Code)
* **Narejeno:** Pregledan Codexov predlog (`2621eed`, `predlogi-stavcni-puzzle.json`): 5 nalog (`C1-SKL-016`, `C1-DVO-016`, `C1-VID-016`, `C1-FRA-016`, `C1-SLO-016`), vsaka s 13 polji, po 7–9 sestavin, brez presledkov znotraj sestavin, brez končnega ločila med sestavinami, vsaka sestavina uporabljena natanko enkrat (množično ujemanje z `pravilni_odgovor` in vsemi alternativami), prve tri sestavine niso začetek rešitve, veljaven UTF-8 brez BOM. V `naloge.json` ni poseženo (112 nalog, 0 podvojenih ID-jev); vseh pet novih ID-jev je prostih.
* **Spremenjene datoteke:** `.ai-tasks/1-claude.md` (nova naloga: podpora tipu `stavcni_puzzle` v vmesniku), `brain/00-INDEX.md`.
* **Opomba:** Codex sam opozarja na omejitev formata pri VID in SLO — ker je treba uporabiti vse sestavine, ni odvečnih variant, zato povedi utrjujeta rabo ponujenih oblik in ne preverjata samostojne izbire vida oziroma sopomenke. Za ta tip je to pričakovano; samostojno izbiro še naprej pokrivata `izbira` in `vnos`.
* **Naslednji korak:** Claude Code doda podporo tipu (`src/types.ts`, `src/main.ts`, `src/style.css`); po objavi podpore Codex vnese 5 nalog v `naloge.json`.
### [27. 11. 2026] — DeepSeek (Predaja novega tipa naloge `stavcni_puzzle` Codexu)
* **Narejeno:** Opredeljen nov tip naloge `stavcni_puzzle` (v UI »Sestavi poved«): učenka iz premešanih besed in ločil sestavi pravilno poved. Shema ostaja nespremenjena — sestavine so v obstoječem polju `moznosti`, `kontekst` je prazen, končno ločilo ni sestavina. Pripravljena navodila v `.ai-tasks/2-codex.md` za predlog natanko 5 stavkov (B2) v novi datoteki `predlogi-stavcni-puzzle.json`: `C1-SKL-016` (naslonski niz), `C1-DVO-016` (dvojina), `C1-VID-016` (glagolski vid), `C1-FRA-016` (frazem), `C1-SLO-016` (register). Preverjeno, da so vsi ID-ji prosti.
* **Zakaj predlog in ne takojšnji vnos v `naloge.json`:** vmesnik tipa še ne podpira, zato bi se naloge prikazale kot navodno besedilno polje in bi jih bilo mogoče rešiti s prepisovanjem. Vnos v bazo sledi po objavi podpore v UI.
* **Spremenjene datoteke:** `.ai-tasks/2-codex.md`, `NAVODILA.md` (5. dovoljeni tip), `brain/02-SLOVENSCINA.md` (pravila za sestavine), `brain/00-INDEX.md`, `napredek.md`.
* **Naslednji korak:** Codex pripravi predlog; nato Claude Code doda podporo tipu; šele zatem vnos v `naloge.json`.
### [25. 11. 2026] — DeepSeek (Objava popravkov ROD-018 in VID-012)
* **Narejeno:** Po izrecni potrditvi uporabnika izveden `git push origin main` (`63cecfa..50313f6`, 6 commitov, fast-forward, brez force).
* **Preverjeno na živo:** https://blackwolf981.github.io/AlyonaSloC1/naloge.json je po ~20 s enak lokalnemu `dist/naloge.json` (SHA-256 `98e357e8…`, 112 nalog); navodili `C1-ROD-018` (nova zveza `dopolnjuje »nimamo«`) in `C1-VID-012` (sklic na `besedo »nehali«`) sta novi, starih nizov ni več. Paket `index-DhED8cZy.js` in `index-DHzShGcO.css` nespremenjen, ker se JS/CSS nista spreminjala.
* **Opomba:** prvi HTTP test je bil lažno pozitiven (beseda `dopolnjuje` se pojavi tudi v drugi nalogi), zato je bilo preverjanje ponovljeno z natančnima nizoma in s primerjavo SHA-256.

### [25. 11. 2026] — Codex (Kratka kontrola petih B2 nalog iz commita `045f848`)
* **Narejeno:** Pregledanih natanko pet B2 nalog iz commita `045f848`. Novo navodilo in razlaga pri `C1-ROD-018`, novo navodilo pri `C1-VID-012`; `C1-VEZ-019`, `C1-DVO-005` in `C1-SKL-004` po pregledu brez popravkov. Skupaj 3 spremenjena besedilna polja; ID-ji, rešitve in metapodatki nespremenjeni.
* **Spremenjene datoteke:** `naloge.json` (3 vrstice); lokalni commit `00311d2`, brez `git push`.
* **Sanity check (DeepSeek):** git status čist, diff omejen na `C1-ROD-018` (`navodilo`, `slovnicna_razlaga`) in `C1-VID-012` (`navodilo`); shema OK (112 nalog: 88 B2 / 24 C1, 0 podvojenih ID-jev, 0 manjkajočih polj, min 15/kategorijo); UTF-8 brez BOM; brez lock datotek; `npm run build` uspešen (131 ms, paket `index-DhED8cZy.js` nespremenjen).
* **Opomba:** v navodilu `C1-ROD-018` je bila zveza `sodi za` neknjižna; Codex jo je v mikro-popravku zamenjal z `dopolnjuje` (commit `e941ff3`, 1 polje, sanity check ponovljen).

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
1. **Codex — opravljeno 27. 11. 2026** (`2621eed`, `b5f2087`): predlog 5 nalog tipa `stavcni_puzzle`, nato vnos 1:1 v `naloge.json` (117 nalog) in izbris predloga; sanity check orkestratorja uspešen.
2. **Claude Code — opravljeno 27. 11. 2026** (`063a834`): podpora tipu `stavcni_puzzle` v vmesniku (`TipNaloge` in `TIPI` »Sestavi poved«, veja v `odgovorHtml`, čiščenje stanja ob ponastavitvi, brez prikaza `kontekst`, povzetek kviza, razredi v `style.css`); sanity check in neodvisni preizkus v brskalniku uspešna.
3. **DeepSeek — opravljeno 27. 11. 2026** (`dc7494d`, `49a4301`): dokumentacija usklajena (117 nalog, tabela modulov, checklist, changelog) in pripravljena navodila za mikro popravek dostopnosti.
4. **Claude Code — opravljeno 27. 11. 2026** (`19d5e4c`): eno samo živo območje — `role="status"` odstranjen z `.sestavljeno` (vsebuje gumbe), `p.sr-only` se izriše vedno; sanity check in preizkus v brskalniku uspešna (5/5 kartic). Odprto le, če bralnik zaslona ne prebere ničesar (kartica se zamenja prek `outerHTML`): trajno območje zunaj kartice.
5. **DeepSeek — opravljeno 27. 11. 2026:** **objavljeno na GitHub Pages** (`git push origin main`, `origin/main` = `4fc049c`); nov paket `index-C-COV7AK.js` preverjen na živo (117 kartic, 5 sestavljank, 5 živih območij, `naloge.json` na strežniku 117 nalog).
6. **Aljona (zdaj):** preizkus objavljene različice na telefonu in namizju (izbirnik ravni, oba gumba za ponastavitev, potrditveno sporočilo, prelom gumbov, sestavljanke »Sestavi poved«); po potrebi preizkus z bralnikom zaslona (VoiceOver/TalkBack).
7. **Claude Code:** gumb za zvočno izgovorjavo povedi (TTS, `window.speechSynthesis` s `sl-SI`) — v kodi še ni začet; po potrebi trajno živo območje zunaj kartice.
8. Zaključeno 25. 11. 2026: kratka kontrola petih B2 nalog iz commita `045f848` (VEZ-019, ROD-018, DVO-005, VID-012, SKL-004) — commit `00311d2`; mikro-popravek zveze `sodi za` v navodilu ROD-018 (opravljen v `e941ff3`).
