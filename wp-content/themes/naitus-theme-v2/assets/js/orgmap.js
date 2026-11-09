(() => {
  const el = document.getElementById('orgMap');
  if (!el || !window.L) return;
   if (!window.ORG_MAP_DATA || !ORG_MAP_DATA.imgUrl) return;
  const imgUrl = ORG_MAP_DATA.imgUrl;
  const probe = new Image();
  probe.decoding = 'async';

  probe.onload = function () {
    const w = probe.naturalWidth, h = probe.naturalHeight;
    const bounds = [[0,0],[h,w]];
    const center = [h/2, w/2];

    const map = L.map('orgMap', {
      crs: L.CRS.Simple,
      minZoom: -4,          // deja margen de maniobra para el cálculo
      maxZoom: 6,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      zoomControl: true,
      touchZoom: 'center',
    });

    L.imageOverlay(imgUrl, bounds, { interactive: true }).addTo(map);

    // Márgenes pequeños en 4 lados
    map.setMaxBounds([
      [ -h * 0.05, -w * 0.05 ],
      [  h * 1.05,  w * 1.05 ]
    ]);
    map.options.maxBoundsViscosity = 0.9;

    // --- FIT CONTAIN ESTABLE ---
    function computeContainZoom(padPx = 16) {
      const sz = map.getSize();
      const zx = (sz.x - padPx*2) / w;
      const zy = (sz.y - padPx*2) / h;
      let z = Math.log2(Math.min(zx, zy));     // CRS.Simple: scale = 2^zoom
      z = Math.min(z, map.getMaxZoom());
      z = Math.max(z, map.getMinZoom());
      return z;
    }

    function fitContain() {
      const z = computeContainZoom(16);        // padding visual 16px
      map.setView(center, z, { animate: false });
    }
    // --------------------------------

    map.whenReady(() => {
      fitContain();
      requestAnimationFrame(() => {            // asegura tamaño real del contenedor
        map.invalidateSize();
        fitContain();
      });
    });

    const relayout = () => { map.invalidateSize(); fitContain(); };
    window.addEventListener('resize', relayout, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(el);

    // Botón "Reiniciar vista"
    const reset = document.querySelector('[data-orgmap-reset]');
    if (reset) {
      reset.disabled = false;
      reset.addEventListener('click', () => { map.invalidateSize(); fitContain(); });
    }

    // (Opcional) Doble click zoom
    map.on('dblclick', () => map.zoomIn());
  };
  probe.src = imgUrl;
})();
