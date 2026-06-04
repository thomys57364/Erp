// Animación al cargar (solo para .fade-in)
window.addEventListener('load', () => {
  const fadeInSections = document.querySelectorAll('.fade-in');
  fadeInSections.forEach((section) => {
    section.style.animationPlayState = 'running';
  });

  // También revisamos si hay scroll reveals ya visibles al cargar
  revealOnScroll();
});

// Animación al hacer scroll (para .scroll-reveal)
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const windowHeight = window.innerHeight;
  const triggerOffset = windowHeight * 0.75; // Mostrar cuando el elemento está al 75% de la ventana

  revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 50; // Pixeles que deben ser visibles

      if (elementTop < windowHeight - elementVisible) {
          el.classList.add('reveal-visible');
      }
  });
}
