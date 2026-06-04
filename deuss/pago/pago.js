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
    localStorage.setItem("paginaAnterior", "../pago/pago.html");
    window.location.href = destino;
    });
}});

document.addEventListener("DOMContentLoaded", () => {
  const contenedorProductos = document.getElementById("productos-pago");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedorProductos.innerHTML = "<p>No hay productos en el carrito.</p>";
    return;
  }

  carrito.forEach(producto => {
    // Crear contenedor del producto
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto-item");

    // Imagen
    const img = document.createElement("img");
    img.src = producto.imagen ? `../../Imagenes/${producto.imagen}` : "https://via.placeholder.com/80";
    img.alt = producto.nombre;
    productoDiv.appendChild(img);

    // Info producto
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("producto-info");

    const nombreP = document.createElement("p");
    nombreP.classList.add("producto-nombre");
    nombreP.textContent = producto.nombre;
    infoDiv.appendChild(nombreP);

    const descripcionP = document.createElement("p");
    descripcionP.classList.add("producto-descripcion");
    descripcionP.textContent = producto.referencia; // o descripción si la tienes
    infoDiv.appendChild(descripcionP);

    const precioP = document.createElement("p");
    precioP.classList.add("producto-precio");
    precioP.textContent = `${producto.precio.toLocaleString()} COP`;
    infoDiv.appendChild(precioP);

    productoDiv.appendChild(infoDiv);

    // Añadir al contenedor
    contenedorProductos.appendChild(productoDiv);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const contenedorProductos = document.getElementById("productos-pago");
  const precioTotalValor = document.getElementById("precio-total-valor");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedorProductos.innerHTML = "<p>No hay productos en el carrito.</p>";
    precioTotalValor.textContent = "0 COP";
    return;
  }

  let total = 0;

  carrito.forEach(producto => {
    // Sumar al total (precio * cantidad)
    total += producto.precio * producto.cantidad;

    // Crear contenedor producto
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto-item");

    // Imagen
    const img = document.createElement("img");
    img.src = producto.imagen ? `../../Imagenes/${producto.imagen}` : "https://via.placeholder.com/80";
    img.alt = producto.nombre;
    productoDiv.appendChild(img);

    // Info
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("producto-info");

    const nombreP = document.createElement("p");
    nombreP.classList.add("producto-nombre");
    nombreP.textContent = producto.nombre;
    infoDiv.appendChild(nombreP);

    const descripcionP = document.createElement("p");
    descripcionP.classList.add("producto-descripcion");
    descripcionP.textContent = producto.referencia || "";
    infoDiv.appendChild(descripcionP);

    const precioP = document.createElement("p");
    precioP.classList.add("producto-precio");
    precioP.textContent = `${producto.precio.toLocaleString()} COP x ${producto.cantidad}`;
    infoDiv.appendChild(precioP);

    productoDiv.appendChild(infoDiv);

    contenedorProductos.appendChild(productoDiv);
  });

  // Mostrar total formateado con separadores de miles y "COP"
  precioTotalValor.textContent = total.toLocaleString() + " COP";
});
document.addEventListener("DOMContentLoaded", () => {
  const btnComprar = document.getElementById("btn-comprar");

  btnComprar.addEventListener("click", (e) => {
    e.preventDefault();

    alert("¡Transacción aprobada! Gracias por su compra.");

    // Limpia carrito
    localStorage.removeItem("carrito");

    // Redirige a página elección de género
    window.location.href = "../eleccion_genero/eleccion.html";
  });
});


