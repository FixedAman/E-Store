// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD5bW4SanqMa6OEdn7g4I6ocKGBLRJB0-o",
  authDomain: "e-store-dd021.firebaseapp.com",
  projectId: "e-store-dd021",
  storageBucket: "e-store-dd021.appspot.com",
  messagingSenderId: "52818587171",
  appId: "1:52818587171:web:2341987b83df48d81b8b96",
  measurementId: "G-ZWQLBW1327",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
