// Animación al cargar todos los elementos con la clase .fade-in
window.addEventListener('load', () => {
    const fadeInElements = document.querySelectorAll('.fade-in');

    fadeInElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`; // Pequeño retraso en cascada
    element.style.animationPlayState = 'running';
    });
});  
