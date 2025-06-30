// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzhkDTs1p2YkiIDQxQLJxMcRS9CytkbkQ",
  authDomain: "civ-6-6649d.firebaseapp.com",
  projectId: "civ-6-6649d",
  storageBucket: "civ-6-6649d.firebasestorage.app",
  messagingSenderId: "1013246711537",
  appId: "1:1013246711537:web:26732497177ce473243b50",
  measurementId: "G-30GLSHF49Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();