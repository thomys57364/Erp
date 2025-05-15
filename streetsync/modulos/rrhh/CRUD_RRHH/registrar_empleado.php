<?php
// Incluir la conexión a la base de datos
include('../../../../conexion/conexion.php');

// Verificar si el formulario fue enviado usando POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Recibir los datos del formulario
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $cargo = $_POST['cargo'];
    $salario = $_POST['salario'];
    $fecha_ingreso = $_POST['fecha_ingreso'];

    // Crear la consulta SQL para insertar el nuevo empleado
    $sql = "INSERT INTO empleados (nombre, correo, telefono, cargo, salario, fecha_ingreso)
            VALUES ('$nombre', '$correo', '$telefono', '$cargo', '$salario', '$fecha_ingreso')";

    // Ejecutar la consulta y responder
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["mensaje" => "Empleado registrado exitosamente"]);
    } else {
        echo json_encode(["error" => "Error al registrar empleado: " . $conn->error]);
    }
    
    // Cerrar la conexión
    $conn->close();
}
?>
