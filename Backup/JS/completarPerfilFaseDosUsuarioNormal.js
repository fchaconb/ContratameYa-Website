function redirigirCuentaUsuarioNormalSiguiente() {
    /* Esto es para cambiar llevarnos a donde sería el landing page de la cuenta de colaborador*/
    window.location.href = "/HTML/completar-perfil-usuario-normal-3.html";
}


function validarDatos(evento) {
    evento.preventDefault();
    var empresa = document.getElementById("empresa").value;
    var tituloEmpresa = document.getElementById("tituloEmpresa").value;
    var fechaInicio = document.getElementById("fechaInicio").value;
    var descripcionRol = document.getElementById("descripcionRol").value;
    var actualmenteTrabaja = document.getElementById("actualmenteTrabaja").value;
    var fechaFinalizacion = document.getElementById("fechaFinalizacion").value;

    var formularioValido = true;
    var fechaActual = new Date();
    var fechaInicioElegida = new Date(fechaInicio);
    var fechaFinalizacionElegida = new Date(fechaFinalizacion);

    if (!document.getElementById("sinExperiencia").checked) {
        if (
            empresa === "" ||
            tituloEmpresa === "" ||
            fechaInicio === "" ||
            descripcionRol === "" 
        ) {
            alert("Debe llenar todos los campos");
            formularioValido = false;
        }
    }

    if (fechaInicioElegida > fechaActual) {
        alert("La fecha de inicio no puede ser mayor a la fecha actual");
        formularioValido = false;
    }

    if (fechaFinalizacionElegida > fechaActual) {
        alert("La fecha de finalización no puede ser mayor a la fecha actual");
        formularioValido = false;
    }


    if (formularioValido === true) {
        redirigirCuentaUsuarioNormalSiguiente()
    }


}

window.onload = function () {
    let formulario = document.getElementById('formularioDatosUsuario2');
    formulario.addEventListener('submit', validarDatos);
    let fechaFinalizacion = document.getElementById("fechaFinalizacion");
    let actualmenteTrabaja = document.getElementById("actualmenteTrabaja");
    let sinExperiencia = document.getElementById("sinExperiencia");

    fechaFinalizacion.addEventListener('input', function () {
        if (fechaFinalizacion.value !== '') {
            actualmenteTrabaja.disabled = true;
            actualmenteTrabaja.checked = false;
        } else {
            actualmenteTrabaja.disabled = false;
        }
    });

    actualmenteTrabaja.addEventListener('change', function () {
        if (actualmenteTrabaja.checked) {
            fechaFinalizacion.disabled = true;
            fechaFinalizacion.value = '';
        } else {
            fechaFinalizacion.disabled = false;
        }
    });

    sinExperiencia.addEventListener('change', function () {
        if (sinExperiencia.checked) {
            empresa.disabled = true;
            empresa.value = '';
            tituloEmpresa.disabled = true;
            tituloEmpresa.value = '';
            fechaInicio.disabled = true;
            fechaInicio.value = '';
            fechaFinalizacion.disabled = true;
            fechaFinalizacion.value = '';
            descripcionRol.disabled = true;
            descripcionRol.value = '';
            actualmenteTrabaja.disabled = true;
            actualmenteTrabaja.checked = false;

        } else {
            empresa.disabled = false;
            tituloEmpresa.disabled = false;
            fechaInicio.disabled = false;
            fechaFinalizacion.disabled = false;
            descripcionRol.disabled = false;
            actualmenteTrabaja.disabled = false;
        }
    });



}

