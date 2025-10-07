// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOebgZ0kVDPPIV7tmfurESZU3g2QrBBRE",
  authDomain: "spendwise-7a0f2.firebaseapp.com",
  projectId: "spendwise-7a0f2",
  storageBucket: "spendwise-7a0f2.appspot.com",
  messagingSenderId: "674803860298",
  appId: "1:674803860298:web:fcabec72a89effbba037b3",
  measurementId: "G-7X8B00HFG0"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore and assign it to `db`
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);