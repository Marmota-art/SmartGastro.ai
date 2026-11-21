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
const { render } = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href);
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
  }
  if (head.description) {
    out = out.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(head.description)}$2`);
    out = out.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(head.description)}$2`);
  }
  const abs = `https://smartgastro.ai${url}`;
  out = out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${abs}$2`);
  if (notFound) out = out.replace(/\s*<link rel="canonical"[^>]*>/, '');
  else out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${abs}$2`);
  if (noindex || notFound) out = out.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>');
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
console.log(`Vorgerendert: ${count} Seiten`);
