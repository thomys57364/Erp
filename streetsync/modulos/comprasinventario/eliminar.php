<?php
require '../../../conexion/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;

    if ($id > 0) {
        $sql = "DELETE FROM ventas WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo "ok";
        } else {
            echo "error: no se pudo ejecutar";
        }

        $stmt->close();
    } else {
        echo "error: id inválido";
    }

    $conn->close();
}
?>
