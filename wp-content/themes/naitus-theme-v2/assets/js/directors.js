(() => {
  // Card directores hover Arrow
  let hoverCard = document.querySelectorAll('.directores__card');

  [...hoverCard].forEach(function(element) {

      element.addEventListener('mouseover', function(e) {
          element.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#007CFA");
      });

      element.addEventListener('mouseout', function(e) {
          element.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#6E78AB");
      });

  });

  // Card comite hover Arrow
  let hoverCardComite = document.querySelectorAll('.comite__card');

  [...hoverCardComite].forEach(function(element) {

      element.addEventListener('mouseover', function(e) {
          element.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#007CFA");
      });

      element.addEventListener('mouseout', function(e) {
          element.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#6E78AB");
      });

  });
})();
