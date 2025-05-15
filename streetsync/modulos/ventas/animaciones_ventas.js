document.addEventListener('DOMContentLoaded', function () {
  // Modales y botones
  const modalAgregar = document.getElementById("modalAgregar");
  const modalEditar = document.getElementById("modalEditar");
  const modalConfirmarEliminar = document.getElementById('modalConfirmarEliminar');

  const btnAbrirAgregar = document.getElementById("abrirModalAgregar");
  const btnCerrarAgregar = modalAgregar.querySelector('.modal-cerrar');
  const btnCerrarEditar = document.getElementById("cerrarModalEditar");

  const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');
  const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
  const btnCerrarConfirmarEliminar = document.getElementById('cerrarModalConfirmarEliminar');

  const formAgregarVenta = document.getElementById("formAgregarVenta");
  const formEditarVenta = document.getElementById("formEditarVenta"); // Asumiendo que lo crees

  const btnEditar = document.getElementsByClassName("btn-editar");
  const btnEliminar = document.getElementsByClassName("btn-eliminar");

  let idAEliminar = null;

  // Abrir modal agregar
  btnAbrirAgregar.onclick = () => {
    modalAgregar.style.display = "block";
  };
  // Cerrar modal agregar
  btnCerrarAgregar.onclick = () => {
    modalAgregar.style.display = "none";
  };

  // Abrir modal editar con carga AJAX
  Array.from(btnEditar).forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-id');
    fetch(`editar_ventas.php?id=${id}`)
      .then(resp => resp.json())
      .then(data => {
        if (formEditarVenta) {
          formEditarVenta.querySelector('[name="reporte_id"]').value = data.reporte_id;
          
          formEditarVenta.querySelector('[name="fecha"]').value = data.fecha;
          formEditarVenta.querySelector('[name="cliente_nombre"]').value = data.cliente_nombre;
          formEditarVenta.querySelector('[name="producto_nombre"]').value = data.producto_nombre;
          formEditarVenta.querySelector('[name="cantidad"]').value = data.cantidad;
          formEditarVenta.querySelector('[name="precio_unitario"]').value = data.precio_unitario;
          modalEditar.style.display = "block";
        } else {
          alert('Formulario de edición no encontrado.');
        }
      })
      .catch(() => alert('Error al cargar los datos de la venta.'));
  });
});

  // Cerrar modal editar
  if (btnCerrarEditar) {
    btnCerrarEditar.onclick = () => {
      modalEditar.style.display = "none";
    };
  }

  // Confirmar eliminar
  Array.from(btnEliminar).forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      idAEliminar = btn.getAttribute('data-id');
      modalConfirmarEliminar.style.display = 'block';
    });
  });

  btnCancelarEliminar.onclick = () => {
    modalConfirmarEliminar.style.display = 'none';
    idAEliminar = null;
  };
  if (btnCerrarConfirmarEliminar) {
    btnCerrarConfirmarEliminar.onclick = () => {
      modalConfirmarEliminar.style.display = 'none';
      idAEliminar = null;
    };
  }
  btnConfirmarEliminar.onclick = () => {
    if (idAEliminar) {
      window.location.href = `eliminar_ventas.php?id=${idAEliminar}`;
    }
  };

  // Cerrar modales al hacer clic fuera
  window.onclick = e => {
    if (e.target === modalAgregar) modalAgregar.style.display = 'none';
    else if (e.target === modalEditar) modalEditar.style.display = 'none';
    else if (e.target === modalConfirmarEliminar) {
      modalConfirmarEliminar.style.display = 'none';
      idAEliminar = null;
    }
  };

  // Enviar formulario agregar venta via AJAX
  if (formAgregarVenta) {
    formAgregarVenta.onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(formAgregarVenta);
      fetch('agregar_ventas.php', {
        method: 'POST',
        body: formData
      })
      .then(resp => resp.json())
      .then(data => {
  // Mostrar mensaje en modalMensaje
  document.getElementById("mensajeTexto").textContent = data.mensaje || 'Venta agregada.';
  modalMensaje.style.display = 'block';
  modalAgregar.style.display = 'none';
  // Cerrar modalMensaje y recargar página después de 1.5 segundos
  setTimeout(() => {
    modalMensaje.style.display = 'none';
    location.reload();
  }, 1500);
})

      .catch(() => alert('Error al agregar la venta.'));
    };
  }

  // Enviar formulario editar venta via POST (con redirección normal)
  if (formEditarVenta) {
    formEditarVenta.onsubmit = e => {
      // Por simplicidad, se puede dejar que el formulario envíe normalmente
      // Si quieres AJAX, se puede adaptar luego
    };
  }
});
