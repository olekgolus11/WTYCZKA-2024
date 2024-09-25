import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "wtyczka-b0ddc.firebaseapp.com",
  projectId: "wtyczka-b0ddc",
  storageBucket: "wtyczka-b0ddc.appspot.com",
  messagingSenderId: "426978636258",
  appId: "1:426978636258:web:5e0a1cd739c5894ab749bb",
  measurementId: "G-G694Y5XVCF",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
