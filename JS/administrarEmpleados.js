async function correoEditarPerfilEmpleado() {
    try {
        console.log("correoEditarPerfilEmpleado");
        const respuestaCorreo = await fetch(`http://localhost:3000/administrarEmpleados`);
        const correos = await respuestaCorreo.json();
        console.log(correos);

        const correosHTML = document.getElementById("editarPerfilDropDown");
        correos.forEach(function (correo) {
            const option = document.createElement("option");
            option.value = correo.correo; // Set the value for the option
            option.textContent = correo.correo; // Set the visible text for the option
            correosHTML.appendChild(option);
        });

    } catch (error) {
        console.log("Error:", error);
        alert("Error al cargar los correos");
    }
}

async function correoEliminarPerfilEmpleado() {
    try {
        console.log("correoEliminarPerfilEmpleado");
        const respuestaCorreo = await fetch(`http://localhost:3000/administrarEmpleados`);
        const correos = await respuestaCorreo.json();
        console.log(correos);

        const correosHTML = document.getElementById("eliminarPerfilDropDown");
        correos.forEach(function (correo) {
            const option = document.createElement("option");
            option.value = correo.correo; // Set the value for the option
            option.textContent = correo.correo; // Set the visible text for the option
            correosHTML.appendChild(option);
        });

    } catch (error) {
        console.log("Error:", error);
        alert("Error al cargar los correos");
    }
}








window.onload = function () {
    /*cargarColaboradores();*/
    correoEditarPerfilEmpleado();
    correoEliminarPerfilEmpleado();

    /*tipoPerfil();*/
    // Add other necessary functions here
}



