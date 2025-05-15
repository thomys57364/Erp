<?php
$servername = "database-erp.cv064qs40dkr.us-east-2.rds.amazonaws.com"; // Cambia según tu configuración
$username = "admin"; // Cambia por tu nombre de usuario
$password = "tlcc3012185521"; // Cambia por tu contraseña
$dbname = "admin_clientes"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
