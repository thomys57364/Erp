<?php
file_put_contents("registro_debug.txt", json_encode($_POST));

header('Content-Type: application/json');
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ✅ Ruta al archivo de conexión — AJUSTA si no está bien
require_once(__DIR__ . '/../../conexion/conexion.php');

// ✅ Paso 1: DEBUG para verificar si llega el formulario
file_put_contents("registro_debug.txt", json_encode($_POST));

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Método no permitido."]);
    exit;
}

// Validación de campos
$required = ['nombre', 'correo', 'password'];
foreach ($required as $campo) {
    if (empty($_POST[$campo])) {
        echo json_encode(["error" => "Falta el campo '$campo'."]);
        exit;
    }
}

$nombre = trim($_POST['nombre']);
$correo = trim($_POST['correo']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Verificar si ya existe
$check = $conn->prepare("SELECT id FROM usuarios WHERE correo = ?");
$check->bind_param("s", $correo);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["error" => "Este correo ya está registrado."]);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// Insertar en la base de datos
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $correo, $password);

if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Usuario registrado exitosamente."]);
} else {
    echo json_encode(["error" => "Error al registrar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>