// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQcKlSy2w8JPHnArfJj0sNGyoKJhD52ic",
  authDomain: "nicejob-d09b0.firebaseapp.com",
  projectId: "nicejob-d09b0",
  storageBucket: "nicejob-d09b0.appspot.com",
  messagingSenderId: "451855741357",
  appId: "1:451855741357:web:5e8c95b02412b68a643124",
};

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

export default app;
export { auth, db, storage };
