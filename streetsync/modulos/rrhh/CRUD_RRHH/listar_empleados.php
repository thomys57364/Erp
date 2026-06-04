<?php
// Mostrar errores para debug
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=UTF-8');

// Ruta corregida según tu estructura real
$conn_file = __DIR__ . '/../../../../conexion/conexion.php';

// Verificación
if (!file_exists($conn_file)) {
    echo json_encode(['error' => "❌ No se encontró el archivo de conexión en: $conn_file"]);
    exit;
}

require $conn_file;

// Consulta empleados
$sql = "SELECT id, nombre, correo, telefono, cargo, salario, fecha_ingreso 
        FROM empleados 
        ORDER BY id ASC";

if (! $res = $conn->query($sql)) {
    http_response_code(500);
    echo json_encode(['error' => "❌ Error en la consulta: " . $conn->error]);
    exit;
}

// Enviar resultados
$empleados = [];
while ($row = $res->fetch_assoc()) {
    $empleados[] = $row;
}

echo json_encode($empleados, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$conn->close();
exit;
