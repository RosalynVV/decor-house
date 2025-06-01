import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { getStorage, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBO9mFr3dmK2P0XS0MQpxZcD6WqH6d48mo",
    authDomain: "db-decor-house.firebaseapp.com",
    projectId: "db-decor-house",
    storageBucket: "db-decor-house.firebasestorage.app",
    messagingSenderId: "199363949188",
    appId: "1:199363949188:web:f4b57813e1abb8273f88d1",
    measurementId: "G-WEJ9Z1Z7Z6"
  }

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage, deleteObject};

// Función para iniciar sesión con correo electrónico y contraseña
export async function loginUserWithEmailAndPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuario iniciado sesión:", user);
    return user;
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    throw error;
  }
}

export async function guardarDatosCliente(datosCliente) {
  try {
    const docRef = await addDoc(collection(db, "clientes"), datosCliente); // 'clientes'
    console.log("Oferta creada con ID: ", docRef.id);
    alert('cliente guardada correctamente');
  } catch (error) {
    console.error("Error al guardar la cliente: ", error);
    alert('Error al guardar cliente. Consulta la consola para más detalles.');
  }
}

// Initialize roles in Firestore
async function initializeRoles() {
  const rolesRef = collection(db, "roles");

  const roles = ["SUPER_ADMIN", "ADMIN", "USUARIO"];
  roles.forEach(async (role) => {
    await setDoc(doc(rolesRef, role), { name: role });
  });

  console.log("Roles initialized.");
}

initializeRoles();

// Function to register a user with a role
export async function registerUser(email, password, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user role in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role
    });

    console.log("User registered:", user);
    return user;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}
