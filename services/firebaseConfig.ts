import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDc0K-cJbMljQklq72UErDLgwk6IlesKPI",
    authDomain: "women-safety-app-fb828.firebaseapp.com",
    projectId: "women-safety-app-fb828",
    storageBucket: "women-safety-app-fb828.firebasestorage.app",
    messagingSenderId: "147214959569",
    appId: "1:147214959569:web:895c656122d182528316f0",
    measurementId: "G-Y08CJ353DM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;