function redirigirCuentaUsuarioNormalSiguiente() {
    /* Esto es para cambiar llevarnos a donde sería el landing page de la cuenta de colaborador*/
    window.location.href = "/HTML/completar-perfil-usuario-normal-2.html";
}


function validarDatos(evento) {
    evento.preventDefault();
    var fechaInicio = document.getElementById("fechaInicio").value;
    var fechaFinal = document.getElementById("fechaFinal").value;

    var formularioValido = true;
    var fechaActual = new Date();
    var fechaInicioElegida = new Date(fechaInicio);


    if (fechaInicioElegida > fechaActual) {
        alert("La fecha de inicio no puede ser mayor a la fecha actual");
        formularioValido = false;
    }
    
    if (fechaFinal < fechaInicio) {
        alert("La fecha final no puede ser menor a la fecha de inicio");
        formularioValido = false;
    }

    if (formularioValido === true) {

        redirigirCuentaUsuarioNormalSiguiente()

    }

}

window.onload = function () {
    let formulario = document.getElementById('formularioDatosCompletarPerfil');
    formulario.addEventListener('submit', validarDatos);

}