// Mirror de desarrollopais.cl a HTML/CSS/JS estático.
// Uso: node mirror.mjs <carpeta-destino>
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(process.argv[2]);
const ORIGIN = 'https://desarrollopais.cl';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';
const ASSET_EXT = /\.(css|js|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|otf|eot|mp4|webm|json)$/i;
const SKIP_PAGE = /^\/(wp-json|wp-admin|wp-login|xmlrpc|en\/|feed|comments)/;

const pageQueue = ['/'];
const pagesSeen = new Set();
const assetsDone = new Map(); // url path -> ok
const failures = [];

async function get(url, binary) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return binary ? Buffer.from(await r.arrayBuffer()) : await r.text();
    } catch (e) { if (i === 2) throw e; }
  }
}

const isAsset = p => (p.startsWith('/wp-content/') || p.startsWith('/wp-includes/')) && ASSET_EXT.test(p);
const pageFile = p => {
  let clean = decodeURIComponent(p.replace(/^\/+|\/+$/g, ''));
  return clean ? path.join(clean, 'index.html') : 'index.html';
};
const assetFile = p => decodeURIComponent(p.replace(/^\/+/, ''));

function rel(fromFile, toFile) {
  let r = path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
  return encodeURI(r).replace(/%25/g, '%');
}

async function fetchAsset(p) {
  if (assetsDone.has(p)) return;
  assetsDone.set(p, true);
  const file = assetFile(p);
  const dest = path.join(OUT, file);
  try {
    if (/\.css$/i.test(p)) {
      let css = await get(ORIGIN + p);
      css = await processCss(css, p, file);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, css);
    } else {
      const buf = await get(ORIGIN + p, true);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, buf);
    }
  } catch (e) { failures.push(p + ' -> ' + e.message); }
}

async function processCss(css, cssPath, cssFile) {
  const refs = [];
  const re = /url\(\s*(['"]?)([^'")]+)\1\s*\)|@import\s+(['"])([^'"]+)\3/g;
  let m;
  while ((m = re.exec(css))) {
    const u = (m[2] || m[4]).trim();
    if (/^(data:|#)/.test(u)) continue;
    let abs;
    try { abs = new URL(u, ORIGIN + cssPath); } catch { continue; }
    if (abs.host !== 'desarrollopais.cl') continue;
    refs.push(abs.pathname);
  }
  await Promise.all([...new Set(refs)].filter(isAsset).map(fetchAsset));
  // reescribe referencias absolutas del dominio a relativas
  return css.replace(/https?:\/\/desarrollopais\.cl(\/[^'")\s?#]*)([?#][^'")\s]*)?/g, (all, p) =>
    isAsset(p) ? rel(cssFile, assetFile(p)) : all);
}

function collectAndRewrite(html, pageP) {
  const file = pageFile(pageP);
  const assets = new Set();
  const links = new Set();
  // URLs normales y escapadas en JSON (https:\/\/desarrollopais.cl\/...)
  const re = /https?:(\\?\/\\?\/)desarrollopais\.cl((?:\\?\/[^"'\s<>(),\\?#]*)*)([?#][^"'\s<>(),\\]*)?/g;
  const out = html.replace(re, (all, slashes, rawPath, query = '') => {
    const escaped = slashes.includes('\\');
    let p = rawPath.replace(/\\\//g, '/') || '/';
    if (isAsset(p)) {
      assets.add(p);
      let r = rel(file, assetFile(p));
      return escaped ? r.replace(/\//g, '\\/') : r;
    }
    if (escaped) return all;
    if (!/\.[a-z0-9]{2,4}$/i.test(p) && !SKIP_PAGE.test(p) && !query) {
      if (!p.endsWith('/')) p += '/';
      links.add(p);
      return rel(file, pageFile(p));
    }
    return all;
  });
  return { out, assets, links };
}

async function main() {
  const maxDepth = Number(process.argv[3] ?? 1);
  const depth = new Map([['/', 0]]);
  const rawPages = new Map();
  // 1) descubrir páginas
  while (pageQueue.length) {
    const p = pageQueue.shift();
    if (pagesSeen.has(p)) continue;
    pagesSeen.add(p);
    let html;
    try { html = await get(ORIGIN + p); } catch (e) { failures.push('PAGE ' + p + ' -> ' + e.message); continue; }
    rawPages.set(p, html);
    console.log('page', p);
    const { links } = collectAndRewrite(html, p);
    if (depth.get(p) < maxDepth) for (const l of links) if (!depth.has(l)) { depth.set(l, depth.get(p) + 1); pageQueue.push(l); }
  }
  // 2) reescribir solo enlaces a páginas espejadas
  for (const [p, html] of rawPages) {
    const file = pageFile(p);
    let { out, assets } = collectAndRewrite(html, p);
    // revertir enlaces a páginas no espejadas → dominio original
    out = out.replace(/(href=["'])([^"']*index\.html)(["'])/g, (all, a, href, b) => {
      const target = path.normalize(path.join(path.dirname(file), decodeURI(href)));
      const pp = '/' + path.dirname(target).split(path.sep).join('/') + '/';
      const key = pp === '/./' ? '/' : pp;
      return rawPages.has(key) ? all : a + ORIGIN + key + b;
    });
    await Promise.all([...assets].map(fetchAsset));
    const dest = path.join(OUT, file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, out);
  }
  console.log(`\nPáginas: ${rawPages.size}  Assets: ${assetsDone.size}  Fallos: ${failures.length}`);
  failures.forEach(f => console.log('  FAIL', f));
}
main();
