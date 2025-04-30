<?php
$servername = "localhost"; // Cambia según tu configuración
$username = "root"; // Cambia por tu nombre de usuario
$password = "1615"; // Cambia por tu contraseña
$dbname = "admin_clientes"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
