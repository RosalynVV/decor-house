import { auth, db } from "../DB/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Función para iniciar sesión con correo electrónico y contraseña
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtener rol del usuario desde Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userRole = userData.role;

      console.log("Usuario inició sesión:", user);
      console.log("Rol del usuario:", userRole);
      return { user, role: userRole };
    } else {
      throw new Error("El usuario no existe en Firestore");
    }
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    throw error;
  }
}

// Función para registrar un usuario con un rol y nombre
export async function registerUser(email, password, name, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar el rol y nombre del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name: name,
      role: role
    });

    console.log("Usuario registrado:", user);
    return user;
  } catch (error) {
    console.error("Error durante el registro:", error);
    throw error;
  }
}

// Función para cargar el template adecuado según el rol del usuario
export function loadTemplateBasedOnRole(role) {
  switch (role) {
    case "SUPER_ADMIN":
      window.location.href = "VIEWS/templates_super_admin/index.html";
      break;
    case "ADMIN":
      window.location.href = "VIEWS/templates_admin/index.html";
      break;
    case "USUARIO":
      window.location.href = "VIEWS/templates_user/index.html";
      break;
    default:
      console.error("Rol desconocido:", role);
      break;
  }
}
