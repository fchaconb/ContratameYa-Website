async function tipoPerfil() {
    try {
        const respuestaPerfil = await fetch("http://localhost:3000/");
        const perfiles = await respuestaPerfil.json();
        console.log(perfiles);

        const perfilesHTML = document.getElementById("perfil");
        perfiles.forEach(function (perfil) {
            const option =
                `
<option value=" ${perfil.id}>${perfil.perfil} </option>
`;
            perfilesHTML.innerHTML += option;
        });

    } catch (error) {
        console.log("Error:", error);
        alert("Error al cargar los perfiles");


    }


}


async function correoEditarPerfilEmpleado() {
    try {
        const respuestaCorreo = await fetch("http://localhost:3000/");
        const correos = await respuestaCorreo.json();
        console.log(correos);

        const correosHTML = document.getElementById("editarPerfilDropDown");
        correos.forEach(function (correo) {
            const option =
                `
<option value=" ${correo.id}>${correo.correo} </option>
`;
            correosHTML.innerHTML += option;
        });

    } catch (error) {
        console.log("Error:", error);
        alert("Error al cargar los correos");


    }



}


async function correoEliminarPerfilEmpleado() {
    try {
        const respuestaCorreo = await fetch("http://localhost:3000/");
        const correos = await respuestaCorreo.json();
        console.log(correos);

        const correosHTML = document.getElementById("eliminarPerfilDropDown");
        correos.forEach(function (correo) {
            const option =
                `
<option value=" ${correo.id}>${correo.correo} </option>
`;
            correosHTML.innerHTML += option;
        });

    } catch (error) {
        console.log("Error:", error);
        alert("Error al cargar los correos");


    }



}

window.onload = function () {
    correoEditarPerfilEmpleado();
    correoEditarPerfilEmpleado();
    correoEliminarPerfilEmpleado
}


