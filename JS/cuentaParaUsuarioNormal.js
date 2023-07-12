function redirigirCuentaUsuarioNormalSiguiente() {
    /* Esto es para cambiar llevarnos a donde sería el landing page de la cuenta de colaborador*/
    window.location.href = "./completar-perfil-usuario-normal-1.html";
}


function validarDatos(evento) {
    evento.preventDefault();
    var clave = document.getElementById('clave').value;
    var confirmarClave = document.getElementById('confirmarClave').value;
    var formularioValido = true;

    if (clave !== confirmarClave) {
        alert('La clave y la confirmación de clave no coinciden.');
        formularioValido = false;
    }

    if (clave.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres");
        formularioValido = false;
    }

    if (formularioValido === true) {

        redirigirCuentaUsuarioNormalSiguiente()

    }

}

window.onload = function () {
    let formulario = document.getElementById('formularioDatosUsuario');
    formulario.addEventListener('submit', validarDatos);
}

