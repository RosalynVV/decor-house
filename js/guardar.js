document.addEventListener('DOMContentLoaded', function() {
  // Obtener todos los elementos con la clase "item"
  var productElements = document.getElementsByClassName('item');

  // Crear un array para almacenar los productos
  var products = [];

  // Recorrer los elementos de producto y extraer la información
  for (var i = 0; i < productElements.length; i++) {
    var productElement = productElements[i];
    var id = productElement.querySelector('.boton-item').getAttribute('data-id');
    var name = productElement.querySelector('.titulo-item').innerText;
    var image = productElement.querySelector('.img-item').getAttribute('src');
    var price = productElement.querySelector('.precio-item').innerText;
    var description = productElement.querySelector('p').innerText;
    var category = productElement.getAttribute('category');

    // Crear un objeto de producto
    var product = {
      id: id,
      name: name,
      image: image,
      price: price,
      description: description,
      category: category
    };

    // Agregar el producto al array de productos
    products.push(product);
  }

  // Almacenar los productos en el Local Storage
  localStorage.setItem('products', JSON.stringify(products));
});








function validarCorreo() {
  var emailInput = document.getElementById("email-input");
  var email = emailInput.value;

  if (email.trim() === "") {
    alert("Ingrese una dirección de correo electrónico.");
    return;
  }

  // Validar el formato del correo electrónico utilizando una expresión regular
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Ingrese una dirección de correo electrónico válida.");
    return;
  }

  // Si todo es válido, puedes enviar el correo electrónico o realizar otras acciones
  enviarCorreo(email);
}

function enviarCorreo(email) {
  // Aquí puedes agregar el código para enviar el correo electrónico.
  // Puede ser mediante una llamada a una API o procesamiento en el servidor.
  console.log("Correo electrónico enviado: " + email);
}



