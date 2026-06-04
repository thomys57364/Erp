document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const respuesta = document.getElementById("respuesta");

    const usuarios = JSON.parse(localStorage.getItem("deuss_usuarios")) || [];
    const usuario = usuarios.find(u => u.correo === correo && u.password === password);

    if (!usuario) {
      respuesta.style.color = "red";
      respuesta.innerText = "Correo o contraseña incorrectos.";
      return;
    }

    respuesta.style.color = "green";
    respuesta.innerText = "Inicio de sesión exitoso";

    localStorage.setItem("nombreUsuario", usuario.nombre);
    localStorage.setItem("correoUsuario", usuario.correo);

    const volverA = localStorage.getItem("paginaAnterior") || "../../index.html";
    localStorage.removeItem("paginaAnterior");

    setTimeout(() => { window.location.href = volverA; }, 1200);
  });
});
