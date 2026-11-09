(function ($) {
  if (typeof $ !== 'function' || !document.getElementById('copy') ||
      typeof window.ClipboardJS !== 'function' || typeof $.fn.tooltip !== 'function') return;
  jQuery("#copy").tooltip({
    trigger: "click",
    placement: "bottom",
  });

  function setTooltip(message) {
    jQuery("#copy")
      .tooltip("hide")
      .attr("data-original-title", message)
      .tooltip("show");
  }

  function hideTooltip() {
    setTimeout(function() {
      jQuery("#copy").tooltip("hide");
    }, 1000);
  }

  // Clipboard
  var clipboard = new ClipboardJS("#copy");

  clipboard.on("success", function(e) {
    setTooltip("Copiado!");
    hideTooltip();
  });

  clipboard.on("error", function(e) {
    setTooltip("Failed!");
    hideTooltip();
  });
})(window.jQuery);
