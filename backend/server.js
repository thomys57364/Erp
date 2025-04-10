// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// URL de conexión que copiaste de Railway
const uri = 'mongodb://mongo:NUaprBrBjDNoExttDZeVVqKDfQYvLXWQ@mongodb.railway.internal:27017';
const client = new MongoClient(uri);

app.use(cors());
app.use(bodyParser.json());

// Ruta para registrar administradores
app.post('/registrar-admin', async (req, res) => {
  const datos = req.body;

  // Verifica el código de verificación
  const codigoCorrecto = '69695'; // <-- pon aquí tu código fijo
  if (datos.codigoVerificacion !== codigoCorrecto) {
    return res.status(401).json({ mensaje: 'Código de verificación incorrecto.' });
  }

  try {
    await client.connect();
    const db = client.db('RegistroAdmin'); // nombre de tu base
    const coleccion = db.collection('loginadmin'); // nombre de la colección

    await coleccion.insertOne(datos);
    res.status(201).json({ mensaje: 'Administrador registrado correctamente.' });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  } finally {
    await client.close(); // Cierra la conexión después de cada operación
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
