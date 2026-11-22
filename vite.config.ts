import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * naloge.json ostane v korenu projekta (ureja ga Codex).
 * V razvoju ga Vite servira neposredno iz korena, ob buildu pa ga ta vtičnik
 * nespremenjenega skopira v dist/, kjer ga aplikacija naloži s fetch().
 */
function copyNaloge(): Plugin {
  return {
    name: 'copy-naloge-json',
    apply: 'build',
    generateBundle() {
      const path = fileURLToPath(new URL('./naloge.json', import.meta.url));
      const source = readFileSync(path, 'utf-8');
      JSON.parse(source); // build pade, če JSON ni veljaven
      this.emitFile({ type: 'asset', fileName: 'naloge.json', source });
    },
  };
}

export default defineConfig({
  // Relativna pot: deluje na https://<uporabnik>.github.io/<poljubno-ime-repozitorija>/
  // in lokalno, ne glede na ime repozitorija.
  base: './',
  plugins: [tailwindcss(), copyNaloge()],
  build: { outDir: 'dist', emptyOutDir: true },
});
