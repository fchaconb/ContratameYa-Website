function redireccionar() {
    var opcionesRadio = document.getElementsByName('opcion');
    var seleccionRadio = false;

    for (var eleccion = 0; eleccion < opcionesRadio.length; eleccion++) {
        if (opcionesRadio[eleccion].checked) {
            seleccionRadio = true;
            break;
        }
    }

    if (seleccionRadio) {
        var opcionRadioElegido = document.querySelector('input[name="opcion"]:checked').value;
        if (opcionRadioElegido === 'Para Empresa') {
            window.location.href = 'cuenta-para-empresa.html';
        } else if (opcionRadioElegido === 'Para Colaborador de Empresa') {
            window.location.href = 'cuenta-para-colaborador-empresa.html';
        } else if (opcionRadioElegido === 'Para Usuario normal') {
            window.location.href = 'cuenta-para-usuario-normal.html';
        }
    } else {
        alert('Debes seleccionar una opción antes de continuar.');
    }
}


