document.getElementById('recoverForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener el valor del correo electrónico
    const email = document.getElementById('recoverEmail').value.trim();

    // Verificar si el correo electrónico está registrado
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.email === email) {
        // Mostrar un mensaje de éxito
        alert('Se ha enviado un correo electrónico con instrucciones para recuperar tu contraseña.');

    } else {
        // Mostrar un mensaje de error si el correo no está registrado
        alert('El correo electrónico ingresado no está registrado. Por favor, verifica y vuelve a intentarlo.');
    }
});
