// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, orderBy } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuwxkmvjY66-gnv38tMI6GLmZPynlkzes",
  authDomain: "granite-92571.firebaseapp.com",
  projectId: "granite-92571",
  storageBucket: "granite-92571.firebasestorage.app",
  messagingSenderId: "625159053870",
  appId: "1:625159053870:web:626e014204c22766d0f5bf",
  measurementId: "G-QTB9ZMBJ4P"
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

// Review type
export interface Review {
  id: string;
  galleryId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Get current user
export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

// Add a review
export async function addReview(review: Omit<Review, "id" | "createdAt">): Promise<Review> {
  const docRef = await addDoc(collection(db, "reviews"), {
    ...review,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...review, createdAt: new Date().toISOString() };
}

// Get reviews for a gallery item
export async function getReviews(galleryId: string): Promise<Review[]> {
  const q = query(
    collection(db, "reviews"),
    where("galleryId", "==", galleryId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];
}

export { auth, db };