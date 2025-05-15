// Obtener los modales y botones
var modalAgregar = document.getElementById("modalAgregar");
var modalMensaje = document.getElementById("modalMensaje");

var btnAgregar = document.getElementById("abrirModalAgregar");

var cerrarModalAgregar = document.getElementsByClassName("modal-cerrar")[0];
var cerrarModalMensaje = document.getElementById("cerrarModalMensaje");

// Obtener el formulario de agregar venta (no cliente)
var formAgregarVenta = document.getElementById("formAgregarVenta");

// Abrir el modal de agregar venta
btnAgregar.onclick = function() {
  modalAgregar.style.display = "block";
}

// Cerrar el modal de agregar
cerrarModalAgregar.onclick = function() {
  modalAgregar.style.display = "none";
}

// Cerrar el modal de mensaje
cerrarModalMensaje.onclick = function() {
  modalMensaje.style.display = "none";
}

// Cerrar modal si se hace clic fuera
window.onclick = function(event) {
  if (event.target == modalAgregar) {
    modalAgregar.style.display = "none";
  } else if (event.target == modalMensaje) {
    modalMensaje.style.display = "none";
  }
}

// Enviar datos de agregar venta mediante AJAX sin recargar la página
formAgregarVenta.onsubmit = function(event) {
  event.preventDefault(); // Evitar recarga de página

  var formData = new FormData(this); // Capturar datos

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "agregar_ventas.php", true); // Ahora va a agregar_ventas.php
  xhr.onload = function() {
    if (xhr.status == 200) {
      var respuesta = JSON.parse(xhr.responseText); // Recibir respuesta JSON
      document.getElementById("mensajeTexto").innerHTML = respuesta.mensaje; // Poner el mensaje en el modal
      modalMensaje.style.display = "block"; // Mostrar modal de mensaje

      modalAgregar.style.display = "none"; // Cerrar modal de agregar venta

      // Opcional: recargar la página después de unos segundos
      setTimeout(function() {
        location.reload();
      }, 1500); // 1.5 segundos
    } else {
      alert("Hubo un error al agregar la venta.");
    }
  };
  xhr.send(formData);
};
