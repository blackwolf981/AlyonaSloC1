# 🏛️ Arhitektura projekta: Aljonina spletna vadnica slovenščine (C1)

## 1. Tehnološki sklad (Tech Stack)
* **Ogrodje / Pogon:** Vite + TypeScript
* **Stilsko oblikovanje:** Tailwind CSS (v4 z @tailwindcss/vite)
* **Podatkovni vir:** naloge.json (lokalna podatkovna datoteka v korenskem imeniku, dinamično naložena ob zagonu)
* **Shranjevanje napredka:** Brskalnikov localStorage (shranjevanje rešenih nalog, napačnih poskusov in izbire teme)
* **Gostovanje in CI/CD:** GitHub Pages (https://blackwolf981.github.io/AlyonaSloC1/) z GitHub Actions (deploy.yml)

---

## 2. Struktura projekta

AlyonaSloC1/
├── .ai-tasks/             # Predaja nalog med agenti (1-claude.md, 2-codex.md)
├── brain/                 # Obsidian baza znanja in arhitekturna dokumentacija
│   ├── 00-INDEX.md        # Vstopna točka in dnevnik dela
│   ├── 01-ARHITEKTURA.md  # Tehnični sklad in arhitektura
│   └── 02-SLOVENSCINA.md  # Slovnična in pedagoška pravila za Codex
├── public/                # Statične datoteke
├── src/                   # Izvorna koda spletne aplikacije (TypeScript / Tailwind)
│   ├── main.ts            # Glavna aplikacijska logika in interakcije vmesnika
│   ├── data.ts            # Nalaganje in obdelava nalog iz JSON
│   ├── napredek.ts        # Upravljanje napredka in shranjevanje v localStorage
│   ├── preverjanje.ts     # Validacija odgovorov za različne tipe nalog
│   ├── types.ts           # TypeScript definicije podatkovnih struktur
│   └── style.css          # Tailwind CSS uvozi in prilagojeni slogi
├── ucbeniki/              # PDF učbeniki in viri za pripravo nalog
├── naloge.json            # Centralna podatkovna baza vseh učnih nalog
├── NAVODILA.md            # Celotna projektna navodila in JSON shema
├── napredek.md            # Sprotni dashboard in sledenje fazam
└── package.json           # Definicija odvisnosti in skript

---

## 3. Načelo ločevanja kode od vsebine
* **Programska koda (src/, TypeScript):** Skrbi za mehaniko reševanja, upodabljanje vmesnika, validacijo vnosov, upravljanje filtrov in localStorage. V kodi ni trdo kodiranih slovenskih nalog ali vprašanj.
* **Vsebina (naloge.json):** Vsebuje izključno učne naloge, kontekste, možne odgovore, pravilne rešitve, slovnične razlage in tipične napake. To omogoča, da učitelj slovenščine (Codex) neodvisno ureja in širi bazo nalog, ne da bi posegal v programsko kodo.
