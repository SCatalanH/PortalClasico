// Capturar el formulario de login
const loginForm = document.getElementById('loginForm');

// Agregar un evento de escucha para el envío del formulario
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los datos del formulario
    const email = document.getElementById('form2Example11').value.trim();
    const password = document.getElementById('form2Example22').value.trim();

    // Obtener los datos de registro almacenados localmente
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Verificar si los datos ingresados coinciden con los datos de registro almacenados
    if (userData && userData.email === email && userData.password === password) {
        // Mostrar un mensaje de éxito y redirigir al usuario a la página principal
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html';

        // Almacena el email del usuario en el localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('email', email);
        
        // Actualizar la navbar para mostrar el nombre de usuario
        updateNavbar();
    } else {
        // Mostrar un mensaje de error si las credenciales son incorrectas
        alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    }
});

// Función para actualizar la navbar con el nombre de usuario
function updateNavbar() {
    const navbarUsernameElement = document.getElementById('navbarUsername');
    if (isLoggedIn()) {
        const email = localStorage.getItem('email'); // Obtener el email del usuario
        navbarUsernameElement.textContent = email; // Actualizar el texto en la navbar con el email del usuario
        navbarUsernameElement.style.display = 'inline';
    } else {
        navbarUsernameElement.textContent = '';
        navbarUsernameElement.style.display = 'none';
    }
}

// Función para verificar si el usuario está autenticado
function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

// Llamar a la función updateNavbar al cargar la página
updateNavbar();
