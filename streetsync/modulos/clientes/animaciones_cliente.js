const KEY_CLIENTES = 'erp_clientes';

function initClientes() {
  if (localStorage.getItem(KEY_CLIENTES + '_init')) return;
  const demo = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan.perez@email.com', telefono: '3001234567', direccion: 'Calle 45 #23-10, Bogotá', fecha_registro: '2025-01-05' },
    { id: 2, nombre: 'María García', correo: 'maria.garcia@email.com', telefono: '3009876543', direccion: 'Carrera 15 #30-20, Medellín', fecha_registro: '2025-01-10' },
    { id: 3, nombre: 'Carlos López', correo: 'carlos.lopez@email.com', telefono: '3007654321', direccion: 'Calle 80 #50-30, Cali', fecha_registro: '2025-01-15' },
    { id: 4, nombre: 'Ana Martínez', correo: 'ana.martinez@email.com', telefono: '3003456789', direccion: 'Carrera 7 #100-50, Bogotá', fecha_registro: '2025-02-01' },
    { id: 5, nombre: 'Pedro Jiménez', correo: 'pedro.jimenez@email.com', telefono: '3001122334', direccion: 'Calle 13 #45-10, Barranquilla', fecha_registro: '2025-02-10' },
  ];
  localStorage.setItem(KEY_CLIENTES, JSON.stringify(demo));
  localStorage.setItem(KEY_CLIENTES + '_init', '1');
}

function getClientes() { return JSON.parse(localStorage.getItem(KEY_CLIENTES)) || []; }
function setClientes(d) { localStorage.setItem(KEY_CLIENTES, JSON.stringify(d)); }

function renderTablaClientes(filtro) {
  let clientes = getClientes();
  if (filtro) {
    const q = filtro.toLowerCase();
    clientes = clientes.filter(c =>
      c.nombre.toLowerCase().includes(q) ||
      c.correo.toLowerCase().includes(q)
    );
  }
  const container = document.getElementById('tabla-container');
  if (clientes.length === 0) {
    container.innerHTML = '<p>No se encontraron clientes.</p>';
    return;
  }
  let html = `<div class="tabla-container"><table class="tabla-clientes">
    <tr><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Dirección</th><th>Fecha de Registro</th><th>Acciones</th></tr>`;
  clientes.forEach(c => {
    html += `<tr>
      <td>${c.nombre}</td>
      <td>${c.correo}</td>
      <td>${c.telefono}</td>
      <td>${c.direccion}</td>
      <td>${c.fecha_registro || ''}</td>
      <td>
        <button class="btn-editar" data-id="${c.id}">Editar</button>
        <button class="btn-eliminar" data-id="${c.id}">Eliminar</button>
      </td></tr>`;
  });
  html += '</table></div>';
  container.innerHTML = html;
  attachClientesListeners();
}

let idClienteEliminar = null;

function attachClientesListeners() {
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const c = getClientes().find(x => x.id === id);
      if (!c) return;
      document.getElementById('editClienteId').value = c.id;
      document.getElementById('editNombre').value = c.nombre;
      document.getElementById('editEmail').value = c.correo;
      document.getElementById('editTelefono').value = c.telefono;
      document.getElementById('editDireccion').value = c.direccion;
      document.getElementById('modalEditar').style.display = 'block';
    });
  });
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => {
      idClienteEliminar = Number(btn.dataset.id);
      document.getElementById('modalConfirmarEliminar').style.display = 'block';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initClientes();
  renderTablaClientes();

  const mA = document.getElementById('modalAgregar');
  const mE = document.getElementById('modalEditar');
  const mM = document.getElementById('modalMensaje');
  const mC = document.getElementById('modalConfirmarEliminar');

  function showMsg(txt) {
    document.getElementById('mensajeTexto').textContent = txt;
    mM.style.display = 'block';
    setTimeout(() => {
      mM.style.display = 'none';
      renderTablaClientes(document.getElementById('inputBuscar').value);
    }, 1500);
  }

  document.getElementById('abrirModalAgregar').onclick = () => mA.style.display = 'block';
  mA.querySelector('.modal-cerrar').onclick = () => mA.style.display = 'none';
  document.getElementById('cerrarModalEditar').onclick = () => mE.style.display = 'none';
  document.getElementById('cerrarModalMensaje').onclick = () => mM.style.display = 'none';
  document.getElementById('cerrarModalConfirmarEliminar').onclick = () => { mC.style.display = 'none'; idClienteEliminar = null; };
  document.getElementById('btnCancelarEliminar').onclick = () => { mC.style.display = 'none'; idClienteEliminar = null; };

  document.getElementById('btnConfirmarEliminar').onclick = () => {
    if (idClienteEliminar !== null) {
      setClientes(getClientes().filter(c => c.id !== idClienteEliminar));
      mC.style.display = 'none';
      idClienteEliminar = null;
      showMsg('Cliente eliminado.');
    }
  };

  document.getElementById('formAgregarCliente').onsubmit = e => {
    e.preventDefault();
    const f = e.target;
    const clientes = getClientes();
    clientes.push({
      id: Date.now(),
      nombre: f.nombre.value.trim(),
      correo: f.correo.value.trim(),
      telefono: f.telefono.value.trim(),
      direccion: f.direccion.value.trim(),
      fecha_registro: new Date().toISOString().split('T')[0]
    });
    setClientes(clientes);
    f.reset();
    mA.style.display = 'none';
    showMsg('Cliente agregado correctamente.');
  };

  document.getElementById('formEditarCliente').onsubmit = e => {
    e.preventDefault();
    const f = e.target;
    const id = Number(document.getElementById('editClienteId').value);
    const clientes = getClientes();
    const idx = clientes.findIndex(c => c.id === id);
    if (idx !== -1) {
      clientes[idx] = { ...clientes[idx], nombre: document.getElementById('editNombre').value.trim(), correo: document.getElementById('editEmail').value.trim(), telefono: document.getElementById('editTelefono').value.trim(), direccion: document.getElementById('editDireccion').value.trim() };
      setClientes(clientes);
    }
    mE.style.display = 'none';
    showMsg('Cliente actualizado correctamente.');
  };

  document.getElementById('btnBuscar').onclick = () => renderTablaClientes(document.getElementById('inputBuscar').value.trim());
  document.getElementById('inputBuscar').addEventListener('keydown', e => { if (e.key === 'Enter') renderTablaClientes(e.target.value.trim()); });

  window.onclick = e => {
    if (e.target === mA) mA.style.display = 'none';
    if (e.target === mE) mE.style.display = 'none';
    if (e.target === mC) { mC.style.display = 'none'; idClienteEliminar = null; }
  };
});
