const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = "mongodb://mongo:NUaprBrBjDNoExttDZeVVqKDfQYvLXWQ@mongodb.railway.internal:27017";
const client = new MongoClient(uri);

const dbName = "RegistroAdmin";
const collectionName = "usuarios";
const codigoVerificacionFijo = "1234"; // Puedes cambiar esto por el código que tú quieras

app.post('/registrar', async (req, res) => {
  const datos = req.body;

  if (datos.codigo !== codigoVerificacionFijo) {
    return res.status(403).json({ error: "Código de verificación incorrecto." });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Elimina el campo código antes de guardar si no quieres almacenarlo
    delete datos.codigo;

    await collection.insertOne(datos);
    res.json({ mensaje: "Administrador registrado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar." });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
