import { initializeApp } from "firebase/app";

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

export default app;