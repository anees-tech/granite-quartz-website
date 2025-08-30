// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAurOA0eA1gO4PKqA2Mtg9hf2L2ekDZ8pw",
  authDomain: "granite-company.firebaseapp.com",
  projectId: "granite-company",
  storageBucket: "granite-company.firebasestorage.app",
  messagingSenderId: "148345403932",
  appId: "1:148345403932:web:fb23b54a776d52cda2bdd9",
  measurementId: "G-2F1QJW8FCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Only initialize analytics in the browser and if supported
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export { auth, db };