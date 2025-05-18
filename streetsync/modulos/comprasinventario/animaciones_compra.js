document.addEventListener('DOMContentLoaded', () => {
  const modalAgregar            = document.getElementById("modalAgregar");
  const modalEditar             = document.getElementById("modalEditar");
  const modalConfirmarEliminar  = document.getElementById("modalConfirmarEliminar");
  const modalMensaje            = document.getElementById("modalMensaje");

  const btnAbrirAgregar         = document.getElementById("abrirModalAgregar");
  const btnCerrarAgregar        = modalAgregar.querySelector('.modal-cerrar');
  const btnCerrarEditar         = document.getElementById("cerrarModalEditar");
  const btnCerrarMensaje        = document.getElementById("cerrarModalMensaje");
  const btnCerrarConfirmar      = document.getElementById("cerrarModalConfirmarEliminar");

  const formAgregar             = document.getElementById("formAgregarVenta");
  const formEditar              = document.getElementById("formEditarVenta");

  const btnEditar               = document.getElementsByClassName("btn-editar");
  const btnEliminar             = document.getElementsByClassName("btn-eliminar");

  let idAEliminar = null;

  // Abrir/Cerrar Agregar
  btnAbrirAgregar.onclick = () => modalAgregar.style.display = "block";
  btnCerrarAgregar .onclick = () => modalAgregar.style.display = "none";

  // Cerrar Mensaje
  btnCerrarMensaje.onclick = () => modalMensaje.style.display = "none";

  // Abrir Editar con AJAX
  Array.from(btnEditar).forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      fetch(`editar_compra.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
          // asigna el hidden correctamente
          formEditar.querySelector('input[name="id"]').value            = data.id;
          formEditar.querySelector('input[name="nombre"]').value        = data.nombre;
          formEditar.querySelector('input[name="ventas"]').value        = data.ventas;
          formEditar.querySelector('input[name="pagos"]').value         = data.pagos;
          formEditar.querySelector('input[name="facturacion"]').value   = data.facturacion;
          modalEditar.style.display = "block";
        })
        .catch(() => alert('Error al cargar datos.'));
    });
  });

  // Cerrar Editar
  btnCerrarEditar.onclick = () => modalEditar.style.display = "none";

  // Preparar Eliminar
  Array.from(btnEliminar).forEach(btn => {
    btn.addEventListener('click', () => {
      idAEliminar = btn.getAttribute('data-id');
      modalConfirmarEliminar.style.display = "block";
    });
  });
  document.getElementById("btnCancelarEliminar").onclick = () => {
    modalConfirmarEliminar.style.display = "none";
    idAEliminar = null;
  };
  btnCerrarConfirmar.onclick = () => {
    modalConfirmarEliminar.style.display = "none";
    idAEliminar = null;
  };
  document.getElementById("btnConfirmarEliminar").onclick = () => {
    if (idAEliminar) window.location.href = `eliminar_compra.php?id=${idAEliminar}`;
  };

  // Cerrar modales al hacer clic fuera
  window.onclick = e => {
    if (e.target === modalAgregar)          modalAgregar.style.display = "none";
    if (e.target === modalEditar)           modalEditar.style.display = "none";
    if (e.target === modalConfirmarEliminar) modalConfirmarEliminar.style.display = "none";
  };

  // Enviar Agregar via AJAX
  formAgregar.onsubmit = e => {
    e.preventDefault();
    fetch('agregar_compra.php', {
      method: 'POST',
      body: new FormData(formAgregar)
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("mensajeTexto").textContent = data.mensaje;
      modalMensaje.style.display = "block";
      modalAgregar .style.display = "none";
      setTimeout(() => location.reload(), 1500);
    })
    .catch(() => alert('Error al agregar.'));
  };
});
