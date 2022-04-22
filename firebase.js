// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARPCvcBBgXL65Njutlth9bGC5jtBDyz7E",
  authDomain: "tinderclone-d347h.firebaseapp.com",
  projectId: "tinderclone-d347h",
  storageBucket: "tinderclone-d347h.appspot.com",
  messagingSenderId: "331806672983",
  appId: "1:331806672983:web:22fcdc57b856af9940fb12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export { auth, db }