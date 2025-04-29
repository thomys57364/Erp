<?php
include 'conexion.php';

// Consultar los datos de clientes
$sql = "SELECT * FROM clientes";
$result = $conn->query($sql);

// Verificar si hay resultados
if ($result->num_rows > 0) {
    // Crear un arreglo para almacenar los resultados
    while($row = $result->fetch_assoc()) {
        echo "<div class='cliente'>
                <h3>" . $row["nombre"] . " " . $row["apellido"] . "</h3>
                <p>Email: " . $row["email"] . "</p>
                <p>Teléfono: " . $row["telefono"] . "</p>
                <p>Dirección: " . $row["direccion"] . "</p>
                <p>Fecha de Registro: " . $row["fecha_registro"] . "</p>
              </div>";
    }
} else {
    echo "No se encontraron clientes";
}

// Cerrar la conexión
$conn->close();
?>
