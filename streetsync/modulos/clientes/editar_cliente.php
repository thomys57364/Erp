<?php
include '../../../conexion/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $cliente_id = intval($_GET['id']);
    $sql = "SELECT cliente_id, nombre, apellido, email, telefono, direccion FROM clientes WHERE cliente_id = $cliente_id";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        $cliente = $result->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($cliente);
    } else {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Cliente no encontrado']);
    }
    $conn->close();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cliente_id = intval($_POST['cliente_id']);
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];

    $sql = "UPDATE clientes SET nombre='$nombre', apellido='$apellido', email='$email', telefono='$telefono', direccion='$direccion' WHERE cliente_id=$cliente_id";

    if ($conn->query($sql) === TRUE) {
        // Después de actualizar, redirigir o mostrar mensaje
        header("Location: cliente.php");
        exit();
    } else {
        echo "Error al actualizar cliente: " . $conn->error;
    }

    $conn->close();
}
?>
