<?php
// Incluir el archivo de conexión a la base de datos
include '../../../conexion/conexion.php';

// Consulta inicial
$sql = "SELECT * FROM contabilidad ORDER BY fecha DESC";
$result = $conn->query($sql);

// Verificar si se ha realizado una búsqueda
if (isset($_POST['buscar'])) {
    $busqueda = $conn->real_escape_string($_POST['buscar']);
    $sql = "SELECT * FROM contabilidad 
            WHERE concepto LIKE '%$busqueda%' 
               OR tipo LIKE '%$busqueda%' 
               OR fecha LIKE '%$busqueda%'";
    $result = $conn->query($sql);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Módulo de Contabilidad</title>
  <link rel="stylesheet" href="estilos_contabilidad.css?v=2" />
  <link rel="icon" href="../../../imagenes/logo-transparent.png" type="image/png" />
</head>
<body>

  <!-- Botón volver -->
  <a href="../modulos.html" class="btn-volver">&#8592;</a>

  <!-- Encabezado -->
  <header class="logo-top">
    <img src="../../../imagenes/logo-transparent.png" alt="Logo StreetSync" />
    <h1>Gestión Contable</h1>
  </header>

  <!-- Contenido principal -->
  <main>
    <div class="modulos-grid">
      <div class="modulo-card">
        <div class="modulo-texto">

          <!-- Formulario de búsqueda -->
          <form action="" method="POST" class="search-form">
            <input type="text" name="buscar" class="search-input" placeholder="Buscar movimiento..." />
            <div class="botones-form">
              <button type="submit" class="btn-buscar">Actualizar</button>
              
            </div>
          </form>
          <form method="GET" action="ver_reporte.php" target="_blank" style="text-align:center; margin-bottom: 2rem;">
  <label for="mes">Mes:</label>
  <select name="mes" id="mes">
    <?php for ($m = 1; $m <= 12; $m++): ?>
      <option value="<?= $m ?>"><?= $m ?></option>
    <?php endfor; ?>
  </select>
  <label for="anio">Año:</label>
  <select name="anio" id="anio">
    <?php for ($a = 2023; $a <= date('Y'); $a++): ?>
      <option value="<?= $a ?>"><?= $a ?></option>
    <?php endfor; ?>
  </select>
  <button type="submit" class="btn-agregar">Ver Reporte</button>
</form>

          <!-- Tabla de movimientos contables -->
          <div class="clientes-list">
            <?php
            if ($result && $result->num_rows > 0) {
                echo "<div class='tabla-container'>
                        <table class='tabla-clientes'>
                          <thead>
                            <tr>
                              <th>Fecha</th>
                              <th>Tipo</th>
                              <th>Concepto</th>
                              <th>Monto</th>
                              </tr>
                          </thead>
                          <tbody>";
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>
                            <td>" . htmlspecialchars($row["fecha"]) . "</td>
                            <td>" . htmlspecialchars($row["tipo"]) . "</td>
                            <td>" . htmlspecialchars($row["concepto"]) . "</td>
                            <td>$" . number_format($row["monto"], 2) . "</td>
                            
                          </tr>";
                }
                echo "  </tbody>
                        </table>
                      </div>";
            } else {
                echo "<p style='text-align:center;'>No se encontraron movimientos contables.</p>";
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



  <!-- Modales (Agregar, Editar, Eliminar) se incluirán luego -->
  <script src="animaciones_contabilidad.js?v=2"></script>
</body>
</html>
