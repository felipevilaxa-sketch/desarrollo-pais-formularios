(() => {
 document.addEventListener("DOMContentLoaded", function() {
        var modalOrganigrama = document.getElementById("organigramaModal");
         if (!modalOrganigrama) {
            return;
        }

        var imgOrganigrama = document.querySelector(".organigrama-img");
        var modalImgFull = document.getElementById("organigramaFull");
        var buttonCloseOrganigrama = document.getElementsByClassName("organigrama-close")[0];
     	

        if (!imgOrganigrama || !modalImgFull || !buttonCloseOrganigrama) return;

        imgOrganigrama.onclick = function() {
            modalOrganigrama.style.display = "block";
            modalImgFull.src = this.src;
        }

        buttonCloseOrganigrama.onclick = function() {
            modalOrganigrama.style.display = "none";
        }

        modalOrganigrama.onclick = function(e) {
            if (e.target === modalOrganigrama) {
                modalOrganigrama.style.display = "none";
            }
        }
    });



})();
