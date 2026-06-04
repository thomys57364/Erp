document.addEventListener("DOMContentLoaded", () => {
  const contenedorNombre = document.getElementById("usuarioNombre");
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  if (contenedorNombre) {
    contenedorNombre.style.cursor = "pointer";
    let destino, texto;
    if (nombreUsuario) {
      const primerNombre = nombreUsuario.split(' ')[0];
      texto = `<i class="fa-solid fa-user"></i> ${primerNombre}`;
      destino = "../../../../editar_perfil/editar_perfil.html";
    } else {
      texto = `<i class="fa-solid fa-user"></i> Iniciar Sesión`;
      destino = "../../../../login_pagina/login.html";
    }
    contenedorNombre.innerHTML = texto;
    contenedorNombre.addEventListener("click", () => {
      localStorage.setItem("paginaAnterior", window.location.pathname);
      window.location.href = destino;
    });
  }

  document.querySelectorAll(".talla-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".talla-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  const btnAñadir = document.querySelector("#btn-añadir-cesta");
  const nombre = document.querySelector("#nombre-producto")?.textContent;
  const precioTexto = document.querySelector("#precio-producto")?.textContent;
  const referencia = document.querySelector("#referencia-producto")?.textContent;
  const imagenAttr = document.querySelector(".detalle-producto")?.dataset.imagen || "";

  if (btnAñadir) {
    btnAñadir.addEventListener("click", () => {
      const tallaSeleccionada = document.querySelector(".talla-btn.selected")?.textContent;
      const cantidadSeleccionada = parseInt(document.querySelector("#cantidad-producto")?.value);
      if (!tallaSeleccionada || isNaN(cantidadSeleccionada)) {
        alert("Por favor selecciona talla y cantidad.");
        return;
      }
      const precio = parseInt(precioTexto.replace(/[^\d]/g, ""));
      const producto = {
        nombre: nombre.trim(),
        precio,
        referencia: referencia.trim(),
        talla: tallaSeleccionada.trim(),
        cantidad: cantidadSeleccionada,
        imagen: imagenAttr
      };
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const existente = carrito.find(p => p.referencia === producto.referencia && p.talla === producto.talla);
      if (existente) {
        existente.cantidad += producto.cantidad;
      } else {
        carrito.push(producto);
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Producto añadido al carrito.");
    });
  }
});
