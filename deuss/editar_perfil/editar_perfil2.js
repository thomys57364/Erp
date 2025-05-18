console.log("🔥 editar_perfil.js cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
  const correo = localStorage.getItem("correoUsuario");

  if (!correo) {
    console.warn("⚠️ No hay correo guardado en localStorage.");
    return;
  }

  // ✅ Obtener datos para mostrar
  fetch(`obtener_datos_usuario.php?correo=${encodeURIComponent(correo)}`)
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener datos del usuario.");
      return res.json();
    })
    .then(data => {
      console.log("📦 Datos recibidos:", data);
      document.getElementById("nombre").value = data.nombre || "";
      document.getElementById("correoOriginal").value = data.correo || "";
      document.getElementById("correo").value = data.correo || "";
      document.getElementById("direccion").value = data.direccion || "";
      document.getElementById("telefono").value = data.telefono || "";

      // ✅ Guardar el correo original (oculto)
      document.getElementById("correoOriginal").value = data.correo || "";
    })
    .catch(err => {
      console.error("❌ Error al cargar datos del usuario:", err);
      document.getElementById("respuesta").innerText = "Error al cargar los datos.";
    });

  // ✅ Guardar cambios al enviar el formulario
  const form = document.getElementById("formRegistro");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("correoOriginal", document.getElementById("correoOriginal").value);
    formData.append("correoOriginal", document.getElementById("correoOriginal").value);
    formData.append("correo", document.getElementById("correo").value);
    formData.append("nombre", document.getElementById("nombre").value);
    formData.append("direccion", document.getElementById("direccion").value);
    formData.append("telefono", document.getElementById("telefono").value);

    fetch("actualizar_usuario.php", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        const respuesta = document.getElementById("respuesta");
        if (data.error) {
          respuesta.style.color = "red";
          respuesta.innerText = data.error;
        } else {
          respuesta.style.color = "green";
          respuesta.innerText = data.mensaje || "Cambios guardados correctamente.";

          // ✅ Actualizar correo en localStorage si fue cambiado
          localStorage.setItem("correoUsuario", document.getElementById("correo").value);
          localStorage.setItem("nombreUsuario", document.getElementById("nombre").value);

          // ✅ Redirigir a la página anterior
          setTimeout(() => {
            const volverA = localStorage.getItem("paginaAnterior") || "../../streetsync/index.html";
            localStorage.removeItem("paginaAnterior");
            window.location.href = volverA;
          }, 1000);
        }
      })
      .catch(err => {
        console.error("❌ Error al actualizar:", err);
        document.getElementById("respuesta").innerText = "Error al actualizar perfil.";
      });
  });

  // ✅ Cerrar sesión
  const cerrarBtn = document.getElementById("cerrarSesion");
  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const confirmar = confirm("¿Estás seguro que deseas cerrar sesión?");
      if (confirmar) {
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("correoUsuario");

        const volverA = localStorage.getItem("paginaAnterior") || "../../streetsync/index.html";
        localStorage.removeItem("paginaAnterior");

        console.log("🔒 Sesión cerrada");
        window.location.href = volverA;
      }
    });
  }
});
