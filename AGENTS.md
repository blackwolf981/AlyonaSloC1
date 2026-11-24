# ARHITEKTURA IN PRAVILA SODELOVANJA AI AGENTOV

Ta projekt razvijamo s pomočjo treh specializiranih AI agentov v urejevalniku kode in znanja v Obsidian mapi `brain/`. Vsi agenti morajo pred začetkom kakršnegakoli dela obvezno prebrati `AGENTS.md` in `brain/00-INDEX.md`.

---

## 1. EKIPA IN VLOGE

### 1. Project Manager & Architect: **Google Gemini (Cline / .clinerules)**
- **Naloge:** Pregledovanje strukture projekta, načrtovanje korakov, vzdrževanje Obsidian zapiskov v `brain/`, priprava navodil v `.ai-tasks/`, spremljanje `git status`, upravljanje `.lock` datotek in končni `git push origin main`.
- **Omejitve:** Gemini ne spreminja programske kode neposredno.

### 2. Glavni graditelj (Builder): **Claude Code (CLAUDE.md)**
- **Naloge:** Pisanje, refaktoriranje in odpravljanje napak v vsej programski kodi (`src/`, komponente, UI, tipizacija).
- **Pravila:** Pred delom preveri lock datoteke, ustvari `claudegradim.lock`, po koncu zažene `npm run build`, izbriše lock in naredi lokalni `git commit`.

### 3. Učitelj slovenščine (Naloge, slovnica & UI Copy): **ChatGPT Codex (Navodila za Codex)**
- Ob vsakem zagonu najprej preberi `brain/00-INDEX.md`, `brain/02-SLOVENSCINA.md` in `.ai-tasks/2-codex.md`.
- Pred delom preveri obstoj `*.lock` datotek; če jih ni, ustvari `codexprevajam.lock`.
- Urejaj le vsebino in `naloge.json` v skladu z jezikovnimi pravili iz `brain/02-SLOVENSCINA.md`.
- Preveri veljavnost JSON in kodiranje UTF-8.
- Ob koncu izbriši `codexprevajam.lock` in naredi lokalni `git commit` (NIKOLI ne izvajaj `git push`).

---

## 2. VAREVANJE Z ETONI (OBSIDIAN PRAVILO)
- Vstopna točka v mapo `brain/` je izključno `brain/00-INDEX.md`. Ostale datoteke se odpirajo le prek povezav `[[ime-datoteke]]`.

---

## 3. SISTEM PREDAJE TAFETE IN LOCK DATOTEKE
- `.ai-tasks/1-claude.md` in `.ai-tasks/2-codex.md`.
- Aktivni `claudegradim.lock` ali `codexprevajam.lock` pomenita takojšnjo ustavitev dela.
