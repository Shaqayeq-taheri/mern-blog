// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-82395.firebaseapp.com",
    projectId: "mern-blog-82395",
    storageBucket: "mern-blog-82395.firebasestorage.app",
    messagingSenderId: "771298235088",
    appId: "1:771298235088:web:c87b4d6fb93e475c0204d5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
