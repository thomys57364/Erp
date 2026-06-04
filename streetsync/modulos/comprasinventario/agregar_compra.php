<?php
include '../../../conexion/conexion.php';
header('Content-Type: application/json');
$mensaje = '';

if (
    isset($_POST['nombre_producto']) &&
    isset($_POST['categoria']) &&
    isset($_POST['talla']) &&
    isset($_POST['color']) &&
    isset($_POST['cantidad']) &&
    isset($_POST['precio_unitario'])
) {
    $nombre_producto   = $conn->real_escape_string($_POST['nombre_producto']);
    $categoria         = $conn->real_escape_string($_POST['categoria']);
    $talla             = $conn->real_escape_string($_POST['talla']);
    $color             = $conn->real_escape_string($_POST['color']);
    $cantidad          = intval($_POST['cantidad']);
    $precio_unitario   = floatval($_POST['precio_unitario']);
    $ubicacion         = isset($_POST['ubicacion_almacen']) ? $conn->real_escape_string($_POST['ubicacion_almacen']) : '';

    $sql = "INSERT INTO Inventario (
                nombre_producto, categoria, talla, color,
                cantidad, precio_unitario, ubicacion_almacen
            ) VALUES (
                '$nombre_producto', '$categoria', '$talla', '$color',
                $cantidad, $precio_unitario, '$ubicacion'
            )";

    if ($conn->query($sql) === TRUE) {
        $mensaje = "Producto registrado exitosamente";
    } else {
        $mensaje = "Error: " . $conn->error;
    }

    $conn->close();
}

echo json_encode(['mensaje' => $mensaje]);
exit;
