let empleadosList = [];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formEmpleado');
  form.addEventListener('submit', submitFormEmpleado);
  cargarTablaEmpleados();
});

function submitFormEmpleado(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const id = formData.get('id');

  const isUpdate = id !== null && id !== '';
  const url = isUpdate
    ? 'CRUD_RRHH/actualizar_empleado.php'
    : 'CRUD_RRHH/registrar_empleado.php';

  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(res => res.text()) // ✅ Obtener texto crudo primero
    .then(text => {
      try {
        const data = JSON.parse(text); // Intentar parsear como JSON

        const resp = document.getElementById('respuesta');
        resp.style.color = data.error ? 'red' : 'green';
        resp.innerText = data.mensaje || data.error || '';

        form.reset();
        form.querySelector('input[name="id"]').value = '';
        cargarTablaEmpleados();
      } catch (err) {
        console.error('❌ No es JSON válido:', text);
        document.getElementById('respuesta').innerText = 'Error del servidor. Revisa consola.';
      }
    })
    .catch(err => {
      console.error('⛔ Error enviando formulario:', err);
      document.getElementById('respuesta').innerText = 'Error en la conexión.';
    });
}

function cargarTablaEmpleados() {
  fetch('CRUD_RRHH/listar_empleados.php')
    .then(res => res.json())
    .then(lista => {
      if (!Array.isArray(lista)) {
        console.error('⚠️ La respuesta no es una lista válida:', lista);
        return;
      }

      empleadosList = lista;
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
        </table>
      `;

      const tbody = cont.querySelector('tbody');
      tbody.innerHTML = '';

      lista.forEach(emp => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${emp.id}</td>
          <td>${emp.nombre}</td>
          <td>${emp.correo}</td>
          <td>${emp.telefono || ''}</td>
          <td>${emp.cargo || ''}</td>
          <td>${emp.salario || ''}</td>
          <td>${emp.fecha_ingreso || ''}</td>
          <td>
            <button class="edit" data-id="${emp.id}">Editar</button>
            <button class="delete" data-id="${emp.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });

      tbody.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', () => {
          if (confirm('¿Eliminar este empleado?')) {
            eliminarEmpleado(btn.dataset.id);
          }
        });
      });

      tbody.querySelectorAll('.edit').forEach(btn => {
        btn.addEventListener('click', () => editarEmpleado(btn.dataset.id));
      });
    })
    .catch(err => {
      console.error('⚠️ Error listando empleados:', err);
    });
}

function eliminarEmpleado(id) {
  const fd = new FormData();
  fd.append('id', id);

  fetch('CRUD_RRHH/eliminar_empleado.php', {
    method: 'POST',
    body: fd
  })
    .then(res => res.json())
    .then(data => {
      const resp = document.getElementById('respuesta');
      resp.style.color = data.error ? 'red' : 'green';
      resp.innerText = data.mensaje || data.error || '';
      cargarTablaEmpleados();
    })
    .catch(err => {
      console.error('⛔ Error al eliminar empleado:', err);
      document.getElementById('respuesta').innerText = 'Error al eliminar.';
    });
}

function editarEmpleado(id) {
  const emp = empleadosList.find(e => e.id == id);
  if (!emp) {
    alert('No se encontró el empleado con ID: ' + id);
    return;
  }

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
