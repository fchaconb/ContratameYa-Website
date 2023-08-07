// Wrap the JavaScript code in an event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  var defaultImageURL = '/Media/Fotos/man.png';

  // Function to display the default image on page load
  function displayDefaultImage() {
    var imagePreview = document.getElementById('imagePreview');
    imagePreview.src = defaultImageURL;
    imagePreview.style.display = 'block';
  }

  // Call the function to display the default image on page load
  displayDefaultImage();

});


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
  } else {
    // If no file selected (user canceled), display the default image again
    displayDefaultImage();
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
  previewCV(file);
}

function previewCV(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var cvPreview = document.getElementById('CVPreview');
    cvPreview.src = e.target.result;
    cvPreview.style.display = 'block';
  };

  reader.readAsDataURL(file);
}

async function cargarDatosPerfil() {
  const userEmail = localStorage.getItem("userEmail");

  try {
    const respuestaUsuario = await fetch(`http://localhost:3000/datosUsuarioFinal?correo=${userEmail}`);
    const usuario = await respuestaUsuario.json();
    console.log(usuario);

    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("apellidos").value = usuario.apellidos;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById("genero").value = usuario.genero;

    document.getElementById("tituloExperiencia").value = usuario.experiencia.titulo;
    document.getElementById("empresa").value = usuario.experiencia.empresa;
    document.getElementById("fechaInicioExperiencia").value = (usuario.experiencia.fechaInicio.split("T")[0]);

    if (usuario.experiencia.fechaFin == null) {
      document.getElementById("fechaFinExperiencia").value = new Date().toISOString().split("T")[0];
    } else {
      document.getElementById("fechaFinExperiencia").value = (usuario.experiencia.fechaFin.split("T")[0]);
    }
    document.getElementById("descripcionTrabajo").value = usuario.experiencia.descripcion;


    document.getElementById("education").value = usuario.educacion.nivelEducativo;
    document.getElementById("institucion").value = usuario.educacion.institucion;
    document.getElementById("fechaInicioEducacion").value = (usuario.educacion.fechaInicioEducacion.split("T")[0]);

    if (usuario.educacion.fechaFinEducacion == null) {
      document.getElementById("fechaFinalEducacion").value = new Date().toISOString().split("T")[0];
    } else {
      document.getElementById("fechaFinalEducacion").value = (usuario.educacion.fechaFinEducacion.split("T")[0]);
    }

    document.getElementById("descripcionEducacion").value = usuario.educacion.descripcionEducacion;

  } catch (error) {
    console.log("Error:", error);
    alert("Error al cargar los datos del usuario");
  }    
}



async function editarPerfil(evento) {
  evento.preventDefault();

  var nombre = document.getElementById("nombre").value;
  var apellidos = document.getElementById("apellidos").value;
  var correo = document.getElementById("correo").value;
  var genero = document.getElementById("genero").value;
  var clave = document.getElementById("password1").value;
  var clave2 = document.getElementById("password2").value;

  


}


window.onload = function () {
  cargarDatosPerfil();

  let form = document.getElementById("formularioEditarUsuarioFinal");
  form.addEventListener("submit", editarPerfil);

  let fechaFinalizacionLaboral = document.getElementById("fechaFinExperiencia");
  let posicionActual = document.getElementById("posicionActual");
  fechaFinalizacionLaboral.addEventListener("input", function () {
    if (fechaFinalizacionLaboral.value !== "") {
      document.getElementById("posicionActual").disabled = true;
      document.getElementById("posicionActual").checked = false;
    } else {
      document.getElementById("posicionActual").disabled = false;
    }
  });

  posicionActual.addEventListener("change", function () {
    if (posicionActual.checked) {
      document.getElementById("fechaFinExperiencia").disabled = true;
      document.getElementById("fechaFinExperiencia").value = "";
    } else {
      document.getElementById("fechaFinExperiencia").disabled = false;
    }
  });


}