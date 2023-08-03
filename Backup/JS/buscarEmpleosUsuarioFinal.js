async function rangosSalarialesDropdown() {
  try {
    const respuestaRangosSalariales = await fetch("http://localhost:3000/rangosSalariales");
    const rangosSalariales = await respuestaRangosSalariales.json();
    console.log(rangosSalariales);

    const rangosSalarialesHTML = document.getElementById("rango-salarial");

    rangosSalariales.forEach(function (rangoSalarial) {
      const option = `<option value="${rangoSalarial.id}">${rangoSalarial.rangoSalarial}</option>`;
      rangosSalarialesHTML.innerHTML += option;
    });
  } catch (error) {
    console.log("Error:", error);
    alert("Error al cargar los rangos salariales");
  }
};

async function empresasDropdown() {
  try {
    const respuestaEmpresas = await fetch("http://localhost:3000/nombreEmpresasBuscarEmpleos");
    const empresas = await respuestaEmpresas.json();
    console.log(empresas);

    const empresasHTML = document.getElementById("nombre");
    empresas.forEach(function (empresa) {
      const option = `<option value="${empresa._id}">${empresa.nombre}</option>`;
      empresasHTML.innerHTML += option;
    });
  } catch (error) {
    console.log("Error:", error);
    alert("Error al cargar las empresas");
  }
};

async function empleosOverview() {
  try {
    const respuestaEmpleos = await fetch("http://localhost:3000/empleosOverview");
    const empleos = await respuestaEmpleos.json();
    console.log(empleos);

    const empleosHTML = document.getElementById("puestos-overview");
    let i = 0;
    empleos.forEach(function (empleo) {
      const div = `
            <div class="seccion-puestos" id="puesto${i}">
                <h2>${empleo.titulo}</h2>
                <h3>Rango Salarial: ${empleo.rangoSalarial}</h3>
                <h3>Empresa: ${empleo.empresa}</h3>
            </div>
            `;
      empleosHTML.innerHTML += div;
      i += 1;
    });
  } catch (error) {
    console.log("Error:", error);
    alert("Error al cargar los empleos");
  }
};

window.onload = function () {
  rangosSalarialesDropdown();
  empresasDropdown();
  empleosOverview();
};