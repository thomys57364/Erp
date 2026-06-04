const KEY_INVENTARIO = 'erp_inventario';

function initInventario() {
  if (localStorage.getItem(KEY_INVENTARIO + '_init')) return;
  const demo = [
    { id_inventario: 1, nombre_producto: 'Camisa manga corta de cuadros', categoria: 'Camisetas', talla: 'M', color: 'Azul', cantidad: 50, precio_unitario: 150000, ubicacion_almacen: 'Bodega A', fecha_entrada: '2025-01-01' },
    { id_inventario: 2, nombre_producto: 'Jean slim fit azul', categoria: 'Jeans', talla: '32', color: 'Azul', cantidad: 30, precio_unitario: 120000, ubicacion_almacen: 'Bodega B', fecha_entrada: '2025-01-05' },
    { id_inventario: 3, nombre_producto: 'Sudadera con capucha negra', categoria: 'Sudaderas', talla: 'L', color: 'Negro', cantidad: 25, precio_unitario: 95000, ubicacion_almacen: 'Bodega A', fecha_entrada: '2025-01-10' },
    { id_inventario: 4, nombre_producto: 'Short deportivo azul', categoria: 'Shorts', talla: 'S', color: 'Azul', cantidad: 40, precio_unitario: 75000, ubicacion_almacen: 'Bodega C', fecha_entrada: '2025-01-15' },
    { id_inventario: 5, nombre_producto: 'Camisa beige de lino', categoria: 'Camisetas', talla: 'XL', color: 'Beige', cantidad: 20, precio_unitario: 145000, ubicacion_almacen: 'Bodega A', fecha_entrada: '2025-02-01' },
    { id_inventario: 6, nombre_producto: 'Jean corte recto', categoria: 'Jeans', talla: '34', color: 'Negro', cantidad: 35, precio_unitario: 130000, ubicacion_almacen: 'Bodega B', fecha_entrada: '2025-02-10' },
  ];
  localStorage.setItem(KEY_INVENTARIO, JSON.stringify(demo));
  localStorage.setItem(KEY_INVENTARIO + '_init', '1');
}

function getInventario() { return JSON.parse(localStorage.getItem(KEY_INVENTARIO)) || []; }
function setInventario(d) { localStorage.setItem(KEY_INVENTARIO, JSON.stringify(d)); }

function renderTablaInventario(filtro) {
  let items = getInventario();
  if (filtro) {
    const q = filtro.toLowerCase();
    items = items.filter(i => i.nombre_producto.toLowerCase().includes(q));
  }
  const container = document.getElementById('tabla-container');
  if (items.length === 0) {
    container.innerHTML = '<p>No se encontraron productos.</p>';
    return;
  }
  let html = `<div class="tabla-container"><table class="tabla-ventas">
    <tr><th>Nombre</th><th>Categoría</th><th>Talla</th><th>Color</th><th>Cantidad</th><th>Precio</th><th>Ubicación</th><th>Fecha Entrada</th><th>Acciones</th></tr>`;
  items.forEach(i => {
    html += `<tr>
      <td>${i.nombre_producto}</td>
      <td>${i.categoria}</td>
      <td>${i.talla}</td>
      <td>${i.color}</td>
      <td>${i.cantidad}</td>
      <td>$${Number(i.precio_unitario).toLocaleString('es-CO')}</td>
      <td>${i.ubicacion_almacen || ''}</td>
      <td>${i.fecha_entrada || ''}</td>
      <td><div class="acciones-botones">
        <button class="btn-editar" data-id="${i.id_inventario}">Editar</button>
        <button class="btn-eliminar" data-id="${i.id_inventario}">Eliminar</button>
      </div></td></tr>`;
  });
  html += '</table></div>';
  container.innerHTML = html;
  attachInventarioListeners();
}

let idInventarioEliminar = null;

function attachInventarioListeners() {
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const item = getInventario().find(x => x.id_inventario === id);
      if (!item) return;
      const f = document.getElementById('formEditarProducto');
      f.querySelector('[name="id_inventario"]').value = item.id_inventario;
      f.querySelector('[name="nombre_producto"]').value = item.nombre_producto;
      f.querySelector('[name="categoria"]').value = item.categoria;
      f.querySelector('[name="talla"]').value = item.talla;
      f.querySelector('[name="color"]').value = item.color;
      f.querySelector('[name="cantidad"]').value = item.cantidad;
      f.querySelector('[name="precio_unitario"]').value = item.precio_unitario;
      f.querySelector('[name="ubicacion_almacen"]').value = item.ubicacion_almacen || '';
      document.getElementById('modalEditar').style.display = 'block';
    });
  });
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => {
      idInventarioEliminar = Number(btn.dataset.id);
      document.getElementById('modalConfirmarEliminar').style.display = 'block';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initInventario();
  renderTablaInventario();

  const mA = document.getElementById('modalAgregar');
  const mE = document.getElementById('modalEditar');
  const mM = document.getElementById('modalMensaje');
  const mC = document.getElementById('modalConfirmarEliminar');

  function showMsg(txt) {
    document.getElementById('mensajeTexto').textContent = txt;
    mM.style.display = 'block';
    setTimeout(() => {
      mM.style.display = 'none';
      renderTablaInventario(document.getElementById('inputBuscar').value);
    }, 1500);
  }

  document.getElementById('abrirModalAgregar').onclick = () => mA.style.display = 'block';
  mA.querySelector('.modal-cerrar').onclick = () => mA.style.display = 'none';
  document.getElementById('cerrarModalEditar').onclick = () => mE.style.display = 'none';
  document.getElementById('cerrarModalMensaje').onclick = () => mM.style.display = 'none';
  document.getElementById('cerrarModalConfirmarEliminar').onclick = () => { mC.style.display = 'none'; idInventarioEliminar = null; };
  document.getElementById('btnCancelarEliminar').onclick = () => { mC.style.display = 'none'; idInventarioEliminar = null; };

  document.getElementById('btnConfirmarEliminar').onclick = () => {
    if (idInventarioEliminar !== null) {
      setInventario(getInventario().filter(i => i.id_inventario !== idInventarioEliminar));
      mC.style.display = 'none';
      idInventarioEliminar = null;
      showMsg('Producto eliminado.');
    }
  };

  document.getElementById('formAgregarProducto').onsubmit = e => {
    e.preventDefault();
    const f = e.target;
    const items = getInventario();
    items.push({
      id_inventario: Date.now(),
      nombre_producto: f.nombre_producto.value.trim(),
      categoria: f.categoria.value.trim(),
      talla: f.talla.value.trim(),
      color: f.color.value.trim(),
      cantidad: parseInt(f.cantidad.value),
      precio_unitario: parseFloat(f.precio_unitario.value),
      ubicacion_almacen: f.ubicacion_almacen.value.trim(),
      fecha_entrada: new Date().toISOString().split('T')[0]
    });
    setInventario(items);
    f.reset();
    mA.style.display = 'none';
    showMsg('Producto agregado correctamente.');
  };

  document.getElementById('formEditarProducto').onsubmit = e => {
    e.preventDefault();
    const f = e.target;
    const id = Number(f.id_inventario.value);
    const items = getInventario();
    const idx = items.findIndex(i => i.id_inventario === id);
    if (idx !== -1) {
      items[idx] = {
        ...items[idx],
        nombre_producto: f.nombre_producto.value.trim(),
        categoria: f.categoria.value.trim(),
        talla: f.talla.value.trim(),
        color: f.color.value.trim(),
        cantidad: parseInt(f.cantidad.value),
        precio_unitario: parseFloat(f.precio_unitario.value),
        ubicacion_almacen: f.ubicacion_almacen.value.trim()
      };
      setInventario(items);
    }
    mE.style.display = 'none';
    showMsg('Producto actualizado correctamente.');
  };

  document.getElementById('btnBuscar').onclick = () => renderTablaInventario(document.getElementById('inputBuscar').value.trim());
  document.getElementById('inputBuscar').addEventListener('keydown', e => { if (e.key === 'Enter') renderTablaInventario(e.target.value.trim()); });

  window.onclick = e => {
    if (e.target === mA) mA.style.display = 'none';
    if (e.target === mE) mE.style.display = 'none';
    if (e.target === mC) { mC.style.display = 'none'; idInventarioEliminar = null; }
  };
});
