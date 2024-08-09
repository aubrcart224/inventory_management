// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUa8WZbko9tBr6qYZhIT8FjkTjOhEGP04",
  authDomain: "inventory-management-69623.firebaseapp.com",
  projectId: "inventory-management-69623",
  storageBucket: "inventory-management-69623.appspot.com",
  messagingSenderId: "887128354996",
  appId: "1:887128354996:web:d7ad1a8b21a7d48f8ca7e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};

`1`