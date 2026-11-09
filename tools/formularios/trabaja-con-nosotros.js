/* ---------------------------------------------------------------
   Convocatorias vigentes.
   Este arreglo es el que el equipo de Desarrollo País mantiene al día.
   Si queda vacío, la opción "Convocatoria vigente" desaparece del
   formulario y nadie puede postular a un proceso que no existe.
   --------------------------------------------------------------- */
const CONVOCATORIAS = [
  'Jefe/a de Proyectos de Transporte y Movilidad',
  'Analista de Estructuración Financiera'
];

(function montarConvocatorias() {
  const lista = document.getElementById('lista-convocatorias');
  const opcion = document.getElementById('opcion-convocatoria');

  if (!CONVOCATORIAS.length) {
    opcion.remove();              // no hay procesos abiertos: la opción no existe
    lista.closest('[data-ver-si]').remove();
    return;
  }

  opcion.hidden = false;
  lista.innerHTML = CONVOCATORIAS.map(function (c) {
    return '<label class="check"><input type="checkbox" name="convocatoria" value="' + c + '"> ' + c + '</label>';
  }).join('');
})();

iniciarFormulario({
  prefijoFolio: 'CV',
  validar: function () {
    const esConvocatoria = val('tipo_postulacion') === 'Convocatoria vigente';
    if (esConvocatoria && !vals('convocatoria').length) {
      return 'Marca la convocatoria a la que postulas (paso 2).';
    }
    if (!esConvocatoria && !vals('area').length) {
      return 'Selecciona al menos un área de interés (paso 3).';
    }
    return '';
  },
  armarRegistro: function (nro) {
    const esConvocatoria = val('tipo_postulacion') === 'Convocatoria vigente';
    const areas = vals('area');
    const convocatorias = vals('convocatoria');
    const categoria = esConvocatoria ? convocatorias.join(' / ') : (areas[0] || 'Sin área');

    return {
      canal: 'CV',
      titulo: (val('nombre') + ' ' + val('apellidos')).trim() || 'Postulante sin nombre',
      categoria: categoria,
      region: val('region'),
      ficha: {
        'Tipo de postulación': val('tipo_postulacion'),
        'Convocatoria': convocatorias.join(', ') || 'No aplica',
        'Área(s) de interés': areas.join(', ') || 'La define la convocatoria',
        'Nombre': val('nombre') + ' ' + val('apellidos'),
        'RUT o pasaporte': val('rut'),
        'Nacionalidad': val('nacionalidad'),
        'Correo': val('email'),
        'Teléfono': val('telefono'),
        'Región': val('region'),
        'Comuna': val('comuna'),
        'LinkedIn': val('linkedin'),
        'Profesión o título': val('profesion'),
        'Cargo al que aspira': val('cargo'),
        'Años de experiencia': val('experiencia'),
        'Disponibilidad': val('disponibilidad'),
        'Pretensión de renta líquida': val('renta'),
        'Experiencia relevante': vals('experiencia_rel').join(', '),
        'Motivación': val('resumen'),
        'Conflicto de interés': val('conflicto') === 'Si' ? val('conflicto_detalle') : 'No declara',
        'Cómo se enteró': val('canal_origen'),
        'Acepta futuras convocatorias': val('futuros') ? 'Sí' : 'No'
      }
    };
  }
});

/* Máximo 3 áreas */
document.addEventListener('change', function (e) {
  if (e.target.name === 'area' && vals('area').length > 3) {
    e.target.checked = false;
    alert('Puedes seleccionar hasta 3 áreas de interés.');
  }
});
