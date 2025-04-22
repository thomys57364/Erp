// Animación en cascada al cargar
window.addEventListener('load', () => {
    const fadeInElements = document.querySelectorAll('.fade-in');
  
    fadeInElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.10}s`; // Cascada rápida
      element.style.animationPlayState = 'running';
    });
  });
  