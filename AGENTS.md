# ARHITEKTURA IN PRAVILA SODELOVANJA AI AGENTOV

Ta projekt razvijamo s pomočjo treh specializiranih AI agentov v urejevalniku kode in znanja v Obsidian mapi `brain/`. Vsi agenti morajo pred začetkom kakršnegakoli dela obvezno prebrati `AGENTS.md` in `brain/00-INDEX.md`.

---

## 1. EKIPA IN VLOGE

### 1. Project Manager & Architect: **Google Gemini**
- **Orodja:** Cline (v načinu **Plan**, prek Google AI Studio API ključa) ali Google Antigravity (ko je na voljo tedenska kvota).
- **Naloge:**
  - Pregledovanje strukture projekta, načrtovanje korakov in vzdrževanje Obsidian zapiskov v `brain/`.
  - Priprava ločenih navodil v mapi `.ai-tasks/` za graditelja (Claude) in učitelja slovenščine (Codex).
- **Omejitve:** Gemini NE spreminja programske kode. Ureja samo dokumentacijo v `brain/`, `AGENTS.md` in naloge v `.ai-tasks/`.

### 2. Glavni graditelj (Builder): **Claude Code**
- **Orodje:** Razširitev / CLI Claude Code.
- **Naloge:**
  - Pisanje, refaktoriranje in odpravljanje napak v vsej programski kodi (logika, komponente, API-ji, baze, podatkovne strukture za naloge).
  - Ločevanje logike od vsebine: uporaba JSON datotek ali ključev za učne naloge in UI besedila namesto trdo kodiranih slovenskih nizov.
- **Omejitve:** Ne sestavlja končnih učnih nalog v slovenščini in ne piše lektoriranih UI besedil – pripravi strukturo in testne/nadomestne ključe, ki jih nato napolni ali pregleda Codex.

### 3. Učitelj slovenščine (Naloge, slovnica & UI Copy): **ChatGPT Codex**
- **Orodje:** Razširitev OpenAI Codex / ChatGPT.
- **Naloge:**
  - Priprava, jezikovni pregled in lektura slovnično popolnih učnih nalog (navodila, primeri, vprašanja, razlage, povratne informacije učencem) ter UI besedil v skladu s pravili v `brain/02-SLOVENSCINA.md`.
  - Urejanje podatkovnih datotek z nalogami in jezikovnih datotek (npr. `sl.json`, `locales/sl/*`, `data/naloge/*`).
- **Omejitve:** Ne spreminja poslovne logike, arhitekture ali delovanja funkcij.

---

## 2. VARČEVANJE Z ŽETONI (OBSIDIAN PRAVILO)
- Agenti **NIKOLI** ne smejo na slepo brati vseh datotek v mapi `brain/`.
- Vstopna točka je izključno `brain/00-INDEX.md`. Ostale datoteke v `brain/` agent odpre le takrat, ko ga nanje izrecno napoti povezava `[[ime-datoteke]]` ali naloga v `.ai-tasks/`.

---

## 3. SISTEM PREDAJE ŠTAFETE (`.ai-tasks/`)
1. **Gemini (Architect)** pripravi navodila za naslednji korak in jih zapiše v:
   - `.ai-tasks/1-claude.md` (tehnična navodila za Claude Code)
   - `.ai-tasks/2-codex.md` (jezikovna in pedagoška navodila ter seznam datotek/ključev za Codex)
2. Ko uporabnik agentu reče *"Izvedi .ai-tasks/1-claude.md"* (ali *2-codex.md*), agent izvede nalogo in na vrh datoteke z nalogo dopiše `[OPRAVLJENO]` ter kratek povzetek.

---

## 4. VAROVALKA PROTI SOČASNEMU DELU (`.lock` DATOTEKE)
1. **Preverjanje pred začetkom (Mandatory Lock Check):**
   - Preden **Claude Code** ali **Codex** začne urejati katerokoli datoteko, preveri, ali v korenski mapi obstaja `claudegradim.lock` ali `codexprevajam.lock`.
   - **Če katera od `.lock` datotek obstaja:** Agent mora **TAKOJ USTAVITI DELO**, ne sme spreminjati datotek in opozori uporabnika: *"OPOZORILO: Zaznana je aktivna lock datoteka ([ime]). Drugi agent še dela ali pa je bila seja prekinjena."*
2. **Ustvarjanje in brisanje lastne `.lock` datoteke:**
   - **Claude Code** ob začetku dela ustvari prazno datoteko `claudegradim.lock`, ob koncu pa jo **obvezno izbriše**.
   - **Codex** ob začetku dela ustvari prazno datoteko `codexprevajam.lock`, ob koncu pa jo **obvezno izbriše**.
3. **Vrstni red:** Gemini načrtuje → Claude zgradi in izbriše `.lock` → Codex pripravi/pregleda slovenščino in izbriše `.lock` → Gemini pregleda.

---

## 5. ZGODOVINA, GIT IN PREVERJANJA
1. **Posodabljanje `brain/00-INDEX.md`:**
   - Ker agenti ne vidijo zgodovine klepeta drugih orodij, vsak agent po končanem delu (pred brisanjem `.lock`) v `brain/00-INDEX.md` pod *Dnevnik dela* v 2–3 alinejah zapiše: kaj je naredil, katere datoteke je spremenil in kaj je naslednji korak.
2. **Preverjanje diska:** Pred vsakim posegom v obstoječo datoteko jo mora agent znova prebrati z diska.
3. **Pravila za Git:**
   - Agenti **NIKOLI** ne izvajajo `git push`, `git reset --hard` ali spreminjanja vej.
   - Ko Claude ali Codex uspešno zaključi nalogo iz `.ai-tasks/`, naredi lokalni `git add .` in `git commit -m "[Claude/Codex]: kratek opis v slovenščini"`.
   - Ob vrnitvi na projekt Gemini preveri `brain/00-INDEX.md` in zadnjih 5 vnosov z `git log -n 5 --oneline`.