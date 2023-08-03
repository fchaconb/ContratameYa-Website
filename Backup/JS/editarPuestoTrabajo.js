function redirectToEdit(event) {
    const jobContainer = event.target.closest('.seccion-puestos');
    const nombrePuesto = jobContainer.querySelector('h3').textContent;
    const rangoSalarial = jobContainer.querySelector('h4:nth-child(2)').textContent;
  
    const requisitosMinimos = Array.from(jobContainer.querySelectorAll('.informacion-puesto > div:nth-child(1) li'))
      .map(li => li.textContent)
      .join('\n');
  
    const requisitosDeseados = Array.from(jobContainer.querySelectorAll('.informacion-puesto > div:nth-child(2) li'))
      .map(li => li.textContent)
      .join('\n');
  
    const encodedNombrePuesto = encodeURIComponent(nombrePuesto);
    const encodedRangoSalarial = encodeURIComponent(rangoSalarial);
    const encodedRequisitosMinimos = encodeURIComponent(requisitosMinimos);
    const encodedRequisitosDeseados = encodeURIComponent(requisitosDeseados);
  
    const urlParams = `nombre=${encodedNombrePuesto}&rangoSalarial=${encodedRangoSalarial}&requisitosMinimos=${encodedRequisitosMinimos}&requisitosDeseados=${encodedRequisitosDeseados}`;
    window.location.href = `editarPuestoTrabajo.html?${urlParams}`;
}
  