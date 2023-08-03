function validarDatos(evento) {
    evento.preventDefault();
    var correo = document.getElementById("correo").value;
    var contrasena = document.getElementById("contrasena").value;
    var formularioValido = true;

    if (correo === '') {
        alert("El campo correo no puede estar vacío");
        formularioValido = false;
    }

    if (contrasena === '') {
        alert("El campo contraseña no puede estar vacío");
        formularioValido = false;

    }

    if (formularioValido === true) {
        redirigirCuentaUsuarioGeneral()
    }

}


function redirigirCuentaUsuarioGeneral() {
    /* Esto es para cambiar llevarnos a donde sería el landing page de la cuenta de colaborador*/
    window.location.href = "./landingUsuarioFinal.html";
}

window.onload = function () {
    let formulario = document.getElementById('formularioInicioSesion');
    formulario.addEventListener('submit', validarDatos);
}