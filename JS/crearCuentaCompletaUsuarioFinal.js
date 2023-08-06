function validarDatos(evento) {
    evento.preventDefault();
    var clave = document.getElementById('clave').value;
    var confirmarClave = document.getElementById('confirmarClave').value;
    var fechaInicioAcademica = document.getElementById("fechaInicioAcademica").value;
    var fechaFinalAcademica = document.getElementById("fechaFinalAcademica").value;
    var fechaActual = new Date();
    var fechaInicioElegidaAcademica = new Date(fechaInicioAcademica);
    var empresa = document.getElementById("empresa").value;
    var tituloEmpresa = document.getElementById("tituloEmpresa").value;
    var fechaInicioLaboral = document.getElementById("fechaInicioLaboral").value;
    var descripcionRol = document.getElementById("descripcionRol").value;
    var fechaFinalizacionLaboral = document.getElementById("fechaFinalizacionLaboral").value;
    var fechaInicioElegidaLaboral = new Date(fechaInicioLaboral);
    var fechaFinalizacionElegidaLaboral = new Date(fechaFinalizacionLaboral);
    var archivoCurriculum = document.getElementById("archivoCurriculum3").value;
    var archivoFoto = document.getElementById("archivoFoto").value;
    var formularioValido = true;


    if (clave !== confirmarClave) {
        alert('La clave y la confirmación de clave no coinciden.');
        formularioValido = false;
    }

    if (clave.length < 6) {
        console.log("Entro a validacion de longitud de clave")
        alert("La contraseña debe tener al menos 6 caracteres");
        formularioValido = false;
    }


    if (fechaInicioElegidaAcademica > fechaActual) {
        alert("La fecha de inicio no puede ser mayor a la fecha actual en la sección de educación");
        formularioValido = false;
    }
    
    if (fechaFinalAcademica < fechaInicioAcademica) {
        alert("La fecha final no puede ser menor a la fecha de inicio en la sección de educación");
        formularioValido = false;
    }

    if (!document.getElementById("sinExperiencia").checked) {
        if (
            empresa === "" ||
            tituloEmpresa === "" ||
            fechaInicioLaboral === "" ||
            descripcionRol === "" 
        ) {
            alert("Debe llenar todos los campos");
            formularioValido = false;
        }
    }

    if (fechaInicioElegidaLaboral > fechaActual) {
        alert("La fecha de inicio no puede ser mayor a la fecha actual en la sección de experiencia laboral");
        formularioValido = false;
    }

    if (fechaFinalizacionElegidaLaboral > fechaActual) {
        alert("La fecha de finalización no puede ser mayor a la fecha actual en la sección de experiencia laboral");
        formularioValido = false;
    }

    if (archivoCurriculum === '' || archivoFoto === '') {
        alert("Debe llenar todos los campos");
        formularioValido = false;
    }


    if (formularioValido === true) {
        redirigirCuentaUsuarioNormalSiguiente()
    }


}

function redirigirCuentaUsuarioNormalSiguiente() {
    window.location.href = "./login.html";
}


window.onload = function () {
    let formulario = document.getElementById('formularioGeneralUsuario');
    formulario.addEventListener('submit', validarDatos);
    let fechaFinalizacionLaboral = document.getElementById("fechaFinalizacionLaboral");
    let actualmenteTrabaja = document.getElementById("actualmenteTrabaja");
    /*let sinExperiencia = document.getElementById("sinExperiencia");*/

    fechaFinalizacionLaboral.addEventListener('input', function () {
        if (fechaFinalizacionLaboral.value !== '') {
            actualmenteTrabaja.disabled = true;
            actualmenteTrabaja.checked = false;
        } else {
            actualmenteTrabaja.disabled = false;
        }
    });

    actualmenteTrabaja.addEventListener('change', function () {
        if (actualmenteTrabaja.checked) {
            fechaFinalizacionLaboral.disabled = true;
            fechaFinalizacionLaboral.value = '';
        } else {
            fechaFinalizacionLaboral.disabled = false;
        }
    });

    /*sinExperiencia.addEventListener('change', function () {
        if (sinExperiencia.checked) {
            empresa.disabled = true;
            empresa.value = '';
            tituloEmpresa.disabled = true;
            tituloEmpresa.value = '';
            fechaInicioLaboral.disabled = true;
            fechaInicioLaboral.value = '';
            fechaFinalizacionLaboral.disabled = true;
            fechaFinalizacionLaboral.value = '';
            descripcionRol.disabled = true;
            descripcionRol.value = '';
            actualmenteTrabaja.disabled = true;
            actualmenteTrabaja.checked = false;

        } else {
            empresa.disabled = false;
            tituloEmpresa.disabled = false;
            fechaInicioLaboral.disabled = false;
            fechaFinalizacionLaboral.disabled = false;
            descripcionRol.disabled = false;
            actualmenteTrabaja.disabled = false;
        }
    });*/



}


/*Inicio seccion 3*/

function validateImg(event) {
    var fileInput = event.target;
    var file = fileInput.files[0];

    if (file) {
        var fileType = file.type;
        var validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

        if (!validExtensions.includes(fileType)) {
            alert('Por favor usar un formato soportado para imagenes: JPG, JPEG, o PNG.');
            fileInput.value = '';
            return;
        }

        // Proceed with validating the file size
        validateImgSize(file);
    }
}

function validateImgSize(file) {
    var fileSize = file.size;
    var maxSize = 3 * 1024 * 1024; // 3MB in bytes

    if (fileSize > maxSize) {
        alert('La imagen seleccionada tiene un peso mayor a 3MB.');
        return;
    }

    // Proceed with previewing the image
    mostrarFoto(file);
}

function mostrarFoto(file) {
    var photoContainer = document.getElementById('photo-container3');

    // This removes the existing photo if the user selects another one
    var existingPhoto = photoContainer.querySelector('img');
    if (existingPhoto) {
        existingPhoto.remove();
    }

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = document.createElement('img');
            img.setAttribute('src', e.target.result);
            img.style.display = 'initial';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            photoContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
}

function validateCV(event) {
    var fileInput = event.target;
    var file = fileInput.files[0];

    if (file) {
        var fileType = file.type;
        var validExtensions = ['application/pdf'];

        if (!validExtensions.includes(fileType)) {
            alert('Por favor, utiliza el formato PDF para el CV.');
            fileInput.value = '';
            return;
        }

        // Proceed with previewing the CV
        validateCVSize(file);
    }
}

function validateCVSize(file) {
    var fileSize = file.size;
    var maxSize = 3 * 1024 * 1024; // 3MB in bytes

    if (fileSize > maxSize) {
        alert('La CV tiene un peso mayor a 3MB.');
        return;
    }

    // Proceed with previewing the image
    mostrarCurriculum(file);
}

function mostrarCurriculum(file) {
    var fileCV = file;
    var cvContainer = document.getElementById('cv-container3');
    var existingCV = cvContainer.querySelector('object');
    if (existingCV) {
        existingCV.remove();
    }

    if (fileCV) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var object = document.createElement('object');
            object.setAttribute('data', e.target.result);
            object.setAttribute('type', 'application/pdf');
            object.style.width = '100%';
            object.style.height = '100%';
            cvContainer.appendChild(object);
        };

        reader.readAsDataURL(fileCV);
    }
}



function redirigirCuentaUsuarioNormalSiguiente() {
    window.location.href = "./login.html";
}

/*Fin seccion 3 */ 