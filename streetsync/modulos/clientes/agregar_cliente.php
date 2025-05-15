<?php
// Incluir el archivo de conexión a la base de datos
include '../../../conexion/conexion.php';

header('Content-Type: application/json'); // <--- AGREGAR ESTO

// Definir una variable para el mensaje
$mensaje = '';

// Verificar si los datos del formulario están disponibles
if (isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['email']) && isset($_POST['telefono']) && isset($_POST['direccion'])) {
    // Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];

    // Insertar el nuevo cliente en la base de datos
    $sql = "INSERT INTO clientes (nombre, apellido, email, telefono, direccion) 
            VALUES ('$nombre', '$apellido', '$email', '$telefono', '$direccion')";
    
    if ($conn->query($sql) === TRUE) {
        $mensaje = "Nuevo cliente agregado exitosamente";  // Mensaje de éxito
    } else {
        $mensaje = "Error al agregar cliente: " . $conn->error;  // Mensaje de error
    }

    // Cerrar la conexión
    $conn->close();
}

echo json_encode(['mensaje' => $mensaje]); // Devolver el mensaje en formato JSON para mostrar en el modal
exit; // <--- AGREGAR ESTO
?>

