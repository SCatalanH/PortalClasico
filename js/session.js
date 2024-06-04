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
