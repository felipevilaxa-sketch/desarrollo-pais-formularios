(() => {
  // Subheader hover Arrow
  let hoverSubheader = document.querySelector('.--subheader-link__btn');

  hoverSubheader?.addEventListener('mouseover', function(e) {
      hoverSubheader.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#007CFA");
  });

  hoverSubheader?.addEventListener('mouseout', function(e) {
      hoverSubheader.querySelector(".arrow")?.getSVGDocument?.()?.getElementById("noticias-arrow")?.setAttribute("fill", "#6E78AB");
  });
})();
