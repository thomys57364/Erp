// Animación automática al cargar para todos los elementos con la clase .fade-in
window.addEventListener('load', () => {
    const fadeInElements = document.querySelectorAll('.fade-in');

    fadeInElements.forEach((element) => {
    element.style.animationPlayState = 'running';
    });
});
// Animación de entrada para el formulario de inicio de sesión  