# Clon estático de desarrollopais.cl

Réplica en HTML, CSS y JavaScript del sitio https://desarrollopais.cl/ (portada y las páginas enlazadas desde ella),
para hacer ajustes en local y validarlos con el cliente.

## Ver en local

```bash
npx http-server . -p 8080 -c-1
```

Abrir http://localhost:8080/. También funciona abriendo `index.html` directo en el navegador, aunque se recomienda el servidor.

## Estructura

- `index.html`: portada.
- `<seccion>/index.html`: páginas interiores (sobre-desarrollo-pais, proyectos-desarrollo-pais, noticias, contacto, transparencia, etc.).
- `wp-content/themes/naitus-theme-v2/assets/css/main.css` y `responsive.css`: estilos principales del tema (aquí van la mayoría de los ajustes).
- `wp-content/themes/naitus-theme-v2/assets/js/`: scripts del tema (`main.js`, `home.js`, `navigation.js`).
- `wp-content/uploads/`: imágenes.
- `tools/mirror.mjs`: script que generó el clon (`node tools/mirror.mjs <carpeta> 1`).

## Formularios de contacto (prototipo con ajustes del cliente)

Tres canales nuevos: `trabaja-con-nosotros/`, `tienes-terrenos/` y `servicios-y-proyectos/`.
Se accede desde las tarjetas de Contacto, el submenú de Contacto en el menú lateral y la columna "Canales de contacto" del footer.

- Contenido de cada formulario: `tools/formularios/<slug>.html` y `<slug>.js`.
- Estilos: `wp-content/themes/naitus-theme-v2/assets/css/formularios.css`. Lógica: `assets/js/formularios.js`.
- Después de editar un fragmento o los textos de las tarjetas (`CANALES` en el script), regenera con:

```bash
node tools/formularios-build.mjs
```

El script regenera las 3 páginas desde la plantilla de `contacto/index.html` y vuelve a aplicar los accesos en todas las páginas. Se puede correr las veces que sea necesario.
Los formularios no envían datos: al enviar se muestra la confirmación.

## Limitaciones

- Los PDF, la versión en inglés (`/en/`) y las páginas no enlazadas desde la portada apuntan al sitio real.
- El formulario de contacto y el buscador dependen de WordPress: se ven igual, pero no envían ni buscan en local.
- El contenido corresponde a la fecha de la copia (5 de noviembre de 2026).
