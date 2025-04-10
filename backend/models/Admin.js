// models/Admin.js

module.exports = function crearModeloAdmin(datos) {
    return {
      nombreCompleto: datos.nombreCompleto,
      correo: datos.correo,
      contrasena: datos.contrasena,
      telefono: datos.telefono,
      rol: datos.rol,
      codigoVerificacion: datos.codigoVerificacion,
      fechaRegistro: new Date()
    };
  };
  