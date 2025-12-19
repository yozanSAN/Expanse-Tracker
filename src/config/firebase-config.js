// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAh4C3r6x5cj8CTL7UP-etEU-Ew7onyPs",
  authDomain: "expense-tacker-22ae2.firebaseapp.com",
  projectId: "expense-tacker-22ae2",
  storageBucket: "expense-tacker-22ae2.firebasestorage.app",
  messagingSenderId: "317055515680",
  appId: "1:317055515680:web:11f180aa186577c65b9045",
  measurementId: "G-PFSBTXGV69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;