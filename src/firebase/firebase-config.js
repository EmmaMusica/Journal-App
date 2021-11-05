
// import 'firebase/firestore';
// import 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDXuY1gc05Ukh-P0Wi514rqyct__0ObFQ",
  authDomain: "journal-app-4ce42.firebaseapp.com",
  projectId: "journal-app-4ce42",
  storageBucket: "journal-app-4ce42.appspot.com",
  messagingSenderId: "271329178991",
  appId: "1:271329178991:web:c6af1c1802b74edbd3e49a",
  measurementId: "G-RGZ87FWP0X"
};

// Initialize Firebase
initializeApp(firebaseConfig);


///referencia a la base de datos
const db = getFirestore();

//Objeto google para obtener credenciales del usuario
const googleAuthProvider = new GoogleAuthProvider();



export {
    db,
    googleAuthProvider
}



