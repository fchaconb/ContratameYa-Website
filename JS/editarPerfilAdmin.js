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