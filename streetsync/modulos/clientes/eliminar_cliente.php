<?php
// Incluir el archivo de conexión a la base de datos
include '../../../conexion/conexion.php';

// Verificar si se ha pasado el ID del cliente
if (isset($_GET['id'])) {
    $cliente_id = $_GET['id'];

    // Eliminar el cliente de la base de datos
    $sql = "DELETE FROM clientes WHERE cliente_id = $cliente_id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Cliente eliminado exitosamente";
    } else {
        echo "Error al eliminar cliente: " . $conn->error;
    }

    // Redirigir de nuevo a la página de administración
    header("Location: cliente.php");
    exit();
}

// Cerrar la conexión
$conn->close();
?>
