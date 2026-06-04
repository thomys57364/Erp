<?php
// Incluir el archivo de conexión a la base de datos
include '../../../conexion/conexion.php';

// Consulta general de productos
$sql = "SELECT * FROM Inventario ORDER BY fecha_entrada DESC";
$result = $conn->query($sql);

// Filtrado por búsqueda
if (isset($_POST['buscar'])) {
    $busqueda = $conn->real_escape_string($_POST['buscar']);
    $sql = "SELECT * FROM Inventario WHERE nombre_producto LIKE '%$busqueda%' ORDER BY fecha_entrada DESC";
    $result = $conn->query($sql);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inventario de Tienda</title>
  <link rel="stylesheet" href="estilos_compra.css?v=7" />
  <link rel="icon" href="../../../imagenes/logo-transparent.png" type="image/png" />
</head>
<body>

  <!-- Botón volver -->
  <a href="../modulos.html" class="btn-volver">&#8592;</a>

  <!-- Header -->
  <header class="logo-top">
    <img src="../../../imagenes/logo-transparent.png" alt="Logo" />
    <h1>Inventario de Tienda</h1>
  </header>

  <main>
    <div class="modulo-card">
      <!-- Formulario de búsqueda y agregar -->
      <form action="" method="POST" class="search-form">
        <input type="text" name="buscar" class="search-input" placeholder="Buscar por nombre del producto..." />
        <div class="botones-form">
          <button type="submit" class="btn-buscar">Buscar</button>
          <button type="button" class="btn-agregar" id="abrirModalAgregar">Agregar Producto</button>
        </div>
      </form>

      <!-- Tabla de inventario -->
      <div class="ventas-list">
        <?php if ($result->num_rows > 0): ?>
          <div class="tabla-container">
            <table class="tabla-ventas">
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Talla</th>
                <th>Color</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Ubicación</th>
                <th>Fecha Entrada</th>
                <th>Acciones</th>
              </tr>
              <?php while ($row = $result->fetch_assoc()): ?>
              <tr>
                <td><?= htmlspecialchars($row['nombre_producto']) ?></td>
                <td><?= $row['categoria'] ?></td>
                <td><?= $row['talla'] ?></td>
                <td><?= $row['color'] ?></td>
                <td><?= $row['cantidad'] ?></td>
                <td>$<?= number_format($row['precio_unitario'], 2) ?></td>
                <td><?= $row['ubicacion_almacen'] ?></td>
                <td><?= $row['fecha_entrada'] ?></td>
                <td>
                <div class="acciones-botones">
                  <button class="btn-editar" data-id="<?= $row['id_inventario'] ?>">Editar</button>
                  <button class="btn-eliminar" data-id="<?= $row['id_inventario'] ?>">Eliminar</button>
                </div>
              </td>
              </tr>
              <?php endwhile; ?>
            </table>
          </div>
        <?php else: ?>
          <p>No se encontraron productos.</p>
        <?php endif; ?>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="logo-top">
    <img src="../../../imagenes/logo-transparent.png" alt="Logo Footer" />
  </footer>

  <!-- Modal Agregar Producto -->
  <div id="modalAgregar" class="modal">
    <div class="modal-content">
      <span class="close modal-cerrar">&times;</span>
      <h3>Agregar Producto</h3>
      <form action="agregar_compra.php" method="POST" id="formAgregarProducto">
        <input type="text" name="nombre_producto" placeholder="Nombre del producto" required />
        <input type="text" name="categoria" placeholder="Categoría" required />
        <input type="text" name="talla" placeholder="Talla" required />
        <input type="text" name="color" placeholder="Color" required />
        <input type="number" name="cantidad" placeholder="Cantidad" required />
        <input type="number" step="0.01" name="precio_unitario" placeholder="Precio unitario" required />
        <input type="text" name="ubicacion_almacen" placeholder="Ubicación en almacén" />
        <button type="submit" class="btn-agregar">Registrar</button>
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

  <!-- Modal Editar Producto -->
<div id="modalEditar" class="modal">
  <div class="modal-content">
    <span class="close" id="cerrarModalEditar">&times;</span>
    <h3>Editar Producto</h3>
    <form id="formEditarProducto" method="POST" action="editar_compra.php">
      <input type="hidden" name="id_inventario" />
      <input type="text" name="nombre_producto" placeholder="Nombre del producto" required />
      <input type="text" name="categoria" placeholder="Categoría" required />
      <input type="text" name="talla" placeholder="Talla" required />
      <input type="text" name="color" placeholder="Color" required />
      <input type="number" name="cantidad" placeholder="Cantidad" required />
      <input type="number" step="0.01" name="precio_unitario" placeholder="Precio unitario" required />
      <input type="text" name="ubicacion_almacen" placeholder="Ubicación en almacén" />
      <button type="submit" class="btn-agregar">Guardar Cambios</button>
    </form>
  </div>
</div>
<!-- Modal Confirmar Eliminar -->
  <div id="modalConfirmarEliminar" class="modal">
    <div class="modal-content">
      <span class="close" id="cerrarModalConfirmarEliminar">&times;</span>
      <h3>¿Eliminar este producto del inventario?</h3>

      <div style="display:flex; gap:1rem; justify-content:center; margin-top:1rem;">
        <button id="btnCancelarEliminar" class="btn-modal-cancelar">Cancelar</button>
        <button id="btnConfirmarEliminar" class="btn-modal-eliminar">Eliminar</button>
      </div>
    </div>
  </div>

  <script src="animaciones_compra.js?v=7"></script>

</body>
</html>
