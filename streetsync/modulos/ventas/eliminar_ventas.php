<?php
include '../../../conexion/conexion.php';

if (isset($_GET['id'])) {
    $reporte_id = intval($_GET['id']);

    $sql = "DELETE FROM reporte_ventas WHERE reporte_id = $reporte_id";

    if ($conn->query($sql) === TRUE) {
        header("Location: ventas.php");
        exit();
    } else {
        echo "Error al eliminar la venta: " . $conn->error;
    }
} else {
    echo "ID de venta no especificado.";
}

$conn->close();
?>
