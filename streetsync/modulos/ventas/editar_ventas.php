<?php
include '../../../conexion/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $reporte_id = intval($_GET['id']);
    $sql = "SELECT reporte_id, fecha, cliente_nombre, producto_nombre, cantidad, precio_unitario FROM reporte_ventas WHERE reporte_id = $reporte_id";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $venta = $result->fetch_assoc();
        header('Content-Type: application/json');
        echo json_encode($venta);
    } else {
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['error' => 'Venta no encontrada']);
    }
    $conn->close();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reporte_id = intval($_POST['reporte_id']);
    $fecha = $conn->real_escape_string($_POST['fecha']);
    $cliente_nombre = $conn->real_escape_string($_POST['cliente_nombre']);
    $producto_nombre = $conn->real_escape_string($_POST['producto_nombre']);
    $cantidad = intval($_POST['cantidad']);
    $precio_unitario = floatval($_POST['precio_unitario']);
    $total = $cantidad * $precio_unitario;

    $sql = "UPDATE reporte_ventas SET 
            cliente_nombre = '$cliente_nombre',
            producto_nombre = '$producto_nombre',
            cantidad = $cantidad,
            precio_unitario = $precio_unitario,
            total = $total
        WHERE reporte_id = $reporte_id";


    if ($conn->query($sql) === TRUE) {
        header("Location: ventas.php");
        exit();
    } else {
        echo "Error al actualizar venta: " . $conn->error;
    }
    $conn->close();
}
?>
