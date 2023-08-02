// HTML
window.onload = async function () {
    try {
        const respuestaEmpleos = await fetch("http://localhost:3000/empleos?limit=8");
        const empleos = await respuestaEmpleos.json();
        console.log("Empleos:", empleos);

        const empleosHTML = document.getElementById("lista-mepleos"); 
        empleos.forEach(function (empleo) {
            const div = 
            `
            <div class="puesto">
                <p>${empleo.titulo}</p>
                <p>${empleo.rangoSalarial}</p>
                <p>${empleo.empresa}</p>
            </div>
            `;
            empleosHTML.innerHTML += div;
        });
    } catch (error) {
        console.log("Error:", error);
        alert("Error al cargar los empleos");
    }
};
