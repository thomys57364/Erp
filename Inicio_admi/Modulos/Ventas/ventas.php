<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion.php';

// Consulta base para traer todos los reportes de ventas
$sql = "SELECT * FROM reporte_ventas";
$result = $conn->query($sql);

// Verificar si se ha realizado una búsqueda
if (isset($_POST['buscar'])) {
    $busqueda = $_POST['buscar'];
    // Modificar la consulta para filtrar por cliente_nombre o producto_nombre
    $sql = "SELECT * FROM reporte_ventas WHERE cliente_nombre LIKE '%$busqueda%' OR producto_nombre LIKE '%$busqueda%'";
    $result = $conn->query($sql);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Módulo de Ventas</title>
  <link rel="stylesheet" href="estilos_ventas.css" />
  <link rel="icon" href="../Imagenes/logo-transparent.png" type="image/png" />
</head>
<body>

  <!-- Botón volver -->
  <a href="../modulos.html" class="btn-volver">&#8592;</a>

  <!-- Header con logo -->
  <header class="logo-top">
    <img src="../Imagenes/logo-transparent.png" alt="Logo StreetSync" />
    <h1>Administración de Reportes de Ventas</h1>
  </header>

  <!-- Contenedor de módulos -->
  <main>
    <div class="modulos-grid">
      <!-- Módulo de Ventas -->
      <div class="modulo-card">
        <div class="modulo-texto">
          <!-- Formulario de búsqueda -->
          <form action="" method="POST" class="search-form">
            <input type="text" name="buscar" class="search-input" placeholder="Buscar cliente o producto..." />
            <div class="botones-form">
              <button type="submit" class="btn-buscar">Actualizar</button>
              <button type="button" class="btn-agregar" id="abrirModalAgregar">Agregar Venta</button>
            </div>
          </form>

          <!-- Tabla de reportes de ventas -->
          <div class="ventas-list">
            <?php
            if ($result->num_rows > 0) {
                echo "<div class='tabla-container'>
                        <table class='tabla-ventas'>
                          <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Total</th>
                            <th>Acciones</th>
                          </tr>";
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>
                            <td>" . $row["fecha"] . "</td>
                            <td>" . $row["cliente_nombre"] . "</td>
                            <td>" . $row["producto_nombre"] . "</td>
                            <td>" . $row["cantidad"] . "</td>
                            <td>$" . number_format($row["precio_unitario"], 2) . "</td>
                            <td>$" . number_format($row["total"], 2) . "</td>
                            <td>
                                <a href='eliminar_ventas.php?id=" . $row["reporte_id"] . "' class='btn-eliminar'>Eliminar</a>
                            </td>
                          </tr>";
                }
                echo "</table>
                      </div>";
            } else {
                echo "No se encontraron reportes de ventas.";
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
    <img src="../Imagenes/logo-transparent.png" alt="Logo StreetSync Footer" />
  </footer>

<!-- Modal para agregar venta -->
<div id="modalAgregar" class="modal">
  <div class="modal-content">
    <span class="close modal-cerrar">&times;</span> <!-- Cerrar modal -->
    <h3>Agregar Venta</h3>
    <form action="agregar_ventas.php" method="POST" id="formAgregarVenta">
  <input type="text" name="cliente_nombre" placeholder="Nombre del Cliente" required />
  <input type="text" name="producto_nombre" placeholder="Producto Vendido" required />
  <input type="number" name="cantidad" placeholder="Cantidad" required />
  <input type="number" step="0.01" name="precio_unitario" placeholder="Precio Unitario" required />
  <button type="submit" class="btn-agregar">Agregar Venta</button>
</form>

  </div>
</div>

<!-- Modal para mostrar mensaje -->
<div id="modalMensaje" class="modal">
  <div class="modal-content">
    <span class="close" id="cerrarModalMensaje" >&times;</span>
    <h3 id="mensajeTexto"></h3>
  </div>
</div>

<script src="animaciones_ventas.js"></script>
</body>
</html>
