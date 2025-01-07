// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-new-d2ab8.firebaseapp.com",
    projectId: "mern-blog-new-d2ab8",
    storageBucket: "mern-blog-new-d2ab8.firebasestorage.app",
    messagingSenderId: "649596152249",
    appId: "1:649596152249:web:8ef7907765e05c1deeee68",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
