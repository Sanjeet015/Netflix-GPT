// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDprNjAF1qyDVLel6LmIIoLQxyggD_MGD4",
  authDomain: "netflixgpt-8f8bd.firebaseapp.com",
  projectId: "netflixgpt-8f8bd",
  storageBucket: "netflixgpt-8f8bd.firebasestorage.app",
  messagingSenderId: "485323517514",
  appId: "1:485323517514:web:0c29e770d3b6ed616580b3",
  measurementId: "G-ZK8BB0EGMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();