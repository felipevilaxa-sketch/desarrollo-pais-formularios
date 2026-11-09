// Genera las páginas de formularios y agrega los accesos (menú lateral, footer y
// tarjetas en Contacto) en todas las páginas del clon.
//
// Uso (desde la raíz del clon):  node tools/formularios-build.mjs
//
// - El contenido de cada formulario está en tools/formularios/<slug>.html (+ .js).
// - Las páginas finales (<slug>/index.html) se regeneran con la cabecera y el pie
//   de contacto/index.html. Edita los fragmentos y vuelve a correr el script.
// - Es idempotente: se puede correr varias veces sin duplicar nada.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FRAG = path.join(ROOT, 'tools', 'formularios');
const THEME = 'wp-content/themes/naitus-theme-v2/assets';

const ICONOS = {
  persona: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6"/><path d="M19 8v6"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  edificio: '<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/>'
};

const CANALES = [
  {
    slug: 'trabaja-con-nosotros',
    titulo: 'Trabaja con nosotros',
    tituloPagina: 'Trabaja con nosotros',
    icono: 'persona',
    desc: 'Postulaciones a convocatorias vigentes y currículums espontáneos, clasificados por área, nivel y región.',
    bullets: ['CV en PDF con validación de peso', 'Área de interés y nivel del cargo', 'Declaración de conflicto de interés']
  },
  {
    slug: 'tienes-terrenos',
    titulo: '¿Tienes terrenos?',
    etiqueta: 'Registro de terrenos', // menú lateral y footer (sin pregunta)
    tituloPagina: '¿Tienes un terreno disponible?',
    icono: 'pin',
    desc: 'Registra un terreno disponible para que podamos considerarlo cuando un mandante público requiera suelo en esa zona.',
    bullets: ['Carpeta automática por región y uso', 'Superficie, uso de suelo y servicios', 'Planos, fotos y certificados']
  },
  {
    slug: 'servicios-y-proyectos',
    titulo: 'Servicios y proyectos',
    tituloPagina: 'Registra tus servicios o antecedentes de proyecto',
    icono: 'edificio',
    desc: 'Registra los servicios de tu empresa o antecedentes de un proyecto, para que podamos tenerte presente cuando abramos licitaciones relacionadas.',
    bullets: ['Tres tipos de registro en un formulario', 'Etapa de madurez y monto estimado', 'Es un registro, no una postulación']
  }
];

const INTRO_CANALES = 'Desarrollo País desarrolla infraestructura por encargo de instituciones públicas, nuestros mandantes. ' +
  'Ellos definen qué proyectos se necesitan, y nosotros los estructuramos y contratamos su diseño, construcción u ' +
  'operación mediante procesos abiertos. Estos canales nos permiten conocer empresas, terrenos y antecedentes que ' +
  'podrían ser útiles en futuros procesos.';

const svg = k => `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[k]}</svg>`;

const etiqueta = c => c.etiqueta || c.titulo;

/* ---------- Bloques que se inyectan ---------- */
// Apartado propio al final del menú lateral (sin el formulario genérico: Contacto ya está en el menú)
function menuCanales(pre, actual) {
  const items = CANALES.map(c => {
    const cur = c.slug === actual;
    return `<li class="menu-item${cur ? ' current_page_item' : ''}"><a href="${pre}${c.slug}/index.html"${cur ? ' aria-current="page"' : ''}>${etiqueta(c)}</a></li>`;
  }).join('\n');
  return `<!-- canales:menu -->
            <div class="menu-canales-lateral"><ul class="menu menu-canales">
<li class="menu-canales__titulo">Otros canales de contacto</li>
${items}
</ul></div>
            <!-- /canales:menu -->`;
}

function footerCanales(pre) {
  const links = [`<a href="${pre}contacto/index.html">Formulario de contacto</a>`,
    ...CANALES.map(c => `<a href="${pre}${c.slug}/index.html">${etiqueta(c)}</a>`)].join('\n        ');
  return `<!-- canales:footer -->
      <div class="footer__canales">
      <p>Canales de contacto</p>
      <span>
        ${links}
      </span>
      </div>
      <!-- /canales:footer -->`;
}

function bloqueContacto(pre) {
  const cards = CANALES.map(c => `
          <div class="col-lg-4">
            <article class="canal-card">
              <div class="canal-card__ico">${svg(c.icono)}</div>
              <h3>${c.titulo}</h3>
              <p>${c.desc}</p>
              <ul>
                ${c.bullets.map(b => `<li>${b}</li>`).join('\n                ')}
              </ul>
              <a class="dp-btn" href="${pre}${c.slug}/index.html">Ver formulario</a>
            </article>
          </div>`).join('');
  return `<!-- canales:contacto -->
            <div class="col-12 canales" id="canales">
              <div class="canales__intro">
                <h2>Otros canales de contacto</h2>
                <p>${INTRO_CANALES}</p>
              </div>
              <div class="row">${cards}
              </div>
            </div>
            <!-- /canales:contacto -->
`;
}

// Miga de pan, igual a la del detalle de líneas de proyecto: "Contacto > <canal>" + "Ir a contacto"
function subheader(pre, canal) {
  const volver = `${pre}contacto/index.html#canales`;
  return `<div class="container subheader">
    <!-- sub header -->
    <div class="row">
        <div class="col-12 --subheader-link">
            <p class="d-flex"><a href="${volver}">Contacto</a>&nbsp;&gt; ${etiqueta(canal)}</p>
            <a href="${volver}" class="--subheader-link__btn">
                <span class="arrow__container">
                    <object class="arrow" type="image/svg+xml" data="${pre}${THEME}/images/ico-noticias-xl.svg"></object>
                </span>
                <p>Ir a contacto</p>
            </a>
        </div>
    </div>
</div>
`;
}

/* ---------- Limpieza (idempotencia) ---------- */
function limpiar(html) {
  return html
    .replace(/<ul class="sub-menu" data-canales>[\s\S]*?<\/ul>/g, '')
    .replace(/ menu-item-canales"/g, '"')
    .replace(/\s*<!-- canales:menu -->[\s\S]*?<!-- \/canales:menu -->/g, '')
    .replace(/\s*<!-- canales:footer -->[\s\S]*?<!-- \/canales:footer -->/g, '')
    .replace(/<!-- canales:contacto -->[\s\S]*?<!-- \/canales:contacto -->\n?/g, '')
    .replace(/<link rel='stylesheet' id='dp-formularios-css'[^>]*>\n?/g, '');
}

/* ---------- Inyección en una página ---------- */
function inyectar(html, pre, actual, esContacto) {
  html = limpiar(html);
  html = html.replace('</head>', `<link rel='stylesheet' id='dp-formularios-css' href='${pre}${THEME}/css/formularios.css' media='all' />\n</head>`);
  html = html.replace(/(<ul id="menu-main-menu" class="menu">[\s\S]*?<\/ul><\/div>)/,
    (m) => `${m}\n            ${menuCanales(pre, actual)}`);
  html = html.replace(/(<div class="col-lg-6 footer__links px-0">)/, `$1\n      ${footerCanales(pre)}`);
  if (esContacto) html = html.replace(/(\s*)<!-- mapa -->/, `$1${bloqueContacto(pre)}$1<!-- mapa -->`);
  return html;
}

/* ---------- Páginas de formulario ---------- */
function paginaFormulario(base, canal) {
  const pre = '../';
  let html = limpiar(base);
  const contenido = fs.readFileSync(path.join(FRAG, canal.slug + '.html'), 'utf8');
  const script = fs.readFileSync(path.join(FRAG, canal.slug + '.js'), 'utf8');

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${canal.tituloPagina} - Desarrollo País</title>`);
  html = html.replace(/<body class="[^"]*">/, `<body class="page page-template-formulario page-${canal.slug} wp-theme-naitus-theme-v2">`);
  // Contacto deja de ser la página actual en el menú
  html = html.replace(/ current-menu-item page_item page-item-38 current_page_item/, '');
  html = html.replace('<a href="index.html" aria-current="page">Contacto</a>', '<a href="../contacto/index.html">Contacto</a>');
  // Contenido
  html = html.replace(/<!-- banner -->[\s\S]*?(<div class="container-fluid bg-dark-blue footer">)/,
    () => `<!-- formulario: ${canal.slug} -->\n${subheader(pre, canal)}${contenido}\n<div class="container-fluid bg-dark-blue footer">`);
  // Scripts de Contact Form 7 / reCAPTCHA: no aplican aquí
  html = html.replace(/<script[^>]*id="(?:wp-hooks-js|wp-i18n-js|wp-i18n-js-after|swv-js|contact-form-7[^"]*|wpcf7[^"]*|naitus-cf7[^"]*|google-recaptcha-js|wp-polyfill-js)"[^>]*>[\s\S]*?<\/script>\n?/g, '');
  html = html.replace('</body>', `<script id="dp-formularios-js" src="${pre}${THEME}/js/formularios.js"></script>\n<script id="dp-formulario-${canal.slug}">\n${script}</script>\n</body>`);
  return inyectar(html, pre, canal.slug, false);
}

/* ---------- Recorrido ---------- */
function paginas(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['wp-content', 'wp-includes', 'tools', 'node_modules', '.git', '.claude'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) paginas(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

const contactoPath = path.join(ROOT, 'contacto', 'index.html');
const base = fs.readFileSync(contactoPath, 'utf8');

for (const c of CANALES) {
  const dest = path.join(ROOT, c.slug, 'index.html');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, paginaFormulario(base, c));
  console.log('generada', path.relative(ROOT, dest));
}

const slugs = new Set(CANALES.map(c => c.slug));
for (const file of paginas(ROOT)) {
  const rel = path.relative(ROOT, file).split(path.sep);
  if (slugs.has(rel[0])) continue;
  const pre = '../'.repeat(rel.length - 1);
  const html = fs.readFileSync(file, 'utf8');
  const out = inyectar(html, pre, null, rel[0] === 'contacto');
  if (out !== html) fs.writeFileSync(file, out);
  console.log('accesos  ', rel.join('/'));
}
