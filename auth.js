import { auth, db } from "./data/firebase/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) throw new Error("Usuario no encontrado en Firestore");

    const userData = userDocSnap.data();

    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      ...userData
    }));

    return {
      user,
      ...userData
    };

  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    throw error;
  }
}

export async function registerUser(email, password, role, name, apellidos, username, celular, ciudad) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: "USUARIO",
      name,
      apellidos,
      username,
      celular,
      ciudad,
      createdAt: new Date()
    });

    console.log("Usuario registrado:", user);
    return user;
  } catch (error) {
    console.error("Error durante el registro:", error);
    throw error;
  }
}


export function loadTemplateBasedOnRole(role) {
  switch (role) {
    case "SUPER_ADMIN":
      window.location.href = "indexSuperAdmin.html";
      break;
    case "ADMIN":
      window.location.href = "indexAdmin.html";
      break;
    case "USUARIO":
      window.location.href = "index.html";
      break;
    default:
      console.error("Rol desconocido:", role);
      break;
  }
}
