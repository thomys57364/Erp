<?php
include '../../../conexion/conexion.php';

header('Content-Type: application/json');

$mensaje = '';

// Validar campos requeridos
if (
    isset($_POST['fecha']) &&
    isset($_POST['cliente_nombre']) &&
    isset($_POST['producto_nombre']) &&
    isset($_POST['cantidad']) &&
    isset($_POST['precio_unitario'])
) {
    // Sanitizar entradas
    $fecha = $conn->real_escape_string($_POST['fecha']);
    $cliente_nombre = $conn->real_escape_string($_POST['cliente_nombre']);
    $producto_nombre = $conn->real_escape_string($_POST['producto_nombre']);
    $cantidad = intval($_POST['cantidad']);
    $precio_unitario = floatval($_POST['precio_unitario']);

    // Calcular total
    $total = $cantidad * $precio_unitario;

    // Insertar en tabla reporte_ventas
    $sql = "INSERT INTO reporte_ventas (fecha, cliente_nombre, producto_nombre, cantidad, precio_unitario, total) 
            VALUES ('$fecha', '$cliente_nombre', '$producto_nombre', $cantidad, $precio_unitario, $total)";

    if ($conn->query($sql) === TRUE) {
        $mensaje = "Venta agregada exitosamente";
    } else {
        $mensaje = "Error al agregar venta: " . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();
}

echo json_encode(['mensaje' => $mensaje]); // Devolver el mensaje en formato JSON para mostrar en el modal
exit; // <--- AGREGAR ESTO
?>
