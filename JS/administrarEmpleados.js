
/*async function tipoPerfil() {
    const userName = localStorage.getItem("userName");
    try {
        console.log("tipoPerfil");
        const respuestaPerfil = await fetch(`/administrarEmpleados`);
        const perfiles = await respuestaPerfil.json();
        console.log(perfiles);

        const perfilesHTML = document.getElementById("perfil");
        perfiles.forEach(function (perfil) {
            const option =
                `<option value="${perfil.id}">${perfil.perfil}</option>`;
            perfilesHTML.innerHTML += option;
        });

    } catch (error) {
        console.log("Error:", error);
        alert("Error al cargar los perfiles");
    }
}*/


/*async function correoEditarPerfilEmpleado() {

    const userName = localStorage.getItem("userName");
    try {
        console.log("correoEditarPerfilEmpleado");
        const respuestaCorreo = await fetch(`http://localhost:3000/administrarEmpleados`);
        const correos = await respuestaCorreo.json();
        console.log(correos);

        const correosHTML = document.getElementById("editarPerfilDropDown");
        correos.forEach(function (correo) {
            const option =
                `<option value="${correo.correo}">${correo.correo}</option>`;
            correosHTML.innerHTML += option;
        });

    } catch (error) {
        console.log("Error:", error);
        alert("Error al cargar los correos");
    }
}*/

/*async function correoEliminarPerfilEmpleado() {

    const userName = localStorage.getItem("userName");
    try {
        console.log("correoEliminarPerfilEmpleado");
        const respuestaCorreo = await fetch(`http://localhost:3000/administrarEmpleados`);
        const correos = await respuestaCorreo.json();
        console.log(correos);

        const correosHTML = document.getElementById("eliminarPerfilDropDown");
        correos.forEach(function (correo) {
            const option =
                `<option value="${correo.correo}">${correo.correo}</option>`;
            correosHTML.innerHTML += option;
        });

    } catch (error) {
        console.log("Error:", error);
        alert("Error al cargar los correos");
    }
}/*

/*async function cargarColaboradores() {

    const userName = localStorage.getItem("userName");
    try {
        console.log("cargarColaboradores");
        const respuestaColaboradores = await fetch(`http://localhost:3000/administrarEmpleados`);
        const colaboradores = await respuestaColaboradores.json();
        console.log(colaboradores);

        const selectElegirUsuario = document.getElementById("editarPerfilDropDown");
        colaboradores.forEach(correo => {
            const option = document.createElement("option");
            option.value = correo.correo; // Asegúrate de que el campo sea correcto
            option.textContent = correo.correo; // Asegúrate de que el campo sea correcto
            selectElegirUsuario.appendChild(option);
        });
    } catch (error) {
        console.log("Error:", error);
    }
}*/

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



