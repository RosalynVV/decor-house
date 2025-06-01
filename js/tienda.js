var carrito = [];
document.addEventListener('DOMContentLoaded', function () {

  // Obtener el carrito del localStorage si existe
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
    procesarCompra();

  }

  function agregarProducto(e) {
    e.preventDefault();
    var item = e.target.closest(".item");
    var image = item.querySelector(".img-item").getAttribute("src");
    var price = item.querySelector(".precio-item").textContent;
    var title = item.querySelector(".titulo-item").textContent;

    var existingItems = document.querySelectorAll('.card-items .content');
    var existingItem = Array.from(existingItems).find(function (element) {
      return element.textContent.includes(title);
    });

    if (existingItem) {
      var quantity = existingItem.querySelector(".quantity");
      var qtyValue = parseInt(quantity.textContent.replace("Cant:", ""));
      quantity.textContent = "Cant: " + (qtyValue + 1);
      // Actualizar la cantidad en el carrito
      var existingIndex = carrito.findIndex(function (item) {
        return item.title === title;
      });
      if (existingIndex !== -1) {
        carrito[existingIndex].quantity += 1;
      }
    } else {
      var newItem = `
        <div class="box">
          <i class="fas fa-trash" onclick="eliminarProducto('${title}')"></i>
          <img src="${image}" alt="">
          <div class="content">
            <h3>${title}</h3>
            <div class="price-quantity">
              <div class="precio-content">
                <span class="price">S/. ${price}</span>
              </div>
              <span class="quantity">Cant: 1</span>
            </div>
          </div>
        </div>
      `;

      document.querySelector(".card-items").insertAdjacentHTML("beforeend", newItem);
      var countProduct = document.querySelector(".count-product");
      countProduct.textContent = parseInt(countProduct.textContent) + 1;

      // Guardar el producto en el carrito
      carrito.push({
        image: image,
        title: title,
        price: price,
        quantity: 1
      });
    }

    // Mostrar una alerta por cada producto agregado
    carrito.forEach(function (item) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado',
        text: `Productos en el carrito (${item.title}): ${item.quantity}`,
        showConfirmButton: false,
        timer: 1500,
        iconColor: 'green',
        customClass: {
          title: 'title-class',
          icon: 'icon-class',
          popup: 'popup-class',
          text: 'content-class'
        }
      });
    });


    // Guardar el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    updateTotal();
  }


  // Asociar la función al evento click utilizando delegación de eventos
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('boton-item')) {
      agregarProducto(e);
    }
  });



  function eliminarProducto() {
    var title = this.closest(".box").querySelector("h3").textContent;
    var box = this.closest(".box");
    box.parentNode.removeChild(box);
    var countProduct = document.querySelector(".count-product");
    countProduct.textContent = parseInt(countProduct.textContent) - 1;
    updateTotal();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El producto se ha eliminado',
      showConfirmButton: "Aceptar",
    });
    carrito = carrito.filter(function (item) {
      return item.title !== title;
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }


  document.querySelector(".card-items").addEventListener("click", function (event) {
    if (event.target.classList.contains("fa-trash")) {
      eliminarProducto.call(event.target, event.target.closest(".box").querySelector("h3").textContent);
    }
  });



  function updateTotal() {
    var boxes = document.querySelectorAll(".box");
    var total = 0;

    boxes.forEach(function (box) {
      var price = parseFloat(box.querySelector(".price").textContent.replace("S/.", ""));
      var quantity = parseInt(box.querySelector(".quantity").textContent.replace("Cant:", ""));
      total += price * quantity;
    });

    var priceTotal = document.querySelector(".price-total");
    // ESTE CODIGO ES PARA AGREGAR LA LINEA DE PRODUCTO DEL SIMBLO S/.
    priceTotal.textContent = "" + total.toFixed(2);

  }



  function actualizarCarrito() {
    var cardItems = document.querySelector(".card-items");
    var countProduct = document.querySelector(".count-product");
    cardItems.innerHTML = "";
    countProduct.textContent = carrito.length;

    carrito.forEach(function (item) {
      var newItem = document.createElement("div");
      newItem.className = "box";
      newItem.innerHTML = `
        <i class="fas fa-trash" onclick="eliminarProducto('${item.title}')"></i>
        <img src="${item.image}" alt="">
        <div class="content">
          <h3>${item.title}</h3>
          <div class="price-quantity">
          <div class="precio-content">
            <span class="price">S/. ${item.price}</span>
            </div>
            <span class="quantity">Cant: ${item.quantity}</span>
          </div>
        </div>
      `;
      cardItems.appendChild(newItem);
    });
    updateTotal();

  }

  // Capturar el botón de procesar compra
  var btnProcesarCompra = document.getElementById("procesarCompra");
  // Verificar si el botón existe y agregar el evento click
  if (btnProcesarCompra) {
    btnProcesarCompra.addEventListener('click', function () {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacío!",
          text: "El carrito está vacío. Agrega productos antes de finalizar la compra.",
          icon: "error",
          confirmButtonText: "Aceptar",
          iconColor: 'red',
          customClass: {
            popup: "my-custom-popup-class",
            title: "my-custom-title-class",
            content: "my-custom-content-class",
            confirmButton: "my-custom-button-class",
            icon: "my-custom-icon-class",
          },
          buttonsStyling: false
        });
      } else {
        localStorage.setItem('carrito', JSON.stringify(carrito));

        window.location.href = "compras.html";
      }
    });
  }

  // Mostrar Producto en la tabla en compras.html
  function procesarCompra() {
    var tbody = $("#carrito-table tbody");
    tbody.empty();

    var total = 0;

    carrito.forEach(function (item) {
      var subtotal = parseFloat(item.price) * parseInt(item.quantity);
      total += subtotal;

      var fila = `
        <tr>
          <td><img src="${item.image}" alt="${item.title}" width="50"></td>
          <td>${item.title}</td>
          <td>S/. ${item.price}</td>
          <td>${item.quantity}</td>
          <td>S/. ${subtotal.toFixed(2)}</td>
        </tr>
      `;
      tbody.append(fila);
    });

    var totalElement = $("#total");
    totalElement.text('S/.' + total.toFixed(2));

  }


  
  function vaciarCarrito() {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Carrito vacío!",
        text: "Tu carrito está vacío.",
        icon: "info",
        confirmButtonText: "Aceptar"
      });
    } else {
      carrito = []; // Vaciar el contenido del carrito
      localStorage.removeItem('carrito'); // Eliminar el carrito del localStorage
      actualizarCarrito(); // Actualizar la vista del carrito

      // Mostrar una alerta de éxito con SweetAlert
      Swal.fire({
        title: "¡Carrito vaciado!",
        text: "Tu carrito se ha vaceado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
    }
  }
  // Obtener el elemento del enlace "Vaciar carrito"
  var vaciarCarritoLink = document.getElementById('vaciarCarrito');

  // Agregar un evento de clic al enlace "Vaciar carrito"
  vaciarCarritoLink.addEventListener('click', function (event) {
    event.preventDefault(); 
    vaciarCarrito();
  });
});


// Script de Detalles 

var activeOverlay = null;

function mostrarDetalles(button) {
  var overlay = button.nextElementSibling;
  if (overlay !== activeOverlay) {
    ocultarDetalles();
    overlay.classList.add("show-overlay");
    activeOverlay = overlay;
  } else {
    ocultarDetalles();
    activeOverlay = null;
  }
}

function ocultarDetalles() {
  if (activeOverlay !== null) {
    activeOverlay.classList.remove("show-overlay");
    activeOverlay = null;
  }
}


