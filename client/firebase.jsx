// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// For Firestore
import { getAuth } from "firebase/auth"; // For Authentication
import { getAnalytics } from "firebase/analytics"; // For Analytics (optional)

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEyxjAS7uYNRuc0ThFYpSklI-yR1hJK6s",
  authDomain: "welfare-9fae9.firebaseapp.com",
  projectId: "welfare-9fae9",
  storageBucket: "welfare-9fae9.firebasestorage.app",
  messagingSenderId: "509953411804",
  appId: "1:509953411804:web:60a9d9d979b03186c48219",
  measurementId: "G-WK36MKZQ09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication (optional)
const auth = getAuth(app);
export { app, analytics, db, auth };
