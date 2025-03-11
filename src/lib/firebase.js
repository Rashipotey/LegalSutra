import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9mt1FqyuiAH0ZbaZPNzW-WBuFOHKSne4",
  authDomain: "legalsutra-c47e2.firebaseapp.com",
  projectId: "legalsutra-c47e2",
  storageBucket: "legalsutra-c47e2.firebasestorage.app",
  messagingSenderId: "81700782534",
  appId: "1:81700782534:web:b2bee4e583c07a1498b2c7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User:", result.user);
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out");
  } catch (error) {
    console.error(error);
  }
};

export { auth, signInWithGoogle, logout };