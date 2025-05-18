document.getElementById('formRegistro').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const password = document.getElementById('password').value.trim();
    const repetir = document.getElementById('repetir').value.trim();
    const respuesta = document.getElementById('respuesta');

    if (password !== repetir) {
    respuesta.style.color = 'red';
    respuesta.innerText = 'Las contraseñas no coinciden.';
    return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    formData.append('password', password);

    fetch('/erp-erp/deuss/crear_usuario/registrar_usuario.php', {
    method: 'POST',
    body: formData
    })
    .then(res => res.text())
    .then(text => {
        try {
        const data = JSON.parse(text); // ✅ Aquí es donde faltaba parsear
        if (data.error) {
            respuesta.style.color = 'red';
            respuesta.innerText = data.error;
        } else {
            console.log("✅ Usuario registrado. Mostrando pop-up.");
            const popup = document.getElementById('popup');
            if (popup) {
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
                window.location.href = '../login_pagina/login.html';
            }, 2250);
            } else {
            // Por si no existe el popup, al menos redirige
            window.location.href = '../login_pagina/login.html';
            }
        }
        } catch (e) {
        console.error('❌ No es JSON válido:', text);
        respuesta.style.color = 'red';
        respuesta.innerText = 'Error del servidor. Revisa consola.';
        }
    })
    .catch(err => {
        console.error('Error de red o fetch:', err);
        respuesta.style.color = 'red';
        respuesta.innerText = 'Error de conexión.';
    });
});
