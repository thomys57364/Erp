<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion.php';

// Verificar si se ha pasado el ID del cliente
if (isset($_GET['id'])) {
    $cliente_id = $_GET['id'];

    // Obtener los datos del cliente a editar
    $sql = "SELECT * FROM clientes WHERE cliente_id = $cliente_id";
    $result = $conn->query($sql);
    $cliente = $result->fetch_assoc();
}


    // Cerrar la conexión
    $conn->close();

?>


