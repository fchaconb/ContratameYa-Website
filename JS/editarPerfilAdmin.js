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

async function cargarDatosEmpresa() {
  const userEmail = localStorage.getItem('userEmail');

  try {
    const respuestaDatosPerfil = await fetch("http://localhost:3000/datosPerfilEmpresa?correo=" + userEmail);
    const datosPerfil = await respuestaDatosPerfil.json();
    console.log(datosPerfil);

    document.getElementById("nombreEmpresa").value = datosPerfil.nombre;
    document.getElementById("correoEmpresa").value = datosPerfil.correo;
    document.getElementById("descripcion").value = datosPerfil.descripcion;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

async function actualizarDatosEmpresa() {
  const nombreEmpresa = document.getElementById("nombreEmpresa").value;
  const correoEmpresa = document.getElementById("correoEmpresa").value;
  const contrasena = document.getElementById("password1").value;
  const contrasena2 = document.getElementById("password2").value;
  const descripcion = document.getElementById("descripcion").value;
  var formularioValido = true;

  if (contrasena !== contrasena2) {
    alert('La clave y la confirmación de clave no coinciden.');
    formularioValido = false;
  }

  if (contrasena.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres");
    formularioValido = false;
  }

  if (formularioValido === true) {
    const datosEmpresa = {
      nombre: nombreEmpresa,
      correo: correoEmpresa,
      contrasena: contrasena,
      descripcion: descripcion
    };

    try {
      const respuesta = await fetch("http://localhost:3000/editarPerfilEmpresa", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEmpresa),
      });

      if (respuesta.status === 201) {
        alert("Datos actualizados correctamente");
      } else {
        alert("Error al actualizar los datos");
      }
    } catch (error) {
      console.log("Error:", error);
      alert(error);
    }
  }
}

// Ejecutar la función al cargar la página
window.onload = function () {
  cargarDatosEmpresa();
  let form = document.getElementById('editarPerfilEmpresa');
  form.addEventListener('submit', actualizarDatosEmpresa);
}