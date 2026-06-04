<?php
include '../../../conexion/conexion.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    if ($conn->query("DELETE FROM Inventario WHERE id_inventario = $id") === TRUE) {
        header("Location: compra.php"); // Redirige de nuevo a la página del inventario
        exit;
    } else {
        echo "Error al eliminar: " . $conn->error;
    }
} else {
    echo "ID no especificado.";
}

$conn->close();
