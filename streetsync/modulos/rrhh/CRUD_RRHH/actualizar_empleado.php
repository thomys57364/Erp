<?php
header('Content-Type: application/json; charset=UTF-8');
include('../../../../conexion/conexion.php');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// 1) Recoger y sanear los datos
$id            = isset($_POST['id'])             ? (int) $_POST['id'] : 0;
$nombre        = isset($_POST['nombre'])         ? trim($_POST['nombre']) : '';
$correo        = isset($_POST['correo'])         ? trim($_POST['correo']) : '';
$telefono      = isset($_POST['telefono'])       ? trim($_POST['telefono']) : null;
$cargo         = isset($_POST['cargo'])          ? trim($_POST['cargo']) : null;
$salario       = isset($_POST['salario'])        ? (float) $_POST['salario'] : null;
$fecha_ingreso = isset($_POST['fecha_ingreso'])  ? $_POST['fecha_ingreso'] : null;

if ($id <= 0 || $nombre === '' || $correo === '') {
    echo json_encode(['error' => 'Faltan datos obligatorios']);
    exit;
}

// 2) Prepared statement para la actualización
$stmt = $conn->prepare("
    UPDATE empleados
    SET nombre       = ?,
        correo       = ?,
        telefono     = ?,
        cargo        = ?,
        salario      = ?,
        fecha_ingreso= ?
    WHERE id = ?
");
if (!$stmt) {
    echo json_encode(['error' => 'Error en la preparación: ' . $conn->error]);
    exit;
}

// 3) Bind de parámetros (s = string, d = double, i = integer)
$stmt->bind_param(
    'ssssdsi',
    $nombre,
    $correo,
    $telefono,
    $cargo,
    $salario,
    $fecha_ingreso,
    $id
);

// 4) Ejecutar y devolver respuesta
if ($stmt->execute()) {
    echo json_encode(['mensaje' => 'Empleado actualizado correctamente']);
} else {
    echo json_encode(['error' => 'Error al actualizar: ' . $stmt->error]);
}

// 5) Cerrar recursos
$stmt->close();
$conn->close();