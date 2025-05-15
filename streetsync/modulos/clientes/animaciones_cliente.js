// Obtener los modales y botones
document.addEventListener('DOMContentLoaded', function() {
var modalAgregar = document.getElementById("modalAgregar");
var modalEditar = document.getElementById("modalEditar"); // Modal de editar cliente
var modalMensaje = document.getElementById("modalMensaje"); // Modal para el mensaje de éxito/error

var btnAgregar = document.getElementById("abrirModalAgregar");
var btnEditar = document.getElementsByClassName("btn-editar"); // Todos los botones de editar

var cerrarModalAgregar = document.getElementsByClassName("modal-cerrar")[0]; // Botón cerrar modal agregar
var cerrarModalEditar = document.getElementById("cerrarModalEditar"); // Botón cerrar modal editar
var cerrarModalMensaje = document.getElementById("cerrarModalMensaje"); // Botón cerrar modal mensaje

  const modalConfirmarEliminar = document.getElementById('modalConfirmarEliminar');
  const btnCerrarConfirmarEliminar = document.getElementById('cerrarModalConfirmarEliminar');
  const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');
  const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');

// Obtener el formulario de agregar cliente
var formAgregarCliente = document.getElementById("formAgregarCliente");

// Abrir el modal de agregar
btnAgregar.onclick = function() {
  modalAgregar.style.display = "block";
}

// Abrir el modal de editar (para cada cliente)
for (let i = 0; i < btnEditar.length; i++) {
  btnEditar[i].onclick = function() {
    const clienteId = this.getAttribute('data-id');
    fetch('editar_cliente.php?id=' + clienteId)
      .then(response => response.json())
      .then(data => {
        // Rellenar inputs del modal
        document.getElementById('editClienteId').value = data.cliente_id;
        document.getElementById('editNombre').value = data.nombre;
        document.getElementById('editApellido').value = data.apellido;
        document.getElementById('editEmail').value = data.email;
        document.getElementById('editTelefono').value = data.telefono;
        document.getElementById('editDireccion').value = data.direccion;

        // Mostrar modal
        modalEditar.style.display = "block";
      })
      .catch(error => {
        alert('Error al cargar datos del cliente: ' + error);
      });
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

// Cerrar los modales si se hace clic fuera de ellos (sin interferir con otros modales)
window.onclick = function(event) {
  if (event.target == modalAgregar) {
    modalAgregar.style.display = "none";
  } else if (event.target == modalEditar) {
    modalEditar.style.display = "none";
  } else if (event.target == modalMensaje) {
    modalMensaje.style.display = "none";
  } else if (event.target == modalConfirmarEliminar) {
      modalConfirmarEliminar.style.display = 'none';
      idAEliminar = null;
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

// Variable para guardar el enlace de eliminar seleccionado
let idAEliminar = null;

// Asignar evento click a todos los botones "Eliminar" de la tabla
 document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      idAEliminar = this.getAttribute('data-id');
      modalConfirmarEliminar.style.display = 'block';
    });
  });

// Cancelar eliminar (botón cancelar)
btnCancelarEliminar.onclick = function () {
    modalConfirmarEliminar.style.display = 'none';
    idAEliminar = null;
  };

// Confirmar eliminar (botón eliminar)
btnConfirmarEliminar.onclick = function () {
    if (idAEliminar) {
      window.location.href = 'eliminar_cliente.php?id=' + idAEliminar;
    }
  };

  // Cerrar modal con la X (cruz)
  if (btnCerrarConfirmarEliminar) {
    btnCerrarConfirmarEliminar.onclick = function () {
    modalConfirmarEliminar.style.display = 'none';
    idAEliminar = null;
  };
  }
});