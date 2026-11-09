(() => {
  // Card Top hover Arrow
  let hoverCardTopArrow = document.querySelectorAll('.proyectos__card-top');

  [...hoverCardTopArrow].forEach(function(element) {

      element.addEventListener('mouseover', function(e) {
          element.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#FFFFFF");
      });

      element.addEventListener('mouseout', function(e) {
          element.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#6E78AB");
      });
  });
})();
