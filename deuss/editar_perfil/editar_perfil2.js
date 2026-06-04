document.addEventListener("DOMContentLoaded", () => {
  const correo = localStorage.getItem("correoUsuario");

  if (!correo) {
    window.location.href = "../login_pagina/login.html";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("deuss_usuarios")) || [];
  const usuario = usuarios.find(u => u.correo === correo);

  if (usuario) {
    document.getElementById("nombre").value = usuario.nombre || "";
    document.getElementById("correoOriginal").value = usuario.correo || "";
    document.getElementById("correo").value = usuario.correo || "";
    document.getElementById("direccion").value = usuario.direccion || "";
    document.getElementById("telefono").value = usuario.telefono || "";
  }

  document.getElementById("formRegistro").addEventListener("submit", function (e) {
    e.preventDefault();
    const correoOriginal = document.getElementById("correoOriginal").value;
    const nuevoNombre = document.getElementById("nombre").value.trim();
    const nuevoCorreo = document.getElementById("correo").value.trim();
    const nuevaDireccion = document.getElementById("direccion").value.trim();
    const nuevoTelefono = document.getElementById("telefono").value.trim();
    const respuesta = document.getElementById("respuesta");

    const usuarios = JSON.parse(localStorage.getItem("deuss_usuarios")) || [];
    const idx = usuarios.findIndex(u => u.correo === correoOriginal);

    if (idx !== -1) {
      usuarios[idx] = { ...usuarios[idx], nombre: nuevoNombre, correo: nuevoCorreo, direccion: nuevaDireccion, telefono: nuevoTelefono };
      localStorage.setItem("deuss_usuarios", JSON.stringify(usuarios));
      localStorage.setItem("nombreUsuario", nuevoNombre);
      localStorage.setItem("correoUsuario", nuevoCorreo);

      respuesta.style.color = "green";
      respuesta.innerText = "Cambios guardados correctamente.";

      setTimeout(() => {
        const volverA = localStorage.getItem("paginaAnterior") || "../../index.html";
        localStorage.removeItem("paginaAnterior");
        window.location.href = volverA;
      }, 1000);
    } else {
      respuesta.style.color = "red";
      respuesta.innerText = "Error al actualizar el perfil.";
    }
  });

  const cerrarBtn = document.getElementById("cerrarSesion");
  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("correoUsuario");
        window.location.href = "../../index.html";
      }
    });
  }
});
