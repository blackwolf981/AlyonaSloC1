# Aljonina spletna vadnica slovenščine (C1)

Statična spletna aplikacija za vadbo slovenščine na ravni C1. Zgrajena je z **Vite + TypeScript + Tailwind CSS v4**, gostuje na **GitHub Pages**.
Vloge in shema nalog: [NAVODILA.md](NAVODILA.md) · napredek: [napredek.md](napredek.md).

## Zgradba

```
.
├── index.html              vstopna stran
├── naloge.json             baza nalog (ureja Codex, ostane v korenu)
├── public/                 statične datoteke (favicon …), kopirajo se v dist/
├── src/
│   ├── main.ts             zagon in izris
│   ├── data.ts             nalaganje naloge.json
│   ├── types.ts            TypeScript shema naloge
│   └── style.css           Tailwind + barvne spremenljivke (svetli/temni način)
├── vite.config.ts          base: './' + kopiranje naloge.json v dist/
└── .github/workflows/deploy.yml   samodejna objava ob pushu na main
```

**Poti:** `base: './'` v [vite.config.ts](vite.config.ts) naredi vse poti relativne, zato aplikacija deluje na `https://<uporabnik>.github.io/<ime-repozitorija>/` ne glede na ime repozitorija. `naloge.json` se naloži z `fetch(import.meta.env.BASE_URL + 'naloge.json')`. Ob buildu se preveri, ali je veljaven JSON; če ni, build pade in napačna različica se ne objavi.

> Za prihodnje podstrani uporabljaj hash-usmerjanje (`#/vaja/C1-VEZ-001`), ne pravih poti (`/vaja/...`), ker GitHub Pages za neobstoječe poti vrne 404.

## Lokalni zagon

Potrebuješ Node.js 20 ali novejši.

```bash
npm install        # prvič
npm run dev        # razvojni strežnik → http://localhost:5173
npm run build      # produkcijski build v dist/ (s preverjanjem tipov)
npm run preview    # ogled builda
```

## Povezava z GitHubom (enkratno)

1. Na <https://github.com/new> ustvari **prazen** repozitorij, npr. `AlyonaSloC1` (brez README, .gitignore ali licence).
2. V tej mapi:

   ```bash
   git add .
   git commit -m "Ogrodje aplikacije: Vite + TS + Tailwind, GitHub Pages deploy"
   git remote add origin https://github.com/<UPORABNIK>/AlyonaSloC1.git
   git push -u origin main
   ```

3. Na GitHubu: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Pod **Actions** počakaj, da se konča potek »Objava na GitHub Pages«. Stran bo dosegljiva na `https://<UPORABNIK>.github.io/AlyonaSloC1/`.

Od tedaj vsak `git push` na `main` stran samodejno zgradi in objavi znova.
