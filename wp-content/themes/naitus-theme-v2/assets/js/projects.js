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

  // Lineas de Proyectos hover Arrow
  let hoverCardTop = document.querySelectorAll('.proyectos__card-top');

  // ICO01
  hoverCardTop[0]?.addEventListener('mouseover', function(e) {
      hoverCardTop[0].querySelector(".lineas__card--ico-01")?.getSVGDocument?.()?.getElementById("lineas-ciudad")?.setAttribute("fill", "#FFF");
  });

  hoverCardTop[0]?.addEventListener('mouseout', function(e) {
      hoverCardTop[0].querySelector(".lineas__card--ico-01")?.getSVGDocument?.()?.getElementById("lineas-ciudad")?.setAttribute("fill", "#6E78AB");
  });

  // ICO02
  hoverCardTop[1]?.addEventListener('mouseover', function(e) {
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path11")?.setAttribute("fill", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path14")?.setAttribute("fill", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path16")?.setAttribute("fill", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20")?.setAttribute("fill", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20")?.setAttribute("stroke", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path22")?.setAttribute("fill", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path22")?.setAttribute("stroke", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path24")?.setAttribute("fill", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path24")?.setAttribute("stroke", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20-7")?.setAttribute("fill", "#FFF");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20-7")?.setAttribute("stroke", "#FFF");
  });

  hoverCardTop[1]?.addEventListener('mouseout', function(e) {
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path11")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path14")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path16")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20")?.setAttribute("stroke", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path22")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path22")?.setAttribute("stroke", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path24")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path24")?.setAttribute("stroke", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20-7")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20-7")?.setAttribute("stroke", "#6E78AB");
  });

  // ICO03
  hoverCardTop[2]?.addEventListener('mouseover', function(e) {
      hoverCardTop[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path02")?.setAttribute("fill", "#FFF");
      hoverCardTop[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path02")?.setAttribute("fill", "#FFF");
      hoverCardTop[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path03")?.setAttribute("fill", "#FFF");
      hoverCardTop[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path03")?.setAttribute("stroke", "#FFF");
  });

  hoverCardTop[2]?.addEventListener('mouseout', function(e) {
      hoverCardTop[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path02")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path02")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path03")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path03")?.setAttribute("stroke", "#6E78AB");
  });

  // ICO04
  hoverCardTop[3]?.addEventListener('mouseover', function(e) {
      hoverCardTop[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros01")?.setAttribute("fill", "#FFF");
      hoverCardTop[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros02")?.setAttribute("fill", "#FFF");
      hoverCardTop[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros03")?.setAttribute("fill", "#FFF");
      hoverCardTop[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros04")?.setAttribute("fill", "#FFF");
  });

  hoverCardTop[3]?.addEventListener('mouseout', function(e) {
      hoverCardTop[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros01")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros02")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros03")?.setAttribute("fill", "#6E78AB");
      hoverCardTop[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros04")?.setAttribute("fill", "#6E78AB");
  });
})();
