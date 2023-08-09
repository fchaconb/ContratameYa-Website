window.onload = function () {
    const buttonElement = document.getElementById("botoncv");
    const imgElement = document.getElementById("cvUsuario");

    let myWidget = cloudinary.createUploadWidget(
        {
            cloudName: "dobj7jqwu",
            uploadPreset: "preset.Rom",
            clientAllowedFormats: ["pdf"],
            maxFileSize: 3000000,
        },
        (error, result) => {

            if (!error && result && result.event === "success") {
                imgElement.src = result.info.secure_url;
                console.log("Done! Here is the image info: ", result.info);
            }
        }
    );

    buttonElement.addEventListener(
        "click",
        function () {
            myWidget.open();
        },
        false
    );
};