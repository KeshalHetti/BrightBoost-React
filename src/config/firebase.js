// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6s68EoMTMV57ZNrHLywwtxv2xHxibw9o",
  authDomain: "brightboost-c8763.firebaseapp.com",
  projectId: "brightboost-c8763",
  storageBucket: "brightboost-c8763.appspot.com",
  messagingSenderId: "624146711195",
  appId: "1:624146711195:web:92118fcb9018378e33bc3e",
  measurementId: "G-CLRLTKMZLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);