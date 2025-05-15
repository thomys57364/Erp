<?php
header('Content-Type: application/json; charset=UTF-8');

$conn_file = __DIR__ . '../../../../conexion/conexion.php';
if (! file_exists($conn_file)) {
    http_response_code(500);
    echo json_encode(['error' => "No se encontró el archivo de conexión."]);
    exit;
}
require $conn_file;

// 1) Traer todos los empleados, ordenados por id descendente
$sql = "SELECT id, nombre, correo, telefono, cargo, salario, fecha_ingreso 
        FROM empleados 
        ORDER BY id ASC";

if (! $res = $conn->query($sql)) {
    http_response_code(500);
    echo json_encode([
        'error' => "Error en la consulta a la base de datos: " . $conn->error
    ], JSON_UNESCAPED_UNICODE);
    $conn->close();
    exit;
}

$empleados = [];
while ($row = $res->fetch_assoc()) {
    $empleados[] = $row;
}

// 2) Devolver JSON
echo json_encode($empleados, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$conn->close();
exit;
