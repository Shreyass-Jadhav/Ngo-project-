// Tiny static builder (no dependencies). Pages in src/pages use tokens written as HTML comments:
//   <!-- @include name -->           inline src/sections/<name>/<name>.html (+ its .css/.js into the bundle)
//   <!-- @programs featured|all -->   program cards, from src/data/programs.json + photos in src/assets/img/<slug>/
//   <!-- @strip -->                  horizontal photo strip      <!-- @gallery -->  full masonry gallery
//   <!-- @pagehero Title | slug/01.webp -->  banner with breadcrumb
import fs from 'node:fs';
const S = 'src', D = 'dist', rd = (p) => fs.readFileSync(p, 'utf8');
fs.rmSync(D, { recursive: true, force: true }); fs.mkdirSync(D, { recursive: true });
let css = rd(`${S}/core/base.css`), js = rd(`${S}/core/core.js`);
const progs = JSON.parse(rd(`${S}/data/programs.json`)), seen = new Set();
const photos = (slug) => fs.readdirSync(`${S}/assets/img/${slug}`).filter((f) => f.endsWith('.webp')).sort();
const img = (slug, f, alt) => `<img src="/assets/img/${slug}/${f}" alt="${alt}" loading="lazy" decoding="async">`;
const use = (name) => {
  const dir = `${S}/sections/${name}`;
  if (!seen.has(name)) {
    seen.add(name);
    if (fs.existsSync(`${dir}/${name}.css`)) css += `\n/* ${name} */\n` + rd(`${dir}/${name}.css`);
    if (fs.existsSync(`${dir}/${name}.js`)) js += `\n/* ${name} */\n` + rd(`${dir}/${name}.js`);
  }
  return dir;
};
const card = (p) => `<article class="card reveal"><a class="card-media" href="/gallery#${p.slug}">${img(p.slug, '01.webp', p.title + ' – Sakri Foundation')}</a><div class="body"><h3>${p.title}</h3><p>${p.blurb}</p><a class="more" href="/gallery#${p.slug}">View ${photos(p.slug).length} photos →</a></div></article>`;
const tokens = {
  include: (n) => { const d = use(n); if (!fs.existsSync(`${d}/${n}.html`)) throw new Error(`Missing section: ${n}`); return rd(`${d}/${n}.html`); },
  programs: (a) => `<div class="grid">${progs.filter((p) => a === 'all' || p.featured).map(card).join('')}</div>`,
  strip: () => { use('strip'); const t = []; progs.forEach((p) => photos(p.slug).slice(1, 3).forEach((f) => t.push(`<a href="/gallery#${p.slug}">${img(p.slug, f, p.title + ' – Sakri Foundation')}</a>`))); return t.join(''); },
  gallery: () => { use('gallery'); return progs.map((p) => `<section class="gal" id="${p.slug}"><h2>${p.title}</h2><p class="lead">${p.blurb}</p><div class="masonry">${photos(p.slug).map((f) => img(p.slug, f, p.title + ' – Sakri Foundation')).join('')}</div></section>`).join(''); },
  pagehero: (a) => { const [t, c] = a.split('|').map((s) => s.trim()); const d = use('pagehero'); return rd(`${d}/pagehero.html`).replaceAll('{{title}}', t).replaceAll('{{cover}}', c); },
};
const re = /<!--\s*@(\w+)\s*([^>]*?)\s*-->/g;
for (const f of fs.readdirSync(`${S}/pages`).filter((f) => f.endsWith('.html'))) {
  let html = rd(`${S}/pages/${f}`), prev;
  do { prev = html; html = html.replace(re, (_, k, a) => { if (!tokens[k]) throw new Error(`Unknown token @${k}`); return tokens[k](a); }); } while (html !== prev);
  fs.writeFileSync(`${D}/${f}`, html);
}
fs.writeFileSync(`${D}/styles.css`, css); fs.writeFileSync(`${D}/main.js`, js);
fs.cpSync(`${S}/assets`, `${D}/assets`, { recursive: true });
console.log(`Built ${seen.size} sections -> ${D}/`);
