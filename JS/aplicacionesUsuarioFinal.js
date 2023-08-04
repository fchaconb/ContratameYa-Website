async function cargarAplicaciones () {
    try {
        const aplicaciones = await fetch("/aplicacionesUsuarioFinal");
        const aplicacionesJSON = await aplicaciones.json();
        console.log ("aplicaciones:", aplicacionesJSON);

        /*const aplicacionesHTML = document.getElementById("aplicaciones-usuario");*/
        const seccionAplicaciones = document.getElementById("seccion-aplicaciones");

        const divAplicaciones = `
            <h3>${aplicaciones.fechaPostulacion}</h3>
            <h3>${aplicaciones.estadoAplicacion}</h3>
            <h3>${aplicaciones.requisitos}</h3>

        `;
        seccionAplicaciones.innerHTML = divAplicaciones;
    } catch (error) {
        console.log("Error:", error);


    }
}


