import { loginUser, registerUser, loadTemplateBasedOnRole } from "./auth.js";

document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  Swal.fire({
    title: 'Por favor espera...',
    text: 'Estamos validando tus credenciales',
    icon: 'info',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  try {
    const { user, role } = await loginUser(email, password);
    Swal.fire({
      title: '¡Bienvenido!',
      text: 'Inicio de sesión exitoso',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      loadTemplateBasedOnRole(role);
    });
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    Swal.fire({
      title: 'Error',
      text: 'Error al iniciar sesión. Consulta la consola para más detalles.',
      icon: 'error'
    });
  }
});

document.getElementById("registerForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const role = "USUARIO";
  const name = document.getElementById("registerNombres").value;
  const apellidos = document.getElementById("registerApellidos").value;
  const username = document.getElementById("registerUserName").value;
  const celular = document.getElementById("registerCelular").value;
  const ciudad = document.getElementById("registerCiudad").value;

  Swal.fire({
    title: 'Por favor espera...',
    text: 'Estamos guardando tus datos',
    icon: 'info',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  try {
    const user = await registerUser(email, password, role, name, apellidos, username, celular, ciudad);
    Swal.fire({
      title: 'Registrado con éxito',
      text: 'La página se recargará. Ya puedes iniciar sesión.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error("Error durante el registro:", error);
    Swal.fire({
      title: 'Error',
      text: 'Error al registrar usuario. Consulta la consola para más detalles.',
      icon: 'error'
    });
  }
});


