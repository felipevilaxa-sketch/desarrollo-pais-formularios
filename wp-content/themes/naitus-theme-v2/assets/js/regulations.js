(() => {
  // Informacion de Interes hover Arrow
  let hoverMarco = document.querySelectorAll('.marco-link__card');

  [...hoverMarco].forEach(function(element) {

      element.addEventListener('mouseover', function(e) {
          element.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#007CFA");
      });

      element.addEventListener('mouseout', function(e) {
          element.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#6E78AB");
      });

      element.addEventListener('mouseover', function(e) {
          element.querySelector(".download")?.getSVGDocument?.()?.getElementById("button-download")?.setAttribute("fill", "#007CFA");
      });

      element.addEventListener('mouseout', function(e) {
          element.querySelector(".download")?.getSVGDocument?.()?.getElementById("button-download")?.setAttribute("fill", "#6E78AB");
      });

  });
})();
