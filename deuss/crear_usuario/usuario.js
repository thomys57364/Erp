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

  if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    respuesta.style.color = 'red';
    respuesta.innerText = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('deuss_usuarios')) || [];

  if (usuarios.find(u => u.correo === correo)) {
    respuesta.style.color = 'red';
    respuesta.innerText = 'Este correo ya está registrado.';
    return;
  }

  usuarios.push({ nombre, correo, password, telefono: '', direccion: '', fecha_registro: new Date().toISOString().split('T')[0] });
  localStorage.setItem('deuss_usuarios', JSON.stringify(usuarios));

  respuesta.style.color = 'green';
  respuesta.innerText = 'Usuario registrado exitosamente.';

  setTimeout(() => { window.location.href = '../login_pagina/login.html'; }, 1800);
});
