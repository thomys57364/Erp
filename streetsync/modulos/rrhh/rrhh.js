const KEY_RRHH = 'erp_rrhh';

function initRRHH() {
  if (localStorage.getItem(KEY_RRHH + '_init')) return;
  const demo = [
    { id: 1, nombre: 'Miguel Ángel Ruiz', correo: 'miguel@deuss.com', telefono: '3007654321', cargo: 'Gerente', salario: 3000000, fecha_ingreso: '2023-06-15' },
    { id: 2, nombre: 'Laura Torres', correo: 'laura@deuss.com', telefono: '3001234567', cargo: 'Diseñadora', salario: 1800000, fecha_ingreso: '2024-02-01' },
    { id: 3, nombre: 'Carlos López', correo: 'carlos@deuss.com', telefono: '3009876543', cargo: 'Vendedor', salario: 1500000, fecha_ingreso: '2024-01-15' },
    { id: 4, nombre: 'Valentina Cruz', correo: 'valentina@deuss.com', telefono: '3005555555', cargo: 'Contadora', salario: 2000000, fecha_ingreso: '2024-03-10' },
  ];
  localStorage.setItem(KEY_RRHH, JSON.stringify(demo));
  localStorage.setItem(KEY_RRHH + '_init', '1');
}

function getEmpleados() { return JSON.parse(localStorage.getItem(KEY_RRHH)) || []; }
function setEmpleados(d) { localStorage.setItem(KEY_RRHH, JSON.stringify(d)); }

function cargarTablaEmpleados() {
  const lista = getEmpleados();
  const cont = document.getElementById('tablaContainer');

  if (lista.length === 0) {
    cont.innerHTML = '<p style="text-align:center; margin-top:1rem;">No hay empleados registrados.</p>';
    return;
  }

  cont.innerHTML = `
    <h3>Lista de Empleados</h3>
    <table id="tablaRRHH" border="1" cellpadding="4">
      <thead>
        <tr>
          <th>ID</th><th>Nombre</th><th>Correo</th>
          <th>Teléfono</th><th>Cargo</th><th>Salario</th>
          <th>Fecha Ingreso</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>`;

  const tbody = cont.querySelector('tbody');
  lista.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.nombre}</td>
      <td>${emp.correo}</td>
      <td>${emp.telefono || ''}</td>
      <td>${emp.cargo || ''}</td>
      <td>${emp.salario ? '$' + Number(emp.salario).toLocaleString('es-CO') : ''}</td>
      <td>${emp.fecha_ingreso || ''}</td>
      <td>
        <button class="edit" data-id="${emp.id}">Editar</button>
        <button class="delete" data-id="${emp.id}">Eliminar</button>
      </td>`;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('¿Eliminar este empleado?')) eliminarEmpleado(Number(btn.dataset.id));
    });
  });
  tbody.querySelectorAll('.edit').forEach(btn => {
    btn.addEventListener('click', () => editarEmpleado(Number(btn.dataset.id)));
  });
}

function eliminarEmpleado(id) {
  setEmpleados(getEmpleados().filter(e => e.id !== id));
  const resp = document.getElementById('respuesta');
  resp.style.color = 'green';
  resp.innerText = 'Empleado eliminado correctamente.';
  cargarTablaEmpleados();
}

function editarEmpleado(id) {
  const emp = getEmpleados().find(e => e.id === id);
  if (!emp) { alert('No se encontró el empleado con ID: ' + id); return; }
  const form = document.getElementById('formEmpleado');
  form.querySelector('input[name="id"]').value = emp.id;
  form.querySelector('input[name="nombre"]').value = emp.nombre;
  form.querySelector('input[name="correo"]').value = emp.correo;
  form.querySelector('input[name="telefono"]').value = emp.telefono || '';
  form.querySelector('input[name="cargo"]').value = emp.cargo || '';
  form.querySelector('input[name="salario"]').value = emp.salario || '';
  form.querySelector('input[name="fecha_ingreso"]').value = emp.fecha_ingreso || '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function submitFormEmpleado(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const id = form.querySelector('input[name="id"]').value;
  const empleados = getEmpleados();

  const datos = {
    id: id ? Number(id) : Date.now(),
    nombre: form.nombre.value.trim(),
    correo: form.correo.value.trim(),
    telefono: form.telefono.value.trim(),
    cargo: form.cargo.value.trim(),
    salario: parseFloat(form.salario.value) || 0,
    fecha_ingreso: form.fecha_ingreso.value
  };

  const resp = document.getElementById('respuesta');
  if (id) {
    const idx = empleados.findIndex(e => e.id === Number(id));
    if (idx !== -1) empleados[idx] = datos;
    setEmpleados(empleados);
    resp.style.color = 'green';
    resp.innerText = 'Empleado actualizado correctamente.';
  } else {
    empleados.push(datos);
    setEmpleados(empleados);
    resp.style.color = 'green';
    resp.innerText = 'Empleado registrado correctamente.';
  }

  form.reset();
  form.querySelector('input[name="id"]').value = '';
  cargarTablaEmpleados();
}

document.addEventListener('DOMContentLoaded', () => {
  initRRHH();
  const form = document.getElementById('formEmpleado');
  form.addEventListener('submit', submitFormEmpleado);
  cargarTablaEmpleados();
});
