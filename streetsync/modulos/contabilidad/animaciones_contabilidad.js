const KEY_CONT = 'erp_contabilidad';

function initContabilidad() {
  if (localStorage.getItem(KEY_CONT + '_init')) return;
  const demo = [
    { id: 1, fecha: '2025-01-15', tipo: 'Ingreso', concepto: 'Ventas del día', monto: 500000 },
    { id: 2, fecha: '2025-01-20', tipo: 'Egreso', concepto: 'Pago arriendo bodega', monto: 800000 },
    { id: 3, fecha: '2025-02-05', tipo: 'Ingreso', concepto: 'Ventas de la semana', monto: 1200000 },
    { id: 4, fecha: '2025-02-10', tipo: 'Egreso', concepto: 'Compra de inventario', monto: 650000 },
    { id: 5, fecha: '2025-02-20', tipo: 'Ingreso', concepto: 'Ventas online DEUSS', monto: 750000 },
    { id: 6, fecha: '2025-03-01', tipo: 'Egreso', concepto: 'Nómina empleados', monto: 3000000 },
  ];
  localStorage.setItem(KEY_CONT, JSON.stringify(demo));
  localStorage.setItem(KEY_CONT + '_init', '1');
}

function getMovimientos() { return JSON.parse(localStorage.getItem(KEY_CONT)) || []; }
function setMovimientos(d) { localStorage.setItem(KEY_CONT, JSON.stringify(d)); }

function renderTablaContabilidad(filtro) {
  let items = getMovimientos();
  if (filtro) {
    const q = filtro.toLowerCase();
    items = items.filter(m =>
      m.concepto.toLowerCase().includes(q) ||
      m.tipo.toLowerCase().includes(q) ||
      m.fecha.includes(q)
    );
  }
  const container = document.getElementById('tabla-container');
  if (items.length === 0) {
    container.innerHTML = '<p style="text-align:center;">No se encontraron movimientos contables.</p>';
    return;
  }
  let html = `<div class="tabla-container"><table class="tabla-clientes">
    <thead><tr><th>Fecha</th><th>Tipo</th><th>Concepto</th><th>Monto</th><th>Acciones</th></tr></thead><tbody>`;
  items.forEach(m => {
    html += `<tr>
      <td>${m.fecha}</td>
      <td>${m.tipo}</td>
      <td>${m.concepto}</td>
      <td>$${Number(m.monto).toLocaleString('es-CO')}</td>
      <td>
        <button class="btn-editar" data-id="${m.id}">Editar</button>
        <button class="btn-eliminar" data-id="${m.id}">Eliminar</button>
      </td></tr>`;
  });
  html += '</tbody></table></div>';
  container.innerHTML = html;
  attachContListeners();
}

let idContEliminar = null;

function attachContListeners() {
  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const m = getMovimientos().find(x => x.id === id);
      if (!m) return;
      document.getElementById('editMovimientoId').value = m.id;
      document.getElementById('editFecha').value = m.fecha;
      document.getElementById('editTipo').value = m.tipo;
      document.getElementById('editConcepto').value = m.concepto;
      document.getElementById('editMonto').value = m.monto;
      document.getElementById('modalEditar').style.display = 'block';
    });
  });
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', () => {
      idContEliminar = Number(btn.dataset.id);
      document.getElementById('modalConfirmarEliminar').style.display = 'block';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initContabilidad();
  renderTablaContabilidad();

  const mA = document.getElementById('modalAgregar');
  const mE = document.getElementById('modalEditar');
  const mM = document.getElementById('modalMensaje');
  const mC = document.getElementById('modalConfirmarEliminar');

  function showMsg(txt) {
    document.getElementById('mensajeTexto').textContent = txt;
    mM.style.display = 'block';
    setTimeout(() => {
      mM.style.display = 'none';
      renderTablaContabilidad(document.getElementById('inputBuscar').value);
    }, 1500);
  }

  document.getElementById('abrirModalAgregar').onclick = () => mA.style.display = 'block';
  mA.querySelector('.modal-cerrar').onclick = () => mA.style.display = 'none';
  document.getElementById('cerrarModalEditar').onclick = () => mE.style.display = 'none';
  document.getElementById('cerrarModalMensaje').onclick = () => mM.style.display = 'none';
  document.getElementById('cerrarModalConfirmarEliminar').onclick = () => { mC.style.display = 'none'; idContEliminar = null; };
  document.getElementById('btnCancelarEliminar').onclick = () => { mC.style.display = 'none'; idContEliminar = null; };

  document.getElementById('btnConfirmarEliminar').onclick = () => {
    if (idContEliminar !== null) {
      setMovimientos(getMovimientos().filter(m => m.id !== idContEliminar));
      mC.style.display = 'none';
      idContEliminar = null;
      showMsg('Movimiento eliminado.');
    }
  };

  document.getElementById('formAgregarMovimiento').onsubmit = e => {
    e.preventDefault();
    const f = e.target;
    const items = getMovimientos();
    items.push({
      id: Date.now(),
      fecha: f.fecha.value,
      tipo: f.tipo.value,
      concepto: f.concepto.value.trim(),
      monto: parseFloat(f.monto.value)
    });
    setMovimientos(items);
    f.reset();
    mA.style.display = 'none';
    showMsg('Movimiento agregado correctamente.');
  };

  document.getElementById('formEditarMovimiento').onsubmit = e => {
    e.preventDefault();
    const id = Number(document.getElementById('editMovimientoId').value);
    const items = getMovimientos();
    const idx = items.findIndex(m => m.id === id);
    if (idx !== -1) {
      items[idx] = {
        id,
        fecha: document.getElementById('editFecha').value,
        tipo: document.getElementById('editTipo').value,
        concepto: document.getElementById('editConcepto').value.trim(),
        monto: parseFloat(document.getElementById('editMonto').value)
      };
      setMovimientos(items);
    }
    mE.style.display = 'none';
    showMsg('Movimiento actualizado correctamente.');
  };

  document.getElementById('btnBuscar').onclick = () => renderTablaContabilidad(document.getElementById('inputBuscar').value.trim());
  document.getElementById('inputBuscar').addEventListener('keydown', e => { if (e.key === 'Enter') renderTablaContabilidad(e.target.value.trim()); });

  document.getElementById('btnVerReporte').onclick = () => {
    const mes = document.getElementById('selectMes').value;
    const anio = document.getElementById('selectAnio').value;
    window.open(`ver_reporte.html?mes=${mes}&anio=${anio}`, '_blank');
  };

  window.onclick = e => {
    if (e.target === mA) mA.style.display = 'none';
    if (e.target === mE) mE.style.display = 'none';
    if (e.target === mC) { mC.style.display = 'none'; idContEliminar = null; }
  };
});
