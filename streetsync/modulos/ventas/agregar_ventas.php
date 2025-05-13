<?php
// Incluir el archivo de conexión a la base de datos
include '../../../conexion/conexion.php';

// Definir una variable para el mensaje
$mensaje = '';

// Verificar si los datos del formulario están disponibles
if (isset($_POST['cliente_nombre']) && isset($_POST['producto_nombre']) && isset($_POST['cantidad']) && isset($_POST['precio_unitario'])) {
    // Obtener los datos del formulario
    $cliente_nombre = $_POST['cliente_nombre'];
    $producto_nombre = $_POST['producto_nombre'];
    $cantidad = (int) $_POST['cantidad'];
    $precio_unitario = (float) $_POST['precio_unitario'];

    // Calcular el total
    $total = $cantidad * $precio_unitario;

    // Insertar el nuevo reporte de venta en la base de datos
    $sql = "INSERT INTO reporte_ventas (cliente_nombre, producto_nombre, cantidad, precio_unitario, total) 
            VALUES ('$cliente_nombre', '$producto_nombre', $cantidad, $precio_unitario, $total)";
    
    if ($conn->query($sql) === TRUE) {
        $mensaje = "Nueva venta agregada exitosamente";  // Mensaje de éxito
    } else {
        $mensaje = "Error al agregar venta: " . $conn->error;  // Mensaje de error
    }

    // Cerrar la conexión
    $conn->close();
}

// Devolver el mensaje en formato JSON para mostrar en el modal
echo json_encode(['mensaje' => $mensaje]);
?>
