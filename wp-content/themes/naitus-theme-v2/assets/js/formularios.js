/* ===========================================================
   Desarrollo País — formularios de contacto (prototipo)
   JS sin dependencias. Nada se envía a un servidor: al enviar se
   muestra la confirmación. La integración real va en WordPress.
   =========================================================== */

/* ---------- Utilidades ---------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

/** Valor de un campo por name (input/select/textarea o radio marcado). */
function val(name, form) {
  const f = form || $('form.form-dp');
  if (!f) return '';
  const el = f.elements[name];
  if (!el) return '';
  if (el instanceof RadioNodeList || el.length !== undefined && !el.tagName) {
    const marcado = Array.from(el).find(e => e.checked);
    return marcado ? marcado.value : '';
  }
  if (el.type === 'checkbox') return el.checked ? (el.value || 'Sí') : '';
  return (el.value || '').trim();
}

/** Valores marcados de un grupo de checkboxes. */
function vals(name, form) {
  const f = form || $('form.form-dp');
  if (!f) return [];
  return $$(`input[name="${name}"]:checked`, f).map(e => e.value);
}

/** Convierte a nombre de carpeta seguro: "La Araucanía" -> "La-Araucania". */
function slug(txt) {
  return (txt || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9\s._-]/g, '')
    .trim().replace(/\s+/g, '-');
}

function pesoLegible(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function hoyISO() { return new Date().toISOString().slice(0, 10); }
function periodo() { return new Date().toISOString().slice(0, 7); } // AAAA-MM

/** Folio del tipo CV-2026-0412. */
function folio(prefijo) {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `${prefijo}-${new Date().getFullYear()}-${n}`;
}

/* ---------- Campos condicionales ----------
   data-ver-si="tipo=proyecto"      se muestra sólo con ese valor
   data-ocultar-si="tipo=proyecto"  desaparece con ese valor          */
function aplicarVisibilidad(bloque, visible) {
  bloque.hidden = !visible;
  // Los campos ocultos no deben bloquear el envío
  $$('input,select,textarea', bloque).forEach(el => {
    if (visible) { if (el.dataset.req === '1') el.required = true; }
    else { if (el.required) el.dataset.req = '1'; el.required = false; }
  });
}

function refrescarCondicionales(form) {
  $$('[data-ver-si]', form).forEach(bloque => {
    const [campo, valores] = bloque.dataset.verSi.split('=');
    aplicarVisibilidad(bloque, valores.split('|').includes(val(campo, form)));
  });
  $$('[data-ocultar-si]', form).forEach(bloque => {
    const [campo, valores] = bloque.dataset.ocultarSi.split('=');
    aplicarVisibilidad(bloque, !valores.split('|').includes(val(campo, form)));
  });
}

/* ---------- Contadores de caracteres ---------- */
function montarContadores(form) {
  $$('textarea[maxlength]', form).forEach(ta => {
    const out = $(`[data-contador="${ta.name}"]`, form);
    if (!out) return;
    const pintar = () => out.textContent = `${ta.value.length} / ${ta.maxLength} caracteres`;
    ta.addEventListener('input', pintar);
    pintar();
  });
}

/* ---------- "Paso 2 de 5" junto a cada título ---------- */
function montarProgreso(form) {
  const titulos = $$('.seccion-tit', form);
  const numeros = titulos.map(t => parseInt($('.paso', t).textContent, 10) || 0);
  const total = Math.max.apply(null, numeros.concat([0]));
  if (!total) return;
  titulos.forEach((t, i) => {
    const marca = document.createElement('span');
    marca.className = 'paso-de';
    marca.textContent = `Paso ${numeros[i]} de ${total}`;
    t.appendChild(marca);
  });
}

/* ---------- Zona de archivos ---------- */
function montarDropzones(form) {
  $$('.dropzone', form).forEach(zona => {
    const input = $('input[type=file]', zona);
    const lista = $(`[data-archivos="${input.name}"]`, form);
    const maxMB = parseFloat(zona.dataset.max || '10');

    // El input queda invisible pero enfocable: así se puede adjuntar con teclado
    input.setAttribute('aria-describedby', zona.id || '');

    function excede(f) { return f.size > maxMB * 1048576; }

    function pintarLista() {
      if (!lista) return;
      lista.innerHTML = '';
      Array.from(input.files).forEach((f, i) => {
        const li = document.createElement('li');
        if (excede(f)) { li.style.borderColor = '#E9A8A8'; li.style.background = '#FDF2F2'; }
        li.innerHTML = `<span aria-hidden="true">📄</span>
          <span class="nombre">${f.name}</span>
          <span class="peso">${pesoLegible(f.size)}${excede(f) ? ' · excede ' + maxMB + ' MB' : ''}</span>
          <button type="button" data-quitar="${i}" aria-label="Quitar ${f.name}" title="Quitar">&times;</button>`;
        lista.appendChild(li);
      });
    }

    // Quitar un archivo de la selección sin tener que elegirlos todos de nuevo
    if (lista) lista.addEventListener('click', e => {
      const btn = e.target.closest('[data-quitar]');
      if (!btn) return;
      const fuera = parseInt(btn.dataset.quitar, 10);
      const dt = new DataTransfer();
      Array.from(input.files).forEach((f, i) => { if (i !== fuera) dt.items.add(f); });
      input.files = dt.files;
      pintarLista();
      input.focus();
    });

    zona.addEventListener('click', e => {
      // El propio input ya abre el selector: no lo abramos dos veces
      if (e.target !== input) input.click();
    });
    zona.addEventListener('dragover', e => { e.preventDefault(); zona.classList.add('activa'); });
    zona.addEventListener('dragleave', () => zona.classList.remove('activa'));
    zona.addEventListener('drop', e => {
      e.preventDefault(); zona.classList.remove('activa');
      input.files = e.dataTransfer.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    input.addEventListener('focus', () => zona.classList.add('enfocada'));
    input.addEventListener('blur',  () => zona.classList.remove('enfocada'));
    input.addEventListener('change', pintarLista);

    zona._pintarLista = pintarLista;   // lo usa el botón Limpiar
  });
}

/** Archivos que pasan del límite de peso de su campo. */
function archivosExcedidos(form) {
  const malos = [];
  $$('.dropzone', form).forEach(zona => {
    const input = $('input[type=file]', zona);
    const maxMB = parseFloat(zona.dataset.max || '10');
    Array.from(input.files).forEach(f => {
      if (f.size > maxMB * 1048576) malos.push(`${f.name} (${pesoLegible(f.size)}, máximo ${maxMB} MB)`);
    });
  });
  return malos;
}

/* ---------- Mensajes de error dentro de la página ---------- */
function cajaError(form) {
  let caja = $('#error-form', form);
  if (!caja) {
    caja = document.createElement('div');
    caja.id = 'error-form';
    caja.className = 'error-form';
    caja.setAttribute('role', 'alert');
    caja.tabIndex = -1;
    caja.hidden = true;
    form.insertBefore(caja, $('.acciones', form));
  }
  return caja;
}

function mostrarError(form, mensaje) {
  const caja = cajaError(form);
  caja.innerHTML = `<span class="ico" aria-hidden="true">⚠️</span><div>${mensaje}</div>`;
  caja.hidden = false;
  caja.scrollIntoView({ behavior: 'smooth', block: 'center' });
  caja.focus();
}

function limpiarError(form) {
  const caja = $('#error-form', form);
  if (caja) caja.hidden = true;
}

/* ---------- Arranque común de una página de formulario ----------
   opciones = { prefijoFolio, validar(), armarRegistro(folio) }            */
function iniciarFormulario(opciones) {
  const form = $('form.form-dp');
  if (!form) return;

  montarDropzones(form);
  montarContadores(form);
  montarProgreso(form);
  refrescarCondicionales(form);

  const alCambiar = () => refrescarCondicionales(form);
  form.addEventListener('input', alCambiar);
  form.addEventListener('change', alCambiar);

  // Limpiar: confirma, y deja el formulario como recién abierto
  let resetSinPreguntar = false;
  form.addEventListener('reset', e => {
    if (!resetSinPreguntar &&
        !confirm('¿Borrar todo lo que has completado? Esta acción no se puede deshacer.')) {
      e.preventDefault();
      return;
    }
    resetSinPreguntar = false;
    // El reset del navegador ocurre después de este evento
    setTimeout(() => {
      $$('.dropzone', form).forEach(z => z._pintarLista && z._pintarLista());
      $$('textarea[maxlength]', form).forEach(ta => ta.dispatchEvent(new Event('input', { bubbles: true })));
      limpiarError(form);
      refrescarCondicionales(form);
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    limpiarError(form);

    if (!form.checkValidity()) { form.reportValidity(); return; }

    // Peso de los adjuntos
    const pesados = archivosExcedidos(form);
    if (pesados.length) {
      mostrarError(form, 'Hay archivos que superan el peso permitido: <b>' +
        pesados.join('</b>, <b>') + '</b>. Quítalos de la lista o reemplázalos por una versión más liviana.');
      return;
    }

    // Validaciones que HTML no cubre (por ejemplo, grupos de checkboxes)
    if (opciones.validar) {
      const error = opciones.validar();
      if (error) { mostrarError(form, error); return; }
    }

    const nro = folio(opciones.prefijoFolio);
    const registro = opciones.armarRegistro ? opciones.armarRegistro(nro) : { folio: nro };
    registro.folio = nro;
    registro.fecha = hoyISO();
    console.info('[prototipo] registro', registro);

    $('#bloque-formulario').style.display = 'none';
    const ok = $('#bloque-exito');
    ok.classList.add('visible');
    ok.setAttribute('role', 'status');
    ok.tabIndex = -1;
    ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    ok.focus();                       // lo anuncian los lectores de pantalla
  });

  const reiniciar = $('#btn-otro');
  if (reiniciar) reiniciar.addEventListener('click', () => {
    resetSinPreguntar = true;        // ya envió: no hay nada que confirmar
    form.reset();
    $$('.archivos', form).forEach(l => l.innerHTML = '');
    $('#bloque-exito').classList.remove('visible');
    $('#bloque-formulario').style.display = '';
    limpiarError(form);
    refrescarCondicionales(form);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
