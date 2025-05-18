<?php
require_once("../../conexion/conexion.php");

$correo = $_GET['correo'] ?? '';

$stmt = $conn->prepare("SELECT nombre, correo, direccion, telefono FROM usuarios WHERE correo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($usuario = $result->fetch_assoc()) {
echo json_encode($usuario);
} else {
echo json_encode(["error" => "Usuario no encontrado"]);
}

$stmt->close();
$conn->close();
?>
