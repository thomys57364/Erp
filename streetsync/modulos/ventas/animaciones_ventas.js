const KEY_VENTAS = 'erp_ventas';

function initVentas() {
  if (localStorage.getItem(KEY_VENTAS + '_init')) return;
  const demo = [
    { reporte_id: 1, fecha: '2025-01-10T09:00', cliente_nombre: 'Juan Pérez', producto_nombre: 'Camisa manga corta de cuadros', cantidad: 2, precio_unitario: 150000, total: 300000 },
    { reporte_id: 2, fecha: '2025-01-12T14:30', cliente_nombre: 'María García', producto_nombre: 'Jean slim fit azul', cantidad: 1, precio_unitario: 120000, total: 120000 },
    { reporte_id: 3, fecha: '2025-02-05T11:00', cliente_nombre: 'Carlos López', producto_nombre: 'Sudadera con capucha negra', cantidad: 3, precio_unitario: 95000, total: 285000 },
    { reporte_id: 4, fecha: '2025-02-18T16:45', cliente_nombre: 'Ana Martínez', producto_nombre: 'Short deportivo azul', cantidad: 2, precio_unitario: 75000, total: 150000 },
    { reporte_id: 5, fecha: '2025-03-01T10:00', cliente_nombre: 'Pedro Jiménez', producto_nombre: 'Camisa beige de lino', cantidad: 1, precio_unitario: 145000, total: 145000 },
  ];
  localStorage.setItem(KEY_VENTAS, JSON.stringify(demo));
  localStorage.setItem(KEY_VENTAS + '_init', '1');
}

function getVentas() { return JSON.parse(localStorage.getItem(KEY_VENTAS)) || []; }
function setVentas(d) { localStorage.setItem(KEY_VENTAS, JSON.stringify(d)); }

function renderTablaVentas(filtro) {
  let ventas = getVentas();
  if (filtro) {
    const q = filtro.toLowerCase();
    ventas = ventas.filter(v =>
      v.cliente_nombre.toLowerCase().includes(q) ||
      v.producto_nombre.toLowerCase().includes(q)
    );
  }
  const container = document.getElementById('tabla-container');
  if (ventas.length === 0) {
    container.innerHTML = '<p>No se encontraron reportes de ventas.</p>';
    return;
  }
  let html = `<div class="tabla-container"><table class="tabla-ventas">
    <tr><th>Fecha</th><th>Cliente</th><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Total</th><th>Acciones</th></tr>`;
  ventas.forEach(v => {
    html += `<tr>
      <td>${v.fecha || ''}</td>
      <td>${v.cliente_nombre}</td>
      <td>${v.producto_nombre}</td>
      <td>${v.cantidad}</td>
      <td>$${Number(v.precio_unitario).toLocaleString('es-CO')}</td>
      <td>$${Number(v.total).toLocaleString('es-CO')}</td>
      <td><div class="acciones-botones">
        <button class="btn-editar" data-id="${v.reporte_id}">Editar</button>
        <button class="btn-eliminar" data-id="${v.reporte_id}">Eliminar</button>
      </div></td></tr>`;
  });
  html += '</table></div>';
  container.innerHTML = html;
  attachVentasListeners();
}

let idVentaEliminar = null;

function attachVentasListeners() {
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const v = getVentas().find(x => x.reporte_id === id);
      if (!v) return;
      const f = document.getElementById('formEditarVenta');
      f.querySelector('[name="reporte_id"]').value = v.reporte_id;
      f.querySelector('[name="fecha"]').value = v.fecha;
      f.querySelector('[name="cliente_nombre"]').value = v.cliente_nombre;
      f.querySelector('[name="producto_nombre"]').value = v.producto_nombre;
      f.querySelector('[name="cantidad"]').value = v.cantidad;
      f.querySelector('[name="precio_unitario"]').value = v.precio_unitario;
      document.getElementById('modalEditar').style.display = 'block';
    });
  });
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => {
      idVentaEliminar = Number(btn.dataset.id);
      document.getElementById('modalConfirmarEliminar').style.display = 'block';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initVentas();
  renderTablaVentas();

  const mA = document.getElementById('modalAgregar');
  const mE = document.getElementById('modalEditar');
  const mM = document.getElementById('modalMensaje');
  const mC = document.getElementById('modalConfirmarEliminar');

  function showMsg(txt) {
    document.getElementById('mensajeTexto').textContent = txt;
    mM.style.display = 'block';
    setTimeout(() => {
      mM.style.display = 'none';
      renderTablaVentas(document.getElementById('inputBuscar').value);
    }, 1500);
  }

  document.getElementById('abrirModalAgregar').onclick = () => mA.style.display = 'block';
  mA.querySelector('.modal-cerrar').onclick = () => mA.style.display = 'none';
  document.getElementById('cerrarModalEditar').onclick = () => mE.style.display = 'none';
  document.getElementById('cerrarModalMensaje').onclick = () => mM.style.display = 'none';
  document.getElementById('cerrarModalConfirmarEliminar').onclick = () => { mC.style.display = 'none'; idVentaEliminar = null; };
  document.getElementById('btnCancelarEliminar').onclick = () => { mC.style.display = 'none'; idVentaEliminar = null; };

  document.getElementById('btnConfirmarEliminar').onclick = () => {
    if (idVentaEliminar !== null) {
      setVentas(getVentas().filter(v => v.reporte_id !== idVentaEliminar));
      mC.style.display = 'none';
      idVentaEliminar = null;
      showMsg('Venta eliminada.');
    }
  };

  document.getElementById('formAgregarVenta').onsubmit = e => {
    e.preventDefault();
    const f = e.target;
    const cant = parseInt(f.cantidad.value);
    const precio = parseFloat(f.precio_unitario.value);
    const ventas = getVentas();
    ventas.push({
      reporte_id: Date.now(),
      fecha: f.fecha.value,
      cliente_nombre: f.cliente_nombre.value.trim(),
      producto_nombre: f.producto_nombre.value.trim(),
      cantidad: cant,
      precio_unitario: precio,
      total: cant * precio
    });
    setVentas(ventas);
    f.reset();
    mA.style.display = 'none';
    showMsg('Venta agregada correctamente.');
  };

  document.getElementById('formEditarVenta').onsubmit = e => {
    e.preventDefault();
    const f = e.target;
    const id = Number(f.reporte_id.value);
    const cant = parseInt(f.cantidad.value);
    const precio = parseFloat(f.precio_unitario.value);
    const ventas = getVentas();
    const idx = ventas.findIndex(v => v.reporte_id === id);
    if (idx !== -1) {
      ventas[idx] = { ...ventas[idx], fecha: f.fecha.value, cliente_nombre: f.cliente_nombre.value.trim(), producto_nombre: f.producto_nombre.value.trim(), cantidad: cant, precio_unitario: precio, total: cant * precio };
      setVentas(ventas);
    }
    mE.style.display = 'none';
    showMsg('Venta actualizada correctamente.');
  };

  document.getElementById('btnBuscar').onclick = () => renderTablaVentas(document.getElementById('inputBuscar').value.trim());
  document.getElementById('inputBuscar').addEventListener('keydown', e => { if (e.key === 'Enter') renderTablaVentas(e.target.value.trim()); });

  window.onclick = e => {
    if (e.target === mA) mA.style.display = 'none';
    if (e.target === mE) mE.style.display = 'none';
    if (e.target === mC) { mC.style.display = 'none'; idVentaEliminar = null; }
  };
});
