import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-bJC9RDwsfv6LIr3f1HSuwluHEYihmkY",
  authDomain: "llm-based-chat-app.firebaseapp.com",
  projectId: "llm-based-chat-app",
  storageBucket: "llm-based-chat-app.firebasestorage.app",
  messagingSenderId: "924450351679",
  appId: "1:924450351679:web:6a8490742a63178807268a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
