// Función para generar un ID único para cada producto
function generateProductId() {
  // Obtener los productos existentes del local storage
  const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

  if (existingProducts.length === 0) {
    // Si no hay productos existentes, comenzar desde el ID 1
    return 1;
  } else {
    // Obtener el último ID y generar el siguiente ID
    const lastProductId = existingProducts[existingProducts.length - 1].id;
    return lastProductId + 1;
  }
}

// Función para agregar un nuevo producto
function agregarProducto() {
  // Obtener los valores del formulario
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').value;

  // Crear un objeto para el nuevo producto
  const newProduct = {
    id: generarID(),
    name: name,
    price: price,
    description: description,
    image: image
  };

  // Obtener los productos existentes del local storage
  const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

  // Agregar el nuevo producto a la lista de productos existentes
  existingProducts.push(newProduct);

  // Guardar la lista de productos actualizada en el local storage
  localStorage.setItem('products', JSON.stringify(existingProducts));

  // Mostrar los productos en ambas vistas
  mostrarProductos();

  // Limpiar el formulario
  document.getElementById('productForm').reset();
}


// Función para mostrar los productos existentes desde el local storage
// ... Código anterior ...

// Función para mostrar los productos existentes desde el local storage
function mostrarProductos() {
  // Obtener el contenedor de productos en la vista administrativa
  const adminProductContainer = document.getElementById('adminProductContainer');

  // Obtener el contenedor de productos en la vista de la tienda
  const productContainer = document.getElementById('productContainer');

  // Limpiar los contenedores
  adminProductContainer.innerHTML = '';
  productContainer.innerHTML = '';

  // Obtener los productos existentes del local storage
  const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

  // Recorrer los productos existentes y agregarlos a los contenedores
  existingProducts.forEach(function(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('item');
    productElement.setAttribute('category', 'nueva-categoria');

    const productContent = `
      <span class="titulo-item">${product.name}</span>
      <img src="${product.image}" alt="" class="img-item">
      <h3>S/.<span class="precio-item">${product.price}</span></h3>
      <button href="#" data-id="${product.id}" class="boton-item">Agregar al Carrito</button>
      <button href="#" data-id="30" class="btn" onclick="mostrarDetalles(this)">Detalles</button>
      <div id="detalles-overlay" class="overlay">
          <p>${product.description}</p>
          <button onclick="ocultarDetalles(this)" class="btn">OK</button>
      </div>
    `;

    productElement.innerHTML = productContent;

    adminProductContainer.appendChild(productElement.cloneNode(true)); // Mostrar en la vista administrativa
    productContainer.appendChild(productElement); // Mostrar en la vista de la tienda
  });
}

// ... Código posterior ...


// Función para mostrar los detalles de un producto
function mostrarDetalles(button) {
  const overlay = button.nextElementSibling;
  overlay.style.display = 'block';
}

// Función para ocultar los detalles de un producto
function ocultarDetalles(button) {
  const overlay = button.parentElement;
  overlay.style.display = 'none';
}

// Mostrar los productos existentes al cargar la página
mostrarProductos();

  

  
  // Visualizar Imagen



  var imageInput = document.getElementById('image');
  var previewImage = document.getElementById('previewImage');

  imageInput.addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      previewImage.src = e.target.result;
      previewImage.style.display = 'block';
    };

    reader.readAsDataURL(file);
  });