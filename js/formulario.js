// Función para validar el formulario de login
function validarLogin() {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    if (email === "") {
        alert("Por favor ingresa tu correo electrónico");
        return false;
    }

    if (password === "") {
        alert("Por favor ingresa tu contraseña");
        return false;
    }

    return true;
}

// Función para validar el formulario de registro
function validarRegistro() {
    var fullName = document.getElementById("inputFullName").value;
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    if (fullName === "") {
        alert("Por favor ingresa tu nombre completo");
        return false;
    }

    if (email === "") {
        alert("Por favor ingresa tu correo electrónico");
        return false;
    }

    if (password === "") {
        alert("Por favor ingresa tu contraseña");
        return false;
    }

    return true;
}
