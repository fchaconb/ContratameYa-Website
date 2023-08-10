window.onload = function () {
    const buttonElement = document.getElementById("botoncv");
    const iframeElement = document.getElementById("vistaPDF");

    let myWidget = cloudinary.createUploadWidget(
        {
            cloudName: "dobj7jqwu",
            uploadPreset: "preset.Rom",
            clientAllowedFormats: ["pdf"],
            maxFileSize: 3000000,
            multiple: false
        },
        (error, result) => {

            if (!error && result && result.event === "success") {
                const pdfUrl = result.info.secure_url;
                iframeElement.src = pdfUrl;
                console.log("Done! Here is the PDF info: ", result.info);

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