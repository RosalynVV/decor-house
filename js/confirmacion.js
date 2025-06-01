
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  // Vaciar el contenido del carrito en la página
  var cardItems = document.querySelector(".card-items");
  var countProduct = document.querySelector(".count-product");
  cardItems.innerHTML = "";
  countProduct.textContent = "0";
  // Actualizar el total
  updateTotal();
}

// MENSAJE DE CONFIRMACION

var numeroTelefono = "51921640803";
var textoBienvenida =
  "¡Hola! Acabo de realizar una compra en tu tienda y me gustaría compartir contigo los detalles de mi pedido. Aquí está la lista de los productos que he adquirido.";
document
  .getElementById("finalizar-pagar")
  .addEventListener("click", function () {
    var nombreCliente = document.getElementById("nombre").value;
    var emailCliente = document.getElementById("email").value;

    // Validar que se haya ingresado el nombre
    if (nombreCliente.trim() === "") {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingrese su nombre.",
        icon: "error",
        iconColor: "red",
        confirmButtonText: "Aceptar",
        customClass: {
          popup: "ventana-error",
          title: "titulo-error",
          icon: "-error",
          confirmButton: "bton-confirmacion-class",
        },
        buttonsStyling: false,
      });
      return;
    }

    // Validar que se haya ingresado el email
    if (emailCliente.trim() === "") {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingrese su email.",
        icon: "error",
        iconColor: "red",
        confirmButtonText: "Aceptar",
        customClass: {
          popup: "ventana-error",
          title: "titulo-error",
          icon: "-error",
          confirmButton: "bton-confirmacion-class",
        },
        buttonsStyling: false,
      });
      return;
    }

    var total = 0;
    carrito.forEach(function (item) {
      var subtotal = item.price * item.quantity;
      total += subtotal;
    });

    var productosSeleccionados = document.querySelectorAll("#carrito-table tbody tr");
    var mensajeConfirmacion ="\n¡Compra realizada con éxito!\nDetalles de la compra:\n";
    mensajeConfirmacion += "Nombre: " + nombreCliente + "\n";
    mensajeConfirmacion += "Email: " + emailCliente + "\n";
    mensajeConfirmacion += "Total: S/." + total.toFixed(2) + "\n";
    mensajeConfirmacion += "\nProductos seleccionados:\n";

    var contador = 1;
    productosSeleccionados.forEach(function (productoSeleccionado) {
      var producto = productoSeleccionado.querySelector("td:nth-child(2)")
        .textContent;
      var precio = productoSeleccionado.querySelector("td:nth-child(3)")
        .textContent;
      var cantidad = productoSeleccionado.querySelector("td:nth-child(4)")
        .textContent;
      var subtotal = productoSeleccionado.querySelector("td:nth-child(5)")
        .textContent;

      mensajeConfirmacion += "\nProducto " + contador + ":\n";
      mensajeConfirmacion += "Producto: " + producto + "\n";
      mensajeConfirmacion += "Precio: " + precio + "\n";
      mensajeConfirmacion += "Cantidad: " + cantidad + "\n";
      mensajeConfirmacion += "Subtotal: " + subtotal + "\n";
      contador++;
    });

    Swal.fire({
      title: "¡Compra realizada con éxito!",
      text: mensajeConfirmacion,
      icon: "success",
      buttons: {
        confirm: {
          text: "Aceptar",
          className: "mi-boton-confirmacion",
        },
      },
      customClass: {
        popup: "mi-ventana-confirmacion",
        title: "mi-titulo-confirmacion",
        confirmButton: "mi-boton-confirmacion",
      },
    }).then(function () {
      var mensajeWhatsApp = encodeURIComponent(mensajeConfirmacion);
      var enlaceWhatsApp =
        "https://api.whatsapp.com/send?phone=" +
        numeroTelefono +
        "&text=" +
        encodeURIComponent(textoBienvenida) +
        "%20\n" +
        mensajeWhatsApp;
      window.open(enlaceWhatsApp);

      window.location.href = "tienda.html";
      vaciarCarrito();
    });

    var comprasRealizadas =
      JSON.parse(localStorage.getItem("comprasRealizadas")) || [];

    var compraActual = {
      nombreCliente: nombreCliente,
      emailCliente: emailCliente,
      total: total.toFixed(2),
    };

    comprasRealizadas.push(compraActual);

    localStorage.setItem(
      "comprasRealizadas",
      JSON.stringify(comprasRealizadas)
    );

    const serviceID = "service_v823jow";
    const templateID = "template_7f6usfp";

    var templateParams = {
      to_name: nombreCliente,
      to_email: emailCliente,
      message: mensajeConfirmacion,
    };

    emailjs
      .send(serviceID, templateID, templateParams)
      .then(function (response) {
        console.log("Correo enviado correctamente:", response);
      })
      .catch(function (error) {
        console.error("Error al enviar el correo:", error);
      });
  });
