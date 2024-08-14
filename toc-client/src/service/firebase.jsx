// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwfROQFv1FVBAGCcvgEvEEJb_TYvz7oQs",
  authDomain: "toc---24.firebaseapp.com",
  projectId: "toc---24",
  storageBucket: "toc---24.appspot.com",
  messagingSenderId: "745659534040",
  appId: "1:745659534040:web:05c8b201711981342be5ad",
  measurementId: "G-L0637CBMS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { db };
