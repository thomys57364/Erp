// Activar animaciones slide-in al cargar
window.addEventListener('load', () => {
  const elementosSlide = document.querySelectorAll('.slide-in-left');
  elementosSlide.forEach((el) => {
    el.classList.add('visible-slide');
  });
});

// Enviar datos al servidor y redirigir si todo está correcto
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault(); // evita el envío tradicional

  const form = e.target;

  // Validar contraseñas
  const contrasena = form.querySelector('input[name="contrasena"]').value;
  const confirmarContrasena = form.querySelector('input[name="confirmarContrasena"]').value;

  if (contrasena !== confirmarContrasena) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity(); // permite que el navegador muestre errores
    return;
  }

  // Capturar datos del formulario
  const datos = {
    nombreCompleto: form.querySelector('input[name="nombreCompleto"]').value,
    correo: form.querySelector('input[name="correo"]').value,
    contrasena: contrasena,
    telefono: form.querySelector('input[name="telefono"]').value,
    rol: form.querySelector('input[name="rol"]:checked')?.value || '',
    codigoVerificacion: form.querySelector('input[name="codigoVerificacion"]').value
  };

  try {
    const respuesta = await fetch("https://erp-production-7865.up.railway.app/registrar-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();

    if (respuesta.ok) {
      alert(resultado.mensaje);
      window.location.href = "../inicio_admi/inicio_admi.html";
    } else {
      alert("Error: " + resultado.mensaje);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al enviar los datos.");
  }
});
