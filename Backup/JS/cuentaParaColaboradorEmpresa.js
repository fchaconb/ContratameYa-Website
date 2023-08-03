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


function redirigirCuentaEmpresa() {
    // Esto es para cambiar llevarnos a donde sería el landing page de la cuenta de empresa
    window.location.href = "login.html";
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

        redirigirCuentaEmpresa()

    }

}

window.onload = function () {
    let formulario = document.getElementById('formularioDatosColaboradorEmpresa');
    formulario.addEventListener('submit', validarDatos);
}