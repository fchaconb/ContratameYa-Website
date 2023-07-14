document.addEventListener('DOMContentLoaded', () => {
  // Get the job position containers
  const jobContainers = document.querySelectorAll('.seccion-puestos');

  // Update the information section content based on the first job position by default
  const defaultJobTitle = jobContainers[0].querySelector('h2').textContent;
  const defaultJobInfoSection = jobContainers[0].id;

  displayJobInfo(defaultJobTitle, defaultJobInfoSection);

  // Add click event listeners to each job container
  jobContainers.forEach(container => {
    container.addEventListener('click', () => {
      // Clear the previously selected job container's active class
      const activeContainer = document.querySelector('.seccion-puestos.active');
      if (activeContainer) {
        activeContainer.classList.remove('active');
      }

      // Add active class to the clicked job container
      container.classList.add('active');

      // Get the job title and info section ID from the clicked job container
      const jobTitle = container.querySelector('h2').textContent;
      const infoSectionId = container.id;

      displayJobInfo(jobTitle, infoSectionId);
    });
  });

  // Function to display the job information
  function displayJobInfo(jobTitle, infoSectionId) {
    // Find the corresponding info section based on the ID
    const infoSection = document.querySelector(`#${infoSectionId}`);

    // Hide all info sections
    const infoSectionContainer = document.querySelector('.seccion-puesto-info');
    const allInfoSections = infoSectionContainer.querySelectorAll('section');
    allInfoSections.forEach(section => {
      section.style.display = 'none';
    });

    // Show the selected info section
    infoSection.style.display = 'block';

    // Update the information section content based on the selected job container
    const jobRequirements = infoSection.innerHTML;

    infoSectionContainer.innerHTML = `
      <section id="${infoSectionId}">
        <h3>${jobTitle}</h3>
        ${jobRequirements}
      </section>
    `;
  }
});
