


async function fillTableWithData() {
  try {
    // const infoTabla = await fetch("http://localhost:3000/");

    // const infoTabla = await users.json();


    const tabla = document.getElementById("tablaReporte");

    const tableBody = tabla.querySelector("tbody");
    infoTabla.forEach(function (person) {
      const newRow = document.createElement("tr");
      newRow.innerHTML =
        `
              <td>${person.nombre}</td>
              <td>${person.correo}</td>
              <td>${person.estado}</td>
          `;
      tableBody.appendChild(newRow);
    });

  } catch (error) {
    console.error(error);
  }
}

window.onload = function () {
  fillTableWithData();
};
