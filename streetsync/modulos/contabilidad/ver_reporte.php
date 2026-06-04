<?php
include '../../../conexion/conexion.php';

$mes = $_GET['mes'] ?? date('m');
$anio = $_GET['anio'] ?? date('Y');

$sql = "SELECT * FROM contabilidad 
        WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?
        ORDER BY fecha ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $mes, $anio);
$stmt->execute();
$resultado = $stmt->get_result();

$ingresos = $egresos = 0;
$filas = "";

while ($fila = $resultado->fetch_assoc()) {
    $tipo = $fila['tipo'];
    $monto = $fila['monto'];
    $concepto = $fila['concepto'];
    $fecha = $fila['fecha'];

    if ($tipo === 'Ingreso') $ingresos += $monto;
    if ($tipo === 'Egreso') $egresos += $monto;

    $filas .= "<tr>
        <td>$fecha</td>
        <td>$tipo</td>
        <td>$concepto</td>
        <td>\$" . number_format($monto, 2) . "</td>
    </tr>";
}

$balance = $ingresos - $egresos;
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Reporte Contable - <?= "$mes/$anio" ?></title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      background-color: #0f0f0f;
      color: #eee;
      padding: 2rem;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
      color: #a18cff;
    }

    .contenedor {
      max-width: 1000px;
      margin: 0 auto;
      background-color: #1a1a1a;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(126, 63, 242, 0.3);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      border-bottom: 1px solid #444;
      padding: 12px 16px;
      text-align: left;
    }

    th {
      background-color: #7e3ff2;
      color: white;
      text-transform: uppercase;
    }

    tr:hover {
      background-color: #2a2a2a;
    }

    .resumen {
      margin-top: 30px;
      background-color: #222;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 0 15px rgba(126, 63, 242, 0.2);
    }

    .resumen p {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .resumen strong {
      color: #a18cff;
    }

    .volver {
      display: inline-block;
      margin-top: 2rem;
      text-decoration: none;
      background-color: #7e3ff2;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      transition: background-color 0.3s;
    }

    .volver:hover {
      background-color: #5e1fb8;
    }

  </style>
</head>
<body>
  <div class="contenedor">
    <h2>Reporte Contable - <?= "$mes/$anio" ?></h2>

    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Concepto</th>
          <th>Monto</th>
        </tr>
      </thead>
      <tbody>
        <?= $filas ?>
      </tbody>
    </table>

    <div class="resumen">
      <p><strong>Total Ingresos:</strong> \$<?= number_format($ingresos, 2) ?></p>
      <p><strong>Total Egresos:</strong> \$<?= number_format($egresos, 2) ?></p>
      <p><strong>Balance Final:</strong> \$<?= number_format($balance, 2) ?></p>
    </div>

    <div style="text-align: center;">
      <a href="contabilidad.php" class="volver">← Volver a Contabilidad</a>
    </div>
  </div>
</body>
</html>
