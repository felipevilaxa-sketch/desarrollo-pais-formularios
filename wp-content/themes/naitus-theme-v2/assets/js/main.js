(() => {
// OWL Carousel
if (typeof window.jQuery === 'function') jQuery(document).ready(function(){
  const carousels = jQuery('.owl-carousel');
  if (!carousels.length || typeof jQuery.fn.owlCarousel !== 'function') return;
  carousels.owlCarousel({
    loop: false,
    items: 1,
    nav: true,
    dots: true,
    //animateOut: 'fadeOut',
    touchDrag: false,
    mouseDrag: false,
    responsive: {
      0: {
        touchDrag: true,
        mouseDrag: true,
      },
      768: {
        touchDrag: false,
        mouseDrag: false,
      }
    }
  });
});

// Embedded SVG documents may be unavailable while loading or blocked.
function setEmbeddedSvgFill(element, selector, id, color) {
  const svgObject = element.querySelector(selector);
  const svgDocument = svgObject?.getSVGDocument?.();
  svgDocument?.getElementById(id)?.setAttribute('fill', color);
}

// Noticias hover Arrow
let hoverNoticias = document.querySelectorAll('.noticias__card');

[...hoverNoticias].forEach(function(element) {

  element.addEventListener('mouseover' , function(e) {
    setEmbeddedSvgFill(element, ".arrow", "noticias-arrow", "#007CFA");
  });

  element.addEventListener('mouseout' , function(e) {
    setEmbeddedSvgFill(element, ".arrow", "noticias-arrow", "#6E78AB");
  });
});

// Informacion de Interes hover Arrow
let hoverInfoInteres = document.querySelectorAll('.info-interes__card');

[...hoverInfoInteres].forEach(function(element) {

  element.addEventListener('mouseover' , function(e) {
    setEmbeddedSvgFill(element, ".arrow", "noticias-arrow", "#007CFA");
  });

  element.addEventListener('mouseout' , function(e) {
    setEmbeddedSvgFill(element, ".arrow", "noticias-arrow", "#6E78AB");
  });

  element.addEventListener('mouseover' , function(e) {
    setEmbeddedSvgFill(element, ".download", "button-download", "#007CFA");
  });

  element.addEventListener('mouseout' , function(e) {
    setEmbeddedSvgFill(element, ".download", "button-download", "#6E78AB");
  });

});

// Banner Title hover Arrow
let hoverBanner = document.querySelectorAll('.carousel__item--inner-link');

[...hoverBanner].forEach(function(element) {

  element.addEventListener('mouseover' , function(e) {
    setEmbeddedSvgFill(element, ".arrow", "ico-line-w", "#CEE6FF");
  });

  element.addEventListener('mouseout' , function(e) {
    setEmbeddedSvgFill(element, ".arrow", "ico-line-w", "#FFF");
  });

});


if (typeof window.jQuery === 'function') jQuery(document).ready(function() {
   jQuery('#select-year').on('change', function() {
      this.form?.submit();
    });
});


})();
