// Activar animaciones slide-in al cargar
window.addEventListener('load', () => {
    const elementosSlide = document.querySelectorAll('.slide-in-left');
  
    elementosSlide.forEach((el) => {
      el.classList.add('visible-slide');
    });
  });
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // evita el envío tradicional
  
    // Verifica que todos los campos requeridos estén llenos
    if (this.checkValidity()) {
      // Si todo está correcto, redirige
      window.location.href = "../inicio_admi/inicio_admi.html";
    } else {
      // Si hay errores, permite que el navegador los muestre
      this.reportValidity();
    }
  });
  