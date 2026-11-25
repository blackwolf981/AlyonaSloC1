# Navodila za Claude Code (Glavni graditelj)

> **Vodenje projekta:** Projekt vodita orkestratorja **Gemini** ali **DeepSeek** (Cline) s popolnoma enakimi pooblastili. Ta navodila veljajo enako ne glede na to, kateri vodi; oznaka v commit sporočilih ostane `[Claude]`.

Ob vsakem zagonu in pred vsakim delom:
1. **Obvezno branje:** Preberi `brain/00-INDEX.md`, `brain/01-ARHITEKTURA.md` in `.ai-tasks/1-claude.md`.
2. **Zaščita pred sočasnim delom:** Preveri, ali v korenski mapi obstajata `claudegradim.lock` ali `codexprevajam.lock`. Če katera obstaja, **TAKOJ USTAVI DELO**.
3. **Zaklepanje:** Če lock datotek ni, ustvari prazno datoteko `claudegradim.lock`.
4. **Obseg dela:** Spreminjaj izključno kodo in uporabniški vmesnik v `src/` (ne urejaj vsebine v `naloge.json`, razen če je izrecno naročeno).
5. **Zaključek dela:**
   - Izvedi `npm run build` za preverjanje tipov in gradnje.
   - Izbriši datoteko `claudegradim.lock`.
   - Naredi lokalni `git add src/` in `git commit -m "[Claude]: <kratek opis>"` (NIKOLI ne izvajaj `git push`).
   - Pusti repozitorij pripravljen na sanity check orkestratorja: brez `*.lock` datotek, uspešen `npm run build` in commitane samo tvoje datoteke.
   - **Obvezna izhodna koda (Feedback za Cline):** Na čisto vsakem koncu svojega odgovora obvezno izpiši kratek, jedrnat "Feedback za Cline" znotraj enega samega ```text bloka (za enostavno kopiranje z enim klikom). V bloku naj bodo natanko 3–4 kratke vrstice:
     ```text
     [Feedback za Cline]
     - Narejeno: [kratek opis]
     - Spremenjene datoteke: [seznam datotek]
     - Stanje lock: ni aktivnih lock datotek (lock izbrisan)
     - Opozorila / Vprašanja: [brez / opozorilo]
     ```
