document.addEventListener("DOMContentLoaded", () => {
  // Manejo usuario
  const contenedorNombre = document.getElementById("usuarioNombre");
  const nombreUsuario = localStorage.getItem("nombreUsuario");

  if (contenedorNombre) {
    contenedorNombre.style.cursor = "pointer";

    let destino, texto, tooltip;

    if (nombreUsuario) {
      const primerNombre = nombreUsuario.split(' ')[0];
      texto = `<i class="fa-solid fa-user"></i> ${primerNombre}`;
      tooltip = "Ver perfil";
      destino = "../editar_perfil/editar_perfil.html";
    } else {
      texto = `<i class="fa-solid fa-user"></i> Iniciar Sesión`;
      tooltip = "Iniciar sesión";
      destino = "../../login_pagina/login.html";
    }

    contenedorNombre.innerHTML = texto;
    contenedorNombre.title = tooltip;

    contenedorNombre.addEventListener("click", () => {
      localStorage.setItem("paginaAnterior", "../carrito/carrito.html");
      window.location.href = destino;
    });
  }

  // Carrito
  const mensajeVacio = document.getElementById("mensaje-vacio");
  const contenedorProductos = document.getElementById("productos-carrito");
  const btnContinuar = document.getElementById("btn-continuar");

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function renderizarCarrito() {
    contenedorProductos.innerHTML = "";

    if (carrito.length === 0) {
      mensajeVacio.style.display = "block";
      contenedorProductos.style.display = "none";
      btnContinuar.style.display = "none";
      return;
    }

    mensajeVacio.style.display = "none";
    contenedorProductos.style.display = "flex";
    btnContinuar.style.display = "block";

    carrito.forEach((producto, index) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("carrito-producto");

      // Imagen: construimos ruta con base ../Imagenes/ + nombre archivo
      const img = document.createElement("img");
      img.src = producto.imagen ? `../../Imagenes/${producto.imagen.replace(/^\/+/, '')}` : "https://via.placeholder.com/100";


      img.alt = producto.nombre;
      productoDiv.appendChild(img);

      // Detalles
      const detalleDiv = document.createElement("div");
      detalleDiv.classList.add("detalle-producto");

      const nombreP = document.createElement("p");
      nombreP.classList.add("nombre-producto");
      nombreP.textContent = producto.nombre;
      detalleDiv.appendChild(nombreP);

      const precioP = document.createElement("p");
      precioP.classList.add("precio-producto");
      precioP.textContent = `${producto.precio.toLocaleString()} COP`;
      detalleDiv.appendChild(precioP);

      const referenciaP = document.createElement("p");
      referenciaP.textContent = `Ref: ${producto.referencia}`;
      detalleDiv.appendChild(referenciaP);

      const tallaP = document.createElement("p");
      tallaP.textContent = `Talla: ${producto.talla}`;
      detalleDiv.appendChild(tallaP);

      productoDiv.appendChild(detalleDiv);

      // Cantidad
      const cantidadDiv = document.createElement("div");
      cantidadDiv.classList.add("cantidad-control");

      const btnMenos = document.createElement("button");
      btnMenos.textContent = "-";
      btnMenos.addEventListener("click", () => {
        if (producto.cantidad > 1) {
          producto.cantidad--;
          actualizarCarrito();
        }
      });

      const spanCantidad = document.createElement("span");
      spanCantidad.textContent = producto.cantidad;

      const btnMas = document.createElement("button");
      btnMas.textContent = "+";
      btnMas.addEventListener("click", () => {
        producto.cantidad++;
        actualizarCarrito();
      });

      cantidadDiv.appendChild(btnMenos);
      cantidadDiv.appendChild(spanCantidad);
      cantidadDiv.appendChild(btnMas);

      productoDiv.appendChild(cantidadDiv);

      // Botón eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("eliminar");
      btnEliminar.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      btnEliminar.title = "Eliminar producto";
      btnEliminar.addEventListener("click", () => {
        carrito.splice(index, 1);
        actualizarCarrito();
      });

      productoDiv.appendChild(btnEliminar);

      contenedorProductos.appendChild(productoDiv);
    });
  }

  function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
  }

  renderizarCarrito();

  btnContinuar.addEventListener("click", () => {
  window.location.href= "../pago/pago.html";
  });
});
