import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAA7sQJrURa6Jzw7YpdRq-7So4QV6a9cE",
  authDomain: "wtyczka-8022b.firebaseapp.com",
  projectId: "wtyczka-8022b",
  storageBucket: "wtyczka-8022b.appspot.com",
  messagingSenderId: "644591498181",
  appId: "1:644591498181:web:37bf5304592d499eaed1ac",
  measurementId: "G-YFLH8R0KM6",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
