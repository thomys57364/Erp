<?php
include '../../../conexion/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $res = $conn->query("SELECT * FROM Inventario WHERE id_inventario = $id");
    if ($res && $res->num_rows) {
        header('Content-Type: application/json');
        echo json_encode($res->fetch_assoc());
    } else {
        header('HTTP/1.1 404 Not Found');
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_inventario     = intval($_POST['id_inventario']);
    $nombre_producto   = $conn->real_escape_string($_POST['nombre_producto']);
    $categoria         = $conn->real_escape_string($_POST['categoria']);
    $talla             = $conn->real_escape_string($_POST['talla']);
    $color             = $conn->real_escape_string($_POST['color']);
    $cantidad          = intval($_POST['cantidad']);
    $precio_unitario   = floatval($_POST['precio_unitario']);
    $ubicacion         = $conn->real_escape_string($_POST['ubicacion_almacen']);

    $sql = "UPDATE Inventario SET
              nombre_producto   = '$nombre_producto',
              categoria         = '$categoria',
              talla             = '$talla',
              color             = '$color',
              cantidad          = $cantidad,
              precio_unitario   = $precio_unitario,
              ubicacion_almacen = '$ubicacion'
            WHERE id_inventario = $id_inventario";

    if ($conn->query($sql) === TRUE) {
        header("Location: compra.php");
        exit;
    } else {
        echo "Error al actualizar: " . $conn->error;
    }
    $conn->close();
}
