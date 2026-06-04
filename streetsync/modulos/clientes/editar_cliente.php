<?php
include '../../../conexion/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $sql = "SELECT id, nombre, correo, telefono, direccion FROM usuarios WHERE id = $id";
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
    $id = intval($_POST['id']);
    $nombre = $_POST['nombre'];
    
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];

    $sql = "UPDATE usuarios SET nombre='$nombre',  correo='$correo', telefono='$telefono', direccion='$direccion' WHERE id=$id";

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
