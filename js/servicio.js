const botonesLeerMas = document.querySelectorAll('.leer-mas');

botonesLeerMas.forEach(function (boton) {
  boton.addEventListener('click', function (event) {
    event.preventDefault(); 
    const servicioId = boton.getAttribute('data-id');
    const detallesServicio = document.getElementById('detalles-' + servicioId);

    // Mostrar u ocultar los detalles del servicio
    if (detallesServicio.style.display === 'none') {
      detallesServicio.style.display = 'block';

      // Ocultar los detalles de los demás servicios
      botonesLeerMas.forEach(function (otroBoton) {
        if (otroBoton !== boton) {
          const otroServicioId = otroBoton.getAttribute('data-id');
          const otroDetallesServicio = document.getElementById('detalles-' + otroServicioId);
          otroDetallesServicio.style.display = 'none';
        }
      });
    } else {
      detallesServicio.style.display = 'none';
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var detallesServicios = document.querySelectorAll('.detalles-servicio');
  detallesServicios.forEach(function(detallesServicio) {
    var botonOk = detallesServicio.querySelector('.btn');
    botonOk.addEventListener('click', function() {
      detallesServicio.style.display = 'none';
    });
  });
});





// Scrip de Euipo
var activeParagraph = null;

function toggleParagraph(container) {
    var paragraph = container.querySelector(".parrafo");
    
    if (paragraph === activeParagraph) {
        paragraph.classList.add("hidden");
        activeParagraph = null;
    } else {
        if (activeParagraph !== null) {
            activeParagraph.classList.add("hidden");
        }
        
        paragraph.classList.remove("hidden");
        activeParagraph = paragraph;
    }
}


