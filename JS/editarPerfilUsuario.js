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

