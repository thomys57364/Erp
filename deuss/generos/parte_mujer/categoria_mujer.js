document.addEventListener("DOMContentLoaded", () => {
  const contenedorNombre = document.getElementById("usuarioNombre");
  const nombreUsuario = localStorage.getItem("nombreUsuario");
  if (!contenedorNombre) return;
  contenedorNombre.style.cursor = "pointer";
  let destino, texto;
  if (nombreUsuario) {
    const primerNombre = nombreUsuario.split(' ')[0];
    texto = `<i class="fa-solid fa-user"></i> ${primerNombre}`;
    destino = "../../../editar_perfil/editar_perfil.html";
  } else {
    texto = `<i class="fa-solid fa-user"></i> Iniciar Sesión`;
    destino = "../../../login_pagina/login.html";
  }
  contenedorNombre.innerHTML = texto;
  contenedorNombre.addEventListener("click", () => {
    localStorage.setItem("paginaAnterior", window.location.pathname);
    window.location.href = destino;
  });
});
