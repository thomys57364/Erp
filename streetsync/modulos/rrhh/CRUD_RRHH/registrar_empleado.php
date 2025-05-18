<?php
// 👉 Encabezado: siempre responder JSON
header('Content-Type: application/json');

// 🔧 Mostrar errores (solo en desarrollo)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 🔗 Incluir conexión a la base de datos
require_once(__DIR__ . '/../../../../conexion/conexion.php');


// ✅ Validar método HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

// ✅ Validar existencia de todos los campos
$campos = ['nombre', 'correo', 'telefono', 'cargo', 'salario', 'fecha_ingreso'];
foreach ($campos as $campo) {
    if (!isset($_POST[$campo]) || trim($_POST[$campo]) === '') {
        echo json_encode(["error" => "Falta el campo '$campo'"]);
        exit;
    }
}

// 📥 Sanitizar datos
$nombre = trim($_POST['nombre']);
$correo = trim($_POST['correo']);
$telefono = trim($_POST['telefono']);
$cargo = trim($_POST['cargo']);
$salario = floatval($_POST['salario']);
$fecha_ingreso = $_POST['fecha_ingreso'];

// 🔐 Preparar consulta segura
$stmt = $conn->prepare("INSERT INTO empleados (nombre, correo, telefono, cargo, salario, fecha_ingreso) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["error" => "Error al preparar consulta: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssssis", $nombre, $correo, $telefono, $cargo, $salario, $fecha_ingreso);

// 📤 Ejecutar y responder
if ($stmt->execute()) {
    echo json_encode(["mensaje" => "Empleado registrado exitosamente"]);
} else {
    echo json_encode(["error" => "Error al ejecutar consulta: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>