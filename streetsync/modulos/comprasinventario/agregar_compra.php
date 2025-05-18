<?php
include '../../../conexion/conexion.php';
header('Content-Type: application/json');
$mensaje = '';

if (
    isset($_POST['nombre']) &&
    isset($_POST['ventas']) &&
    isset($_POST['pagos']) &&
    isset($_POST['facturacion'])
) {
    $nombre     = $conn->real_escape_string($_POST['nombre']);
    $ventas     = floatval($_POST['ventas']);
    $pagos      = floatval($_POST['pagos']);
    $facturacion= floatval($_POST['facturacion']);

    $sql = "INSERT INTO ventas (nombre, ventas, pagos, facturacion)
            VALUES ('$nombre', $ventas, $pagos, $facturacion)";

    if ($conn->query($sql) === TRUE) {
        $mensaje = "Venta agregada exitosamente";
    } else {
        $mensaje = "Error: " . $conn->error;
    }
    $conn->close();
}

echo json_encode(['mensaje' => $mensaje]);
exit;
