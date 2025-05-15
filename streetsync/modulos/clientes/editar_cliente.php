<?php
// Incluir el archivo de conexión a la base de datos
include '../../../conexion/conexion.php';

// Verificar si se ha pasado el ID del cliente
if (isset($_GET['id'])) {
    $cliente_id = $_GET['id'];

    // Obtener los datos del cliente a editar
    $sql = "SELECT * FROM clientes WHERE cliente_id = $cliente_id";
    $result = $conn->query($sql);
    $cliente = $result->fetch_assoc();
}

// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];

    // Actualizar los datos del cliente en la base de datos
    $sql = "UPDATE clientes SET nombre='$nombre', apellido='$apellido', email='$email', telefono='$telefono', direccion='$direccion' WHERE cliente_id=$cliente_id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Cliente actualizado exitosamente";
    } else {
        echo "Error al actualizar cliente: " . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();
}
?>


