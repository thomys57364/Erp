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
    revealElements.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
  
      if (elementTop < windowHeight - 50) {
        el.classList.add('reveal-visible');
      }
    });
  }
  