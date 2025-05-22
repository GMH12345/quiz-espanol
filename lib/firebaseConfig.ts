// lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWJxQ6Vglt-1p9rIwl0QejsfwaiA7DWoE",
  authDomain: "desverm-4434b.firebaseapp.com",
  projectId: "desverm-4434b",
  storageBucket: "desverm-4434b.firebasestorage.app",
  messagingSenderId: "580349392260",
  appId: "1:580349392260:web:96800cf8a081e9f2c259d1",
  measurementId: "G-MEDJJLLWGB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
