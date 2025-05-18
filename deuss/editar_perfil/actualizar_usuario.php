<?php
header('Content-Type: application/json');
require_once("../../conexion/conexion.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

$correoOriginal = $_POST['correoOriginal'] ?? '';
$correoNuevo = $_POST['correo'] ?? '';
$nombre = $_POST['nombre'] ?? '';
$direccion = $_POST['direccion'] ?? '';
$telefono = $_POST['telefono'] ?? '';

if (!$correoOriginal || !$correoNuevo || !$nombre) {
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

$stmt = $conn->prepare("UPDATE usuarios SET nombre = ?, correo = ?, direccion = ?, telefono = ? WHERE correo = ?");
$stmt->bind_param("sssss", $nombre, $correoNuevo, $direccion, $telefono, $correoOriginal);

if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Perfil actualizado correctamente"]);
} else {
    echo json_encode(["error" => "Error al actualizar"]);
}

$stmt->close();
$conn->close();
?>
