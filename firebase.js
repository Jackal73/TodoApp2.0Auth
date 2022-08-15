import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX1ho4yPIcEJs6qBcf-iCwERdVpA8ybwE",
  authDomain: "listit2-0.firebaseapp.com",
  projectId: "listit2-0",
  storageBucket: "listit2-0.appspot.com",
  messagingSenderId: "424131194448",
  appId: "1:424131194448:web:b4ed8a00247b8868752b55",
  measurementId: "G-BKVJYD7SC9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
