// Animación al cargar con nueva clase
window.addEventListener('load', () => {
    const elementosSlide = document.querySelectorAll('.slide-in-left');
  
    elementosSlide.forEach((el) => {
      el.classList.add('visible-slide');
    });
  });
  const formulario = document.getElementById("form-login");
const mensajeError = document.getElementById("mensaje-error");

// Simulación de datos válidos
const datosValidos = {
  correo: "admin@streetsync.com",
  contrasena: "admin123"
};

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const correoIngresado = document.getElementById("correo").value;
  const contrasenaIngresada = document.getElementById("contrasena").value;

  if (
    correoIngresado === datosValidos.correo &&
    contrasenaIngresada === datosValidos.contrasena
  ) {
    mensajeError.style.display = "none"; // ocultamos si estaba visible
    window.location.href = "../modulos/modulos.html";
  } else {
    mensajeError.style.display = "block"; // mostramos el mensaje
  }
});

