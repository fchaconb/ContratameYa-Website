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

async function cargarDatosColaborador() {
  const userEmail = localStorage.getItem('userEmail');

  try {
    const respuestaDatosPerfil = await fetch("http://localhost:3000/datosPerfilColaborador?correo=" + userEmail);
    const datosPerfil = await respuestaDatosPerfil.json();
    console.log(datosPerfil);

    document.getElementById("nombre").value = datosPerfil.nombre;
    document.getElementById("apellidos").value = datosPerfil.apellidos;
    document.getElementById("correo").value = datosPerfil.correo;
    document.getElementById("genero").value = datosPerfil.genero;
    document.getElementById("rol").value = datosPerfil.rol;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

async function editarPerfilColaborador(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const correo = document.getElementById("correo").value;
  const genero = document.getElementById("genero").value;
  const rol = document.getElementById("rol").value;
  const contrasena = document.getElementById("password1").value;
  const contrasena2 = document.getElementById("password2").value;
  var formularioValido = true;

  
  if (contrasena !== contrasena2) {
    alert('La clave y la confirmación de clave no coinciden.');
    formularioValido = false;
  }

  if (contrasena.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres");
    formularioValido = false;
  }

  if (formularioValido) {
    const datosPerfil = {
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      genero: genero,
      rol: rol,
      contrasena: contrasena,
    };

    const confirmEdit = confirm("¿Estás seguro que deseas actualizar tus datos?");


    if (confirmEdit) {
      try {
        const respuesta = await fetch("http://localhost:3000/editarPerfilColaborador", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datosPerfil)
        });

        const datosRespuesta = await respuesta.json();
        console.log(datosRespuesta);
        
        if (datosRespuesta) {
        alert("Datos actualizados exitosamente");

        const notificacionData = {
          correoRecipiente: datosPerfil.correo,
          titulo: "Perfil Editado",
          mensaje: `Tu perfil ha sido editado exitosamente.`,
        };

        await fetch("http://localhost:3000/notificaciones", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificacionData),
        });

        window.location.reload();

        } else {
          alert("Error al actualizar los datos");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      alert("Cancelaste la acción de actualizar tus datos.");
    }
  }
}



window.onload = function () {
  cargarDatosColaborador();

  let form = document.getElementById('editarPerfilColaborador');
  form.addEventListener('submit', editarPerfilColaborador);

};