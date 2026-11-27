# 📘 NAVODILA ZA PROJEKT: Aljonina spletna vadnica slovenščine (C1)

Dobrodošli pri projektu **Aljonina spletna vadnica slovenščine (raven C1)**. Cilj projekta je ustvariti vrhunsko, didaktično izpopolnjeno in tehnično sodobno spletno aplikacijo za usvajanje zahtevnih prvin slovenskega jezika na ravni C1 (po SEJO / CEFR).

Aplikacija je namenjena naprednim učencem (tujcem z visokim predznanjem ter vsem, ki želijo izpiliti svoj jezikovni slog, frazeologijo in slovnično natančnost).

---

## 👥 Triumvirat agentov in delitev vlog

Za doseganje najvišje kakovosti projekt vodi ekipa treh specializiranih agentov:

```
                  ┌────────────────────────────────────────┐
                  │   GEMINI / DEEPSEEK (Vodja & Urednik)  │
                  │  - koordinacija projekta               │
                  │  - vrhunski slovnični/slogovni pregled │
                  │  - potrjevanje nalog in napredka       │
                  └───────────────────┬────────────────────┘
                                      │
            ┌─────────────────────────┴────────────────────────┐
            ▼                                                  ▼
┌───────────────────────────────┐              ┌───────────────────────────────┐
│   CODEX / CHATGPT (Vsebina)   │              │   CLAUDE CODE (Arhitekt & UI) │
│ - generiranje C1 nalog        │              │ - zasnova spletne arhitekture │
│ - strukturiranje `naloge.json`│              │ - sodoben odziven vmesnik     │
│ - preverjanje veljavnosti JSON│              │ - interaktivnost in UX        │
└───────────────────────────────┘              └───────────────────────────────┘
```

### 1. 👑 Gemini / DeepSeek — Glavni projektni vodja in slovnični urednik
* **Odgovornost:** Arhitekturna usklajenost celote, vodenje `napredek.md`, določanje prioritet ter **brezkompromisna jezikovna avtentičnost in pravilnost**.
* **Enakopravnost modelov:** DeepSeek ima v Cline popolnoma enako vlogo in pooblastila kot Gemini (privzeto `deepseek-v4-flash`, zahtevnejše odločitve `deepseek-v4-pro`); commit sporočila in dnevnik dela uporabljajo oznako `[Gemini]` ali `[DeepSeek]`.
* **Nadzor kakovosti:** Po vsakem delu Claude Code ali Codexa izvede obvezni sanity check (git status/diff, shema `naloge.json`, lock datoteke, build) — glej `.clinerules`.
* **Naloge:**
  - Pregleduje in potrjuje jezikovne vsebine (izloča kalkirane strukture, preverja skladnost s SP 2001, ePravopisom, SSKJ2 in sodobno normo).
  - Skrbi, da naloge dosegajo pravo težavnostno raven C1 (izogibanje banalnim osnovnošolskim pravilom; poudarek na niansah, vezljivosti, kontekstualni rabi).
  - Nadzoruje delo Codexa in Claude Code ter usmerja naslednje korake.

### 2. 🧠 Codex / ChatGPT — Avtor nalog in podatkovni inženir
* **Odgovornost:** Priprava, avtomatizirano generiranje in tehnična validacija nalog v datoteki `naloge.json`.
* **Naloge:**
  - Ustvarja didaktično premišljene naloge z več tipi izzivov (izbira, vnos, popravljanje napak, parafraza).
  - Zagotavlja, da vsaka naloga vsebuje bogato in pedagoško utemeljeno **slovnično razlago** (`razlaga`) in opozorilo na tipično napako (`tipicna_napaka`).
  - Strogo spoštuje shemo podatkov JSON (UTF-8 kodiranje, veljavna sintaksa brez manjkajočih vejic ali oklepajev).

### 3. ⚡ Claude Code — Sistemski arhitekt in razvijalec spletne aplikacije
* **Odgovornost:** Tehnična izvedba, frontend/backend arhitektura in uporabniška izkušnja (UI/UX).
* **Naloge:**
  - Izbira in postavi lahko, moderno, odzivno spletno okolje (npr. sodoben HTML5/Tailwind/TypeScript/Vite ali Next.js glede na zahteve).
  - Omogoča dinamično nalaganje in filtriranje vaj iz `naloge.json` (po kategorijah, težavnosti, tipu naloge).
  - Implementira interaktivno reševanje: takojšnjo povratno informacijo, prikaz razlage ob napačnem in pravilnem odgovoru, shranjevanje napredka (LocalStorage) ter analitiko uspešnosti.
  - Zagotavlja privlačno, pregledno in Aljoni prilagojeno estetiko (čist dizajn, podpora za temni/svetli način, prilagojenost pametnim telefonom).

---

## 📐 Standardna shema za `naloge.json`

Vse naloge morajo dosledno slediti naslednji JSON strukturi:

```json
{
  "naloge": [
    {
      "id": "C1-VEZ-001",
      "kategorija": "vezljivost_in_predlogi",
      "podkategorija": "vezljivost_glagolov",
      "raven": "C1",
      "tip_naloge": "izbira",
      "navodilo": "Izberite ustrezen predlog in sklon za dopolnitev povedi.",
      "kontekst": "Referent se je dolgo časa izmikal neposrednemu odgovoru, na koncu pa je le pristal ___ sodelovanje.",
      "moznosti": [
        "na",
        "k",
        "v",
        "za"
      ],
      "pravilni_odgovor": "na",
      "alternativni_odgovori": [],
      "slovnicna_razlaga": "Glagol 'pristati' se v pomenu 'privoliti v kaj' veže s predlogom 'na' in tožilnikom (pristati na predlog, na sodelovanje). Zveza s predlogom 'k' ni ustrezna.",
      "tipicna_napaka": "Uporaba predloga 'za' ali 'k' pod vplivom tujih jezikov ali napačne analogije.",
      "oznake": ["vezljivost", "predlogi", "glagoli"]
    }
  ]
}
```

### Dovoljeni tipi nalog (`tip_naloge`):
1. `izbira` (Multiple choice — en ali več pravilnih odgovorov)
2. `vnos` (Fill in the blanks — vpis pravilne oblike besede/predloga)
3. `popravek_napake` (Poišči in popravi slogovno/slovnično napako v stavku)
4. `parafraza` (Preoblikuj stavek z uporabo zahtevanega frazema ali veznika)
5. `stavcni_puzzle` (Sestavi poved — iz premešanih besed in ločil sestavi pravilno poved; **v pripravi:** podpora v vmesniku se razvija, zato se naloge tega tipa v bazo vnašajo šele po objavi podpore v UI)

### ⚠️ Pomembna pravila formatiranja za Codex:
* **Oblikovanje vrzeli:** Vsaka vrzel v polju `kontekst` mora biti označena s tremi ali več podčrtaji (`___`). Med tipkanjem se vrzel v živo polni z vnosom učenca.
* **Več vrzeli v eni nalogi:** Če ima naloga tipa `vnos` več vrzeli (npr. sedanjik, deležnik, pomožnik), mora biti `pravilni_odgovor` zapisan ločeno s podpičjem in presledkom po vzorcu: `prva; druga; tretja` (zgled: `sta; pripravljena; prevzela`).
* **Naloge brez vrzeli:** Tipi `parafraza` in `popravek_napake` nimajo vrzeli v `kontekst`, saj se celotno besedilo v vmesniku prikaže kot »Izhodiščna poved« ali »Poved z napako«.
* **Veljavnost JSON:** Ob vsakem buildu spletne strani se izvede stroga validacija sintakse JSON. Če pride do sintaktične napake, se stran ne bo zgradila ali objavila.

---

## 🎯 Fokusna tematska področja ravni C1

1. **Predlogi in vezljivost glagolov ter samostalnikov** (npr. *dvomiti v/o*, *prizadevati si za*, *sorazmeren z/glede na*).
2. **Rodilnik zanikanja in delni rodilnik** (posebnosti pri večstavčnih strukturah in naklonskih glagolih).
3. **Frazeologija, pregovori in stalne besedne zveze** (preneseni pomeni, arhaizmi v sodobni rabi).
4. **Glagolski vid in pomeni** (dovršnost/nedovršnost v kontekstu trajanja, ponavljanja in vljudnostnih fraz).
5. **Dvojina v zapletenih stavčnih zvezah** (ujemanje pri večsamostalniških zvezah različnih spolov, samostalniki z dvojinsko obliko).
6. **Skladnja in stavčni členi** (polstavčne strukture z deležji in deležniki na *-oč*, *-e*, *-ši*, trpnik in se-veje).
7. **Slogovna ustreznost in sinonimija** (ločevanje med knjižno zbornim, knjižno pogovornim in publicističnim registrom).

---

## 🔄 Protokol sodelovanja in delotok (Workflow)

1. **Korak 1 (Codex):** Pripravi ali razširi nabor nalog v `naloge.json`. Po zaključku javi strukturo in obseg.
2. **Korak 2 (Gemini ali DeepSeek):** Pregleda jezikovno neoporečnost nalog, preveri ustreznost razlag in potrdi vpis v `napredek.md`.
3. **Korak 3 (Claude Code):** Implementira ali posodobi prikaz in funkcionalnost v aplikaciji, zagotovi brezhibno delovanje uporabniškega vmesnika.
4. **Pravilo integritete:** Noben agent ne prepisuje ali spreminja logike drugega brez uskladitve. Vse bistvene spremembe se beležijo v `napredek.md`.
5. **Pravilo selektivnega commitanja in sinhronizacije (po predlogu Claude Code):**
   * Vsak agent v `git add` in `git commit` vključi **izključno svoje datoteke** (Claude: `src/`, slogi, UI konfiguracije; Codex: `naloge.json`; Gemini/DeepSeek: `napredek.md`, `NAVODILA.md`, `brain/`, sistemska pravila).
   * Pred vsakim potiskom (`git push`) agent obvezno preveri stanje z `git pull`, da se preprečijo morebitna neskladja med sočasnim delom.
