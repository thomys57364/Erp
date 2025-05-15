// Obtener los modales y botones
var modalAgregar = document.getElementById("modalAgregar");
var modalEditar = document.getElementById("modalEditar"); // Modal de editar cliente
var modalMensaje = document.getElementById("modalMensaje"); // Modal para el mensaje de éxito/error

var btnAgregar = document.getElementById("abrirModalAgregar");
var btnEditar = document.getElementsByClassName("btn-editar"); // Todos los botones de editar

var cerrarModalAgregar = document.getElementsByClassName("modal-cerrar")[0]; // Botón cerrar modal agregar
var cerrarModalEditar = document.getElementById("cerrarModalEditar"); // Botón cerrar modal editar
var cerrarModalMensaje = document.getElementById("cerrarModalMensaje"); // Botón cerrar modal mensaje

// Obtener el formulario de agregar cliente
var formAgregarCliente = document.getElementById("formAgregarCliente");

// Abrir el modal de agregar
btnAgregar.onclick = function() {
  modalAgregar.style.display = "block";
}

// Abrir el modal de editar (para cada cliente)
for (let i = 0; i < btnEditar.length; i++) {
  btnEditar[i].onclick = function() {
    modalEditar.style.display = "block";
    // Aquí podrías cargar los datos del cliente en el formulario de editar
  }
}

// Cerrar el modal de agregar
cerrarModalAgregar.onclick = function() {
  modalAgregar.style.display = "none";
}

// Cerrar el modal de editar
cerrarModalEditar.onclick = function() {
  modalEditar.style.display = "none";
}

// Cerrar el modal de mensaje
cerrarModalMensaje.onclick = function() {
  modalMensaje.style.display = "none";
}

// Cerrar los modales si se hace clic fuera de ellos
window.onclick = function(event) {
  if (event.target == modalAgregar) {
    modalAgregar.style.display = "none";
  } else if (event.target == modalEditar) {
    modalEditar.style.display = "none";
  } else if (event.target == modalMensaje) {
    modalMensaje.style.display = "none";
  }
}

// Enviar datos de agregar cliente mediante AJAX sin recargar la página
formAgregarCliente.onsubmit = function(event) {
  event.preventDefault(); // Evitar recarga de página

  var formData = new FormData(this); // Capturar datos del formulario

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "agregar_cliente.php", true);
  xhr.onload = function() {
    if (xhr.status == 200) {
      var respuesta = JSON.parse(xhr.responseText); // Recibir respuesta JSON
      document.getElementById("mensajeTexto").innerHTML = respuesta.mensaje; // Mostrar el mensaje
      modalMensaje.style.display = "block"; // Abrir modal de mensaje

      modalAgregar.style.display = "none"; // Cerrar modal agregar

      // Recargar la página después de mostrar el mensaje
      setTimeout(function() {
        location.reload();
      }, 1500); // 1.5 segundos
    } else {
      alert("Hubo un error al agregar el cliente.");
    }
  };
  xhr.send(formData);
};

// NOTA: 
// No existe aún el formulario de editar cliente, 
// por eso eliminamos el error que hacía que no funcionara el reload correctamente.
// Cuando implementes el formulario de editar, podrás agregar un código similar aquí.
