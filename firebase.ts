// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAi8f89au-OPh7DxZWxU6Yynbyy8IQnxmw",
    authDomain: "netflix-clone-c6ac8.firebaseapp.com",
    projectId: "netflix-clone-c6ac8",
    storageBucket: "netflix-clone-c6ac8.appspot.com",
    messagingSenderId: "543946087339",
    appId: "1:543946087339:web:45b9d9848844faf06650ee",
    measurementId: "G-2VVPKSCV8Y",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const auth = getAuth(app);

export default app;
export { auth, db };
