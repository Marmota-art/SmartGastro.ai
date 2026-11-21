/**
 * Vorrendern für Google und Link-Vorschauen.
 * Nach `vite build` (Browser) und `vite build --ssr` (Server) wird jede Seite zu fertigem HTML gerendert
 * und als dist/<seite>.html abgelegt (Netlify liefert /preise aus preise.html, ohne Umleitung auf /preise/). Im Browser übernimmt React dieses HTML (hydrateRoot).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, schemaFor } = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

// Seiten, die vorgerendert werden. Neue Seiten hier und in public/_redirects ergänzen.
const ROUTES = ['/', '/leistungen', '/preise', '/referenzen', '/so-arbeiten-wir', '/ueber', '/impressum', '/datenschutz', '/sicherheit', '/demo-karte', '/thanks'];
const NOINDEX = new Set(['/thanks', '/demo-karte']);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function fill(html, appHtml, head, url, { noindex = false, notFound = false } = {}) {
  let out = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  if (head.title) {
    out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(head.title)}</title>`);
    out = out.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(head.title)}$2`);
    out = out.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(head.title)}$2`);
  }
  if (head.description) {
    out = out.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(head.description)}$2`);
    out = out.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(head.description)}$2`);
    out = out.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(head.description)}$2`);
  }
  const abs = url === '/' ? 'https://smartgastro.ai/' : `https://smartgastro.ai${url}`;
  out = out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${abs}$2`);
  if (notFound || noindex) {
    out = out.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, '');
    out = out.replace(/(<meta name="robots" content=")[^"]*(")/, '$1noindex$2');
  } else {
    out = out.replace(/(<link rel="alternate" hreflang="[^"]*" href=")[^"]*(")/g, `$1${abs}$2`);
  }
  if (notFound) out = out.replace(/\s*<link rel="canonical"[^>]*>/, '');
  else out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${abs}$2`);
  // Strukturierte Daten (schema.org) für Google
  const schema = !notFound && !noindex && head.title ? schemaFor(url, head.title, head.description ?? '') : null;
  if (schema) {
    const json = JSON.stringify(schema).replace(/</g, String.fromCharCode(92) + 'u003c'); // Zeichen < im Text darf das Skript-Tag nicht beenden
    out = out.replace('</head>', `    <script type="application/ld+json">${json}</script>\n  </head>`);
  }
  return out;
}

let count = 0;
for (const url of ROUTES) {
  const { html, head } = await render(url);
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, `${url.slice(1)}.html`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, fill(template, html, head, url, { noindex: NOINDEX.has(url) }));
  console.log(`  ✓ ${url.padEnd(18)} ${head.title ?? '(kein Titel)'}`);
  count++;
}

// Seite «Nicht gefunden» für alle unbekannten Adressen (Status 404 über public/_redirects)
{
  const { html, head } = await render('/__nicht-gefunden__');
  await writeFile(path.join(dist, '404.html'), fill(template, html, head, '/404', { notFound: true }));
  console.log(`  ✓ 404.html            ${head.title}`);
  count++;
}
// Sitemap mit Datum des Builds (nur Seiten, die Google finden soll)
const today = new Date().toISOString().slice(0, 10);
const PRIORITY = { '/': '1.0', '/leistungen': '0.9', '/preise': '0.9', '/referenzen': '0.7', '/so-arbeiten-wir': '0.7', '/ueber': '0.7' };
const urls = ROUTES.filter((u) => !NOINDEX.has(u)).map((u) => {
  const loc = u === '/' ? 'https://smartgastro.ai/' : `https://smartgastro.ai${u}`;
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><priority>${PRIORITY[u] ?? '0.3'}</priority></url>`;
});
const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>', ''].join(String.fromCharCode(10));
await writeFile(path.join(dist, 'sitemap.xml'), xml);
console.log(`  ✓ sitemap.xml         ${urls.length} Seiten, Stand ${today}`);
console.log(`Vorgerendert: ${count} Seiten`);
