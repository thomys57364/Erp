<?php
include '../../../conexion/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $res = $conn->query("SELECT * FROM ventas WHERE id = $id");
    if ($res && $res->num_rows) {
        header('Content-Type: application/json');
        echo json_encode($res->fetch_assoc());
    } else {
        header('HTTP/1.1 404 Not Found');
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id         = intval($_POST['id']);
    $nombre     = $conn->real_escape_string($_POST['nombre']);
    $ventas     = floatval($_POST['ventas']);
    $pagos      = floatval($_POST['pagos']);
    $facturacion= floatval($_POST['facturacion']);

    $sql = "UPDATE ventas SET
              nombre      = '$nombre',
              ventas      = $ventas,
              pagos       = $pagos,
              facturacion = $facturacion
            WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        header("Location: ventas.php");
        exit;
    } else {
        echo "Error al actualizar: " . $conn->error;
    }
    $conn->close();
}
