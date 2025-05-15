<?php
header('Content-Type: application/json; charset=UTF-8');
include('../../../../conexion/conexion.php');

// Verificamos que llegue el ID por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = intval($_POST['id']);

    // Preparamos la consulta DELETE
    $stmt = $conn->prepare("DELETE FROM empleados WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        // Comprobamos que en efecto se borró una fila
        if ($stmt->affected_rows > 0) {
            echo json_encode(["mensaje" => "Empleado eliminado correctamente."]);
        } else {
            echo json_encode(["error" => "No existe empleado con ID $id."]);
        }
    } else {
        echo json_encode(["error" => "Error al eliminar empleado: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "ID de empleado no recibido."]);
}

$conn->close();
