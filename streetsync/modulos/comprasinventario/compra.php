<?php
// Incluir el archivo de conexión a la base de datos
include '../../../conexion/conexion.php';

// Consulta inicial
$sql = "SELECT * FROM ventas";
$result = $conn->query($sql);

// Filtrado por búsqueda
if (isset($_POST['buscar'])) {
    $busqueda = $conn->real_escape_string($_POST['buscar']);
    $sql = "SELECT * FROM ventas WHERE nombre LIKE '%$busqueda%'";
    $result = $conn->query($sql);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Módulo de Ventas</title>
  <link rel="stylesheet" href="estilos_compra.css?v=1" />
  <link rel="icon" href="../../../imagenes/logo-transparent.png" type="image/png" />
</head>
<body>

  <!-- Botón volver -->
  <a href="../modulos.html" class="btn-volver">&#8592;</a>

  <!-- Header -->
  <header class="logo-top">
    <img src="../../../imagenes/logo-transparent.png" alt="Logo" />
    <h1>Administración de Ventas</h1>
  </header>

  <main>
    <div class="modulo-card">
      <!-- Formulario de búsqueda y agregar -->
      <form action="" method="POST" class="search-form">
        <input type="text" name="buscar" class="search-input" placeholder="Buscar por nombre..." />
        <div class="botones-form">
          <button type="submit" class="btn-buscar">Actualizar</button>
          <button type="button" class="btn-agregar" id="abrirModalAgregar">Agregar Venta</button>
        </div>
      </form>

      <!-- Tabla de ventas -->
      <div class="ventas-list">
      <?php if ($result->num_rows > 0): ?>
        <div class="tabla-container">
          <table class="tabla-ventas">
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Ventas</th>
              <th>Pagos</th>
              <th>Facturación</th>
              <th>Acciones</th>
            </tr>
            <?php while ($row = $result->fetch_assoc()): ?>
            <tr>
              <td><?= $row['fecha_registro'] ?></td>
              <td><?= htmlspecialchars($row['nombre']) ?></td>
              <td>$<?= number_format($row['ventas'], 2) ?></td>
              <td>$<?= number_format($row['pagos'], 2) ?></td>
              <td>$<?= number_format($row['facturacion'], 2) ?></td>
              <td>
                <div class="acciones-botones">
                  <button class="btn-editar" data-id="<?= $row['id'] ?>">Editar</button>
                  <button class="btn-eliminar" data-id="<?= $row['id'] ?>">Eliminar</button>
                </div>
              </td>
            </tr>
            <?php endwhile; ?>
          </table>
        </div>
      <?php else: ?>
        <p>No se encontraron registros.</p>
      <?php endif; ?>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="logo-top">
    <img src="../../../imagenes/logo-transparent.png" alt="Logo Footer" />
  </footer>

  <!-- Modal Agregar Venta -->
  <div id="modalAgregar" class="modal">
    <div class="modal-content">
      <span class="close modal-cerrar">&times;</span>
      <h3>Agregar Venta</h3>
      <form action="agregar_ventas.php" method="POST" id="formAgregarVenta">
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="number" step="0.01" name="ventas" placeholder="Ventas" required />
        <input type="number" step="0.01" name="pagos" placeholder="Pagos" required />
        <input type="number" step="0.01" name="facturacion" placeholder="Facturación" required />
        <button type="submit" class="btn-agregar">Agregar</button>
      </form>
    </div>
  </div>

  <!-- Modal Mensaje -->
  <div id="modalMensaje" class="modal">
    <div class="modal-content">
      <span class="close" id="cerrarModalMensaje">&times;</span>
      <h3 id="mensajeTexto"></h3>
    </div>
  </div>

  <!-- Modal Editar Venta -->
  <div id="modalEditar" class="modal">
    <div class="modal-content">
      <span class="close" id="cerrarModalEditar">&times;</span>
      <h3>Editar Venta</h3>
      <form id="formEditarVenta" method="POST" action="editar_compra.php">
        <input type="hidden" name="id" />
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="number" step="0.01" name="ventas" placeholder="Ventas" required />
        <input type="number" step="0.01" name="pagos" placeholder="Pagos" required />
        <input type="number" step="0.01" name="facturacion" placeholder="Facturación" required />
        <button type="submit" class="btn-agregar">Guardar Cambios</button>
      </form>
    </div>
  </div>

  <!-- Modal Confirmar Eliminar -->
  <div id="modalConfirmarEliminar" class="modal">
    <div class="modal-content">
      <span class="close" id="cerrarModalConfirmarEliminar">&times;</span>
      <h3>¿Eliminar esta venta?</h3>
      <div style="display:flex; gap:1rem; justify-content:center; margin-top:1rem;">
        <button id="btnCancelarEliminar" class="btn-modal-cancelar">Cancelar</button>
        <button id="btnConfirmarEliminar" class="btn-modal-eliminar">Eliminar</button>
      </div>
    </div>
  </div>

  <script src="animaciones_compra.js?v=1"></script>
</body>
</html>
