# Navodila za Claude Code (Glavni graditelj)

Ob vsakem zagonu in pred vsakim delom:
1. **Obvezno branje:** Preberi `brain/00-INDEX.md`, `brain/01-ARHITEKTURA.md` in `.ai-tasks/1-claude.md`.
2. **Zaščita pred sočasnim delom:** Preveri, ali v korenski mapi obstajata `claudegradim.lock` ali `codexprevajam.lock`. Če katera obstaja, **TAKOJ USTAVI DELO**.
3. **Zaklepanje:** Če lock datotek ni, ustvari prazno datoteko `claudegradim.lock`.
4. **Obseg dela:** Spreminjaj izključno kodo in uporabniški vmesnik v `src/` (ne urejaj vsebine v `naloge.json`, razen če je izrecno naročeno).
5. **Zaključek dela:**
   - Izvedi `npm run build` za preverjanje tipov in gradnje.
   - Izbriši datoteko `claudegradim.lock`.
   - Naredi lokalni `git add src/` in `git commit -m "[Claude]: <kratek opis>"` (NIKOLI ne izvajaj `git push`).
