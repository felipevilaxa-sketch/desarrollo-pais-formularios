(() => {
  // Lineas de Proyectos hover Arrow
  let hoverLineCard = document.querySelectorAll('.lineas__card--item');

  // ICO01
  hoverLineCard[0]?.addEventListener('mouseover', function(e) {
      hoverLineCard[0].querySelector(".lineas__card--ico-01")?.getSVGDocument?.()?.getElementById("lineas-ciudad")?.setAttribute("fill", "#FFF");
  });

  hoverLineCard[0]?.addEventListener('mouseout', function(e) {
      hoverLineCard[0].querySelector(".lineas__card--ico-01")?.getSVGDocument?.()?.getElementById("lineas-ciudad")?.setAttribute("fill", "#6E78AB");
  });

  // ICO02
  hoverLineCard[1]?.addEventListener('mouseover', function(e) {
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path11")?.setAttribute("fill", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path14")?.setAttribute("fill", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path16")?.setAttribute("fill", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20")?.setAttribute("fill", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20")?.setAttribute("stroke", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path22")?.setAttribute("fill", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path22")?.setAttribute("stroke", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path24")?.setAttribute("fill", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path24")?.setAttribute("stroke", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20-7")?.setAttribute("fill", "#FFF");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20-7")?.setAttribute("stroke", "#FFF");
  });

  hoverLineCard[1]?.addEventListener('mouseout', function(e) {
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path11")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path14")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path16")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20")?.setAttribute("stroke", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path22")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path22")?.setAttribute("stroke", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path24")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path24")?.setAttribute("stroke", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20-7")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[1].querySelector(".lineas__card--ico-02")?.getSVGDocument?.()?.getElementById("path20-7")?.setAttribute("stroke", "#6E78AB");
  });

  // ICO03
  hoverLineCard[2]?.addEventListener('mouseover', function(e) {
      hoverLineCard[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path02")?.setAttribute("fill", "#FFF");
      hoverLineCard[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path02")?.setAttribute("fill", "#FFF");
      hoverLineCard[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path03")?.setAttribute("fill", "#FFF");
      hoverLineCard[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path03")?.setAttribute("stroke", "#FFF");
  });

  hoverLineCard[2]?.addEventListener('mouseout', function(e) {
      hoverLineCard[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path02")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path02")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path03")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[2].querySelector(".lineas__card--ico-03")?.getSVGDocument?.()?.getElementById("path03")?.setAttribute("stroke", "#6E78AB");
  });

  // ICO04
  hoverLineCard[3]?.addEventListener('mouseover', function(e) {
      hoverLineCard[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros01")?.setAttribute("fill", "#FFF");
      hoverLineCard[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros02")?.setAttribute("fill", "#FFF");
      hoverLineCard[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros03")?.setAttribute("fill", "#FFF");
      hoverLineCard[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros04")?.setAttribute("fill", "#FFF");
  });

  hoverLineCard[3]?.addEventListener('mouseout', function(e) {
      hoverLineCard[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros01")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros02")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros03")?.setAttribute("fill", "#6E78AB");
      hoverLineCard[3].querySelector(".lineas__card--ico-04")?.getSVGDocument?.()?.getElementById("otros04")?.setAttribute("fill", "#6E78AB");
  });
})();
