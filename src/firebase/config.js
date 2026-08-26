import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDELrPue5SAmQB0w6ICAJ95y2JtDRAtK5o",
    authDomain: "booklist-b486e.firebaseapp.com",
    projectId: "booklist-b486e",
    storageBucket: "booklist-b486e.firebasestorage.app",
    messagingSenderId: "516636389623",
    appId: "1:516636389623:web:fd0625457c9ee32a6a23f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
