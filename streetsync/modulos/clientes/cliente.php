<?php
// Incluir el archivo de conexión a la base de datos
include '../../../conexion/conexion.php';

// Realizar la consulta SQL para obtener los datos de los clientes
$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

// Verificar si se ha realizado una búsqueda
if (isset($_POST['buscar'])) {
    $busqueda = $_POST['buscar'];
    // Modificar la consulta para filtrar por nombre, email, teléfono, etc.
    $sql = "SELECT * FROM usuarios WHERE nombre LIKE '%$busqueda%' OR correo LIKE '%$busqueda%'";
    $result = $conn->query($sql);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Modulo Clientes/Proveedores</title>
  <link rel="stylesheet" href="estilos_cliente.css?v=7" />
  <link rel="icon" href="../../../imagenes/logo-transparent.png" type="image/png" />
</head>
<body>

  <!-- Botón volver -->
  <a href="../modulos.html" class="btn-volver">&#8592;</a>

  <!-- Header con logo -->
  <header class="logo-top">
    <img src="../../../imagenes/logo-transparent.png" alt="Logo StreetSync" />
    <h1>Administración de Clientes</h1>
  </header>

  <!-- Contenedor de módulos -->
  <main>
    <div class="modulos-grid">
      <!-- Módulo de Clientes -->
      <div class="modulo-card">
        <div class="modulo-texto">
          <!-- Formulario de búsqueda con botones alineados -->
          <form action="" method="POST" class="search-form">
            <input type="text" name="buscar" class="search-input" placeholder="Buscar cliente..." />
            <div class="botones-form">
              <button type="submit" class="btn-buscar">Actualizar</button>
              <button type="button" class="btn-agregar" id="abrirModalAgregar">Agregar Cliente</button>
            </div>
          </form>

          <!-- Tabla de clientes -->
          <div class="clientes-list">
            <?php
            if ($result->num_rows > 0) {
                echo "<div class='tabla-container'>
                        <table class='tabla-clientes'>
                          <tr>
                            <th>Nombre</th>
                            <th>correo</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Fecha de Registro</th>
                            <th>Acciones</th>
                          </tr>";
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>
                            <td>" . htmlspecialchars($row["nombre"]) . "</td>
                            <td>" . htmlspecialchars($row["correo"]) . "</td>
                            <td>" . htmlspecialchars($row["telefono"]) . "</td>
                            <td>" . htmlspecialchars($row["direccion"]) . "</td>
                            <td>" . htmlspecialchars($row["fecha_registro"]) . "</td>
                            <td>
                              <button class='btn-editar' data-id='" . $row["id"] . "' id='abrirModalEditar'>Editar</button>
                              <button class='btn-eliminar' data-id='" . $row["id"] . "'id=''>Eliminar</button>
                          </td>
                          </tr>";
                }
                echo "</table>
                      </div>";
            } else {
                echo "No se encontraron clientes.";
            }
            $conn->close();
            ?>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="logo-top">
    <img src="../../../imagenes/logo-transparent.png" alt="Logo StreetSync Footer" />
  </footer>

  <!-- Modal de agregar cliente -->
  <div id="modalAgregar" class="modal">
    <div class="modal-content">
      <span class="close modal-cerrar">&times;</span>
      <h3>Agregar Cliente</h3>
      <form action="agregar_cliente.php" method="POST" id="formAgregarCliente">
        <input type="text" name="nombre" placeholder="Nombre" required />
        
        <input type="correo" name="correo" placeholder="correo" required />
        <input type="text" name="telefono" placeholder="Teléfono" required />
        <input type="text" name="direccion" placeholder="Dirección" required />
        <button type="submit" class="btn-agregar">Agregar</button>
      </form>
    </div>
  </div>

  <!-- Modal para mostrar mensaje -->
  <div id="modalMensaje" class="modal">
    <div class="modal-content">
      <span class="close" id="cerrarModalMensaje">&times;</span>
      <h3 id="mensajeTexto"></h3>
    </div>
  </div>

  <!-- Modal de editar cliente -->
  <div id="modalEditar" class="modal">
  <div class="modal-content">
    <span class="close" id="cerrarModalEditar">&times;</span>
    <h3>Editar Cliente</h3>
    <form id="formEditarCliente" method="POST" action="editar_cliente.php">
      <input type="hidden" name="id" id="editClienteId" />
      <input type="text" name="nombre" id="editNombre" placeholder="Nombre" required />
      
      <input type="correo" name="correo" id="editEmail" placeholder="correo" required />
      <input type="text" name="telefono" id="editTelefono" placeholder="Teléfono" required />
      <input type="text" name="direccion" id="editDireccion" placeholder="Dirección" required />
      <button type="submit" class="btn-agregar">Guardar Cambios</button>
    </form>
  </div>
</div>


 <!-- Modal Confirmación Eliminar -->
<div id="modalConfirmarEliminar" class="modal">
  <div class="modal-content">
    <span class="close" id="cerrarModalConfirmarEliminar">&times;</span>
    <h3>¿Estás seguro que deseas eliminar este cliente?</h3>
    <p>Esta acción no se puede deshacer.</p>
    <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1.5rem;">
  <button id="btnCancelarEliminar" class="btn-modal-cancelar">Cancelar</button>
  <button id="btnConfirmarEliminar" class="btn-modal-eliminar">Eliminar</button>
</div>

  </div>
</div>

  <script src="animaciones_cliente.js?v=7"></script>
</body>
</html>
