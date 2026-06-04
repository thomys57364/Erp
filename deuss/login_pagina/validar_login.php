<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

require_once(__DIR__ . '/../../conexion/conexion.php');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

$correo = $_POST['correo'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($correo) || empty($password)) {
    echo json_encode(["error" => "Todos los campos son obligatorios."]);
    exit;
}

$stmt = $conn->prepare("SELECT id, nombre, correo, password FROM usuarios WHERE correo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Correo no registrado."]);
    exit;
}

$usuario = $result->fetch_assoc();

if (!password_verify($password, $usuario['password'])) {
    echo json_encode(["error" => "Contraseña incorrecta."]);
    exit;
}

// ✅ Respuesta correcta
echo json_encode([
    "mensaje" => "Inicio de sesión correcto",
    "nombre" => $usuario['nombre'],
    "correo" => $usuario['correo']
]);

$stmt->close();
$conn->close();
?>
