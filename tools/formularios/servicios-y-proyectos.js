function esServicio() { return val('tipo') === 'Servicio'; }

function gerencia() {
  if (esServicio()) return 'Administración y Finanzas';
  const linea = val('linea');
  if (linea === 'Proyectos Digitales') return 'Proyectos Digitales';
  if (linea === 'Proyectos de Ciudad' || linea === 'Transporte y Movilidad' || linea === 'Equipamiento Público') return 'Proyectos de Ciudad';
  if (val('tipo') === 'Alianza') return 'Gerencia General';
  return linea ? 'Estructuración Financiera' : '';
}

function ubicacion() {
  const pais = val('pais');
  if (pais !== 'Chile') return pais;
  return val('region_e');
}

iniciarFormulario({
  prefijoFolio: 'REG',
  armarRegistro: function () {
    const tipo = val('tipo');
    const base = {
      'Tipo de registro': tipo,
      'Presenta': val('razon'),
      'RUT': val('rut_e'),
      'Giro': val('giro'),
      'Sitio web': val('web'),
      'Años de operación': val('antiguedad'),
      'País': val('pais'),
      'Región casa matriz': val('pais') === 'Chile' ? val('region_e') : 'No aplica',
      'Ciudad': val('ciudad'),
      'Contacto': val('contacto_e') + ' · ' + val('cargo_e'),
      'Correo': val('email_e'),
      'Teléfono': val('tel_e'),
      'Deriva a': gerencia()
    };

    const propio = esServicio() ? {
      'Servicios que presta': val('cat_servicio'),
      'Descripción y experiencia': val('descripcion_s'),
      'Experiencia sector público': val('exp_publico'),
      'Certificaciones': vals('certificaciones').join(', ')
    } : {
      'Nombre de la iniciativa': val('nombre_p'),
      'Línea de proyecto': val('linea'),
      'Región de emplazamiento': val('region_p'),
      'Etapa': val('etapa'),
      'Inversión estimada': val('monto'),
      'Plazo de ejecución': val('plazo'),
      'Modelo de negocio (referencial)': val('modelo'),
      'Situación del terreno': val('terreno_p'),
      'Descripción': val('descripcion_p'),
      'Impacto esperado': val('impacto'),
      'Avances': vals('avances').join(', ')
    };

    return {
      canal: 'Servicios y proyectos',
      titulo: esServicio() ? val('razon') : (val('nombre_p') || val('razon')),
      categoria: esServicio() ? 'Servicios de empresa' : (val('linea') || tipo),
      region: esServicio() ? ubicacion() : val('region_p'),
      ficha: Object.assign(base, propio)
    };
  }
});
