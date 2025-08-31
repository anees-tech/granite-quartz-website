import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuwxkmvjY66-gnv38tMI6GLmZPynlkzes",
  authDomain: "granite-92571.firebaseapp.com",
  projectId: "granite-92571",
  storageBucket: "granite-92571.firebasestorage.app",
  messagingSenderId: "625159053870",
  appId: "1:625159053870:web:626e014204c22766d0f5bf",
  measurementId: "G-QTB9ZMBJ4P"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

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

export { app, auth, db };
