import './style.css';
import { naloziNaloge } from './data';
import type { Naloga } from './types';

const app = document.querySelector<HTMLDivElement>('#app')!;

const ZNAKI: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ZNAKI[c]);

function lupina(vsebina: string): string {
  return `
    <main class="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <header class="mb-8">
        <p class="text-sm font-semibold uppercase tracking-wide text-accent">Raven C1</p>
        <h1 class="text-3xl font-bold sm:text-4xl">Aljonina spletna vadnica slovenščine</h1>
        <p class="mt-2 text-[var(--muted)]">Vezljivost, frazeologija, glagolski vid, dvojina in slog za napredne.</p>
      </header>
      ${vsebina}
    </main>`;
}

function kartica(n: Naloga): string {
  return `
    <li class="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div class="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
        <span class="font-mono">${esc(n.id)}</span>
        <span aria-hidden="true">·</span>
        <span>${esc(n.kategorija.replaceAll('_', ' '))}</span>
        <span class="rounded-full border border-primary px-2 py-0.5 text-primary">${esc(n.tip_naloge.replaceAll('_', ' '))}</span>
      </div>
      <p class="mt-2">${esc(n.kontekst)}</p>
    </li>`;
}

async function zagon() {
  app.innerHTML = lupina(`<p class="text-[var(--muted)]">Nalagam naloge …</p>`);
  try {
    const { naloge } = await naloziNaloge();
    app.innerHTML = lupina(`
      <p class="mb-4 text-[var(--muted)]"><span aria-hidden="true">✓</span> Naloženih nalog: <strong class="text-[var(--text)]">${naloge.length}</strong></p>
      <ul class="space-y-3">${naloge.map(kartica).join('')}</ul>`);
  } catch (e) {
    const sporocilo = e instanceof Error ? e.message : String(e);
    app.innerHTML = lupina(`
      <div role="alert" class="rounded-xl border-2 border-dashed border-warn bg-[var(--surface)] p-4">
        <strong><span aria-hidden="true">!</span> Napaka:</strong> ${esc(sporocilo)}
      </div>`);
  }
}

zagon();
