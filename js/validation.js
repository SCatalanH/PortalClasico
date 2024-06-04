document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    
    // Obtener los valores del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const terms = document.getElementById('terms').checked;
    
    // Validar que todos los campos estén completos
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Por favor, complete todos los campos.');
        return false;
    }
    
    // Validar el formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return false;
    }

    // Validar los criterios de la contraseña
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un carácter especial.');
        return false;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return false;
    }

    // Validar que se acepten los términos
    if (!terms) {
        alert('Debe aceptar los términos y condiciones.');
        return false;
    }
    
    // Almacenar los datos de registro en el almacenamiento local
    const userData = {
        name: name,
        email: email,
        password: password
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Mostrar mensaje de registro exitoso
    alert('¡Registro exitoso!');

    // Redireccionar a la página de inicio de sesión
    window.location.href = 'login.html';
});
