function superficieTexto() {
  return val('superficie') + ' ' + (val('unidad') === 'ha' ? 'ha' : 'm²');
}

iniciarFormulario({
  prefijoFolio: 'TER',
  armarRegistro: function () {
    return {
      canal: 'Terreno',
      titulo: val('comuna_t') + ' — ' + val('direccion'),
      categoria: val('uso_suelo'),
      region: val('region_t'),
      ficha: {
        'Relación con la propiedad': val('rel_propiedad'),
        'Nombre de contacto': val('contacto'),
        'Empresa o institución': val('entidad'),
        'Correo': val('email_of'),
        'Teléfono': val('tel_of'),
        'Región': val('region_t'),
        'Comuna': val('comuna_t'),
        'Dirección o referencia': val('direccion'),
        'Rol de avalúo': val('rol'),
        'Mapa o coordenadas': val('mapa'),
        'Superficie': superficieTexto(),
        'Uso de suelo (PRC)': val('uso_suelo'),
        'Construcciones': val('construcciones'),
        'Servicios disponibles': vals('servicios').join(', '),
        'Documentos adjuntos': vals('docs_tipo').join(', '),
        'Autoriza visita': val('visita') ? 'Sí' : 'No'
      }
    };
  }
});
