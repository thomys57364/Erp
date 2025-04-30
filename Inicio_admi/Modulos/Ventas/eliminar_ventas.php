<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion.php';

// Verificar si se ha pasado el ID del reporte
if (isset($_GET['id'])) {
    $reporte_id = $_GET['id'];

    // Eliminar el reporte de venta de la base de datos
    $sql = "DELETE FROM reporte_ventas WHERE reporte_id = $reporte_id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Reporte de venta eliminado exitosamente";
    } else {
        echo "Error al eliminar reporte de venta: " . $conn->error;
    }

    // Redirigir de nuevo a la página de administración
    header("Location: ventas.php"); // <--- Asegúrate que este archivo sea tu listado de ventas
    exit();
}

// Cerrar la conexión
$conn->close();
?>
