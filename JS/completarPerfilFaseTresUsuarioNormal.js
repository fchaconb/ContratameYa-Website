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
    var photoContainer = document.getElementById('photo-container');

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
    var cvContainer = document.getElementById('cv-container');
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

function validarDatos(evento) {
    evento.preventDefault();
    var archivoCurriculum = document.getElementById("archivoCurriculum").value;
    var archivoFoto = document.getElementById("archivoFoto").value;

    var formularioValido = true;

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
    let formulario = document.getElementById('formularioDatosUsuario3');
    formulario.addEventListener('submit', validarDatos);

}

