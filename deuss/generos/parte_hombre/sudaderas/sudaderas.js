document.addEventListener("DOMContentLoaded", () => {
  const contenedorNombre = document.getElementById("usuarioNombre");
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  if (!contenedorNombre) return;

  contenedorNombre.style.cursor = "pointer";

  // Definir destino y texto
  let destino, texto, tooltip;

  if (nombreUsuario) {
    const primerNombre = nombreUsuario.split(' ')[0];
    texto = `<i class="fa-solid fa-user"></i> ${primerNombre}`;
    tooltip = "Ver perfil";
    // Ruta relativa desde camisetas.html a editar perfil
    destino = "../../../editar_perfil/editar_perfil.html";
  } else {
    texto = `<i class="fa-solid fa-user"></i> Iniciar Sesión`;
    tooltip = "Iniciar sesión";
    // Ruta relativa desde camisetas.html a login
    destino = "../../../login_pagina/login.html";
  }

  // Asignar contenido
  contenedorNombre.innerHTML = texto;
  contenedorNombre.title = tooltip;

  // Al hacer clic, guardar ubicación actual y redirigir
  contenedorNombre.addEventListener("click", () => {
    // Guardamos la página actual para volver después si es necesario
    localStorage.setItem("paginaAnterior", "../generos/parte_hombre/sudaderas/sudaderas.html");

    window.location.href = destino;
  });
});