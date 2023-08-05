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
  previewImage(file);
}

function previewImage(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var imagePreview = document.getElementById('imagePreview');
    imagePreview.src = e.target.result;
    imagePreview.style.display = 'block';
  };

  reader.readAsDataURL(file);
}

async function actualizarDatosEmpresa() {
  try {
    const respuestaDatosPerfil = await fetch("http://localhost:3000/editarPerfilAdministrador");
    const datosPerfil = await respuestaDatosPerfil.json();
    console.log(datosPerfil);


    document.getElementById("nombre").value = datosPerfil.nombre;
    document.getElementById("correo").value = datosPerfil.correo;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

// Ejecutar la función al cargar la página
window.onload = actualizarDatosEmpresa;