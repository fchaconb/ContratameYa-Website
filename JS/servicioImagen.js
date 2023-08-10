window.onload = function () {
    const boton = document.getElementById("botonFoto");

    let myWidget = cloudinary.createUploadWidget(
        {
            cloudName: "dobj7jqwu",
            uploadPreset: "preset.Rom",
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
            }
        }
    );

    boton.addEventListener(
        "click",
        function () {
            myWidget.open();
        },
        false
    );
};