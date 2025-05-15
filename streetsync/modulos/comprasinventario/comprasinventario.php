<?php include "../../../conexion/conexion.php"; ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Administración de Ventas</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            background: #000;
            font-family: Arial, sans-serif;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            width: 90%;
            margin: auto;
            margin-top: 40px;
        }
        h1 {
            text-align: center;
            color: white;
            margin-top: 20px;
        }
        .form-group {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        input[type="text"], input[type="number"], input[type="date"] {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 10px;
            flex: 1;
        }
        button {
            padding: 10px 15px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            color: white;
        }
        #agregar-btn { background-color: #3498db; }
        #eliminar-btn { background-color: #e74c3c; }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
        }
        th {
            background: #7e3af2;
            color: white;
            padding: 10px;
        }
        td {
            text-align: center;
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <h1>Administración de Ventas</h1>
    <div class="container">
        <form id="formulario">
            <div class="form-group">
                <input type="number" name="id" placeholder="Agregar ID">
                <input type="text" name="nombre" placeholder="Agregar Nombre">
                <input type="number" step="0.01" name="ventas" placeholder="Agregar Ventas">
                <input type="number" step="0.01" name="pagos" placeholder="Agregar Pagos">
                <input type="number" step="0.01" name="facturacion" placeholder="Agregar Facturación">
                <input type="date" name="fecha">
            </div>
            <div class="form-group">
                <button type="submit" id="agregar-btn">Agregar Información</button>
                <button type="button" id="eliminar-btn">Eliminar Información</button>
            </div>
        </form>

        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>nombre</th>
                    <th>ventas</th>
                    <th>pagos</th>
                    <th>facturacion</th>
                    <th>fecha_registro</th>
                </tr>
            </thead>
            <tbody>
            <?php
                $resultado = $conn->query("SELECT * FROM ventas ORDER BY id DESC");
                if ($resultado && $resultado->num_rows > 0) {
                    while($fila = $resultado->fetch_assoc()) {
                        echo "<tr>
                                <td>{$fila['id']}</td>
                                <td>{$fila['nombre']}</td>
                                <td>{$fila['ventas']}</td>
                                <td>{$fila['pagos']}</td>
                                <td>{$fila['facturacion']}</td>
                                <td>{$fila['fecha_registro']}</td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='6'>No hay datos registrados</td></tr>";
                }
                $conn->close();
            ?>
            </tbody>
        </table>
    </div>

    <script>
    document.querySelector("#formulario").addEventListener("submit", function(e) {
        e.preventDefault();
        const datos = new FormData(this);

        fetch("guardar.php", {
            method: "POST",
            body: datos
        })
        .then(res => res.text())
        .then(respuesta => {
            if (respuesta.trim() === "ok") {
                alert("Información agregada correctamente");
                location.reload();
            } else {
                alert("Error al agregar: " + respuesta);
            }
        });
    });

    document.querySelector("#eliminar-btn").addEventListener("click", function() {
        const id = document.querySelector("input[name='id']").value;

        if (!id) {
            alert("Ingresa un ID válido para eliminar");
            return;
        }

        fetch("eliminar.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "id=" + encodeURIComponent(id)
        })
        .then(res => res.text())
        .then(respuesta => {
            if (respuesta.trim() === "ok") {
                alert("Registro eliminado");
                location.reload();
            } else {
                alert("Error al eliminar: " + respuesta);
            }
        });
    });
    </script>
</body>
</html>
