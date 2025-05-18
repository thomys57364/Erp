<?php
include '../../../conexion/conexion.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    if ($conn->query("DELETE FROM ventas WHERE id = $id") === TRUE) {
        header("Location: ventas.php");
        exit;
    } else {
        echo "Error al eliminar: " . $conn->error;
    }
} else {
    echo "ID no especificado.";
}
$conn->close();
