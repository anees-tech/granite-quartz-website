// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, orderBy, updateDoc, deleteDoc } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
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

// Type definitions
export interface CompanyInfo {
  about: string;
  address: string;
  email: string;
  phone: string;
}

export interface Review {
  id: string;
  galleryId: string;
  userId: string;
  userEmail: string;
  reviewText: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  material: string;
  mainImageUrl: string;
  description: string;
  createdAt: string;
  images: {
    [key: string]: {
      url: string;
      cloudinaryPublicId: string;
      isMain: boolean;
    };
  };
  client?: string;
  location?: string;
  specifications?: {
    [key: string]: string;
  };
  averageRating?: number;
  reviewCount?: number;
}

// Authentication functions
export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

// Review functions
export async function addReview(review: Omit<Review, "id" | "createdAt">): Promise<Review> {
  const docRef = await addDoc(collection(db, "reviews"), {
    ...review,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...review, createdAt: new Date().toISOString() };
}

export async function deleteReview(reviewId: string): Promise<void> {
  const reviewRef = doc(db, "reviews", reviewId);
  await deleteDoc(reviewRef);
}

export async function updateReview(reviewId: string, data: Partial<Omit<Review, 'id' | 'userId' | 'galleryId' | 'createdAt'>>): Promise<void> {
  const reviewRef = doc(db, "reviews", reviewId);
  await updateDoc(reviewRef, { ...data, status: 'pending' });
}

export async function getUserReviews(userId: string): Promise<Review[]> {
  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Review[];
}

export async function getApprovedReviews(galleryId: string): Promise<Review[]> {
  const reviewsRef = collection(db, "reviews");
  const q = query(
    reviewsRef,
    where("galleryId", "==", galleryId),
    where("status", "==", "approved")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Review[];
}

export async function getPendingReviews(galleryId: string): Promise<Review[]> {
  const reviewsRef = collection(db, "reviews");
  const q = query(
    reviewsRef,
    where("galleryId", "==", galleryId),
    where("status", "==", "pending")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Review[];
}

export async function getReviews(galleryId: string): Promise<Review[]> {
  const q = query(
    collection(db, "reviews"),
    where("galleryId", "==", galleryId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const reviews = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];
  
  console.log("💬 Reviews for gallery item:", galleryId, reviews);
  return reviews;
}

export async function updateReviewStatus(reviewId: string, status: "pending" | "approved" | "rejected"): Promise<void> {
  const reviewRef = doc(db, "reviews", reviewId);
  await updateDoc(reviewRef, { status });
  console.log("💬 Updated review status:", reviewId, status);
}

// Gallery functions
export async function addGalleryItem(item: Omit<GalleryItem, "id">): Promise<GalleryItem> {
  const docRef = await addDoc(collection(db, "gallery"), item);
  return { id: docRef.id, ...item };
}

// Helper function to serialize Firestore data
function serializeFirestoreData(data: any): any {
  if (data && typeof data === 'object') {
    if (data.toDate && typeof data.toDate === 'function') {
      // Convert Firestore Timestamp to ISO string
      const serializedDate = data.toDate().toISOString();
      console.log("🔄 Serializing Timestamp:", data, "→", serializedDate);
      return serializedDate;
    }
    const serialized: any = {};
    for (const key in data) {
      serialized[key] = serializeFirestoreData(data[key]);
    }
    return serialized;
  }
  return data;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const querySnapshot = await getDocs(collection(db, "gallery"));
  const items = await Promise.all(
    querySnapshot.docs.map(async doc => {
      const data = serializeFirestoreData(doc.data());
      const id = doc.id;
      // Fetch approved reviews for this gallery item
      const reviews = await getApprovedReviews(id);
      const reviewCount = reviews.length;
      const averageRating = reviewCount > 0 ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount : 0;
      return {
        id,
        ...data,
        averageRating,
        reviewCount,
      } as GalleryItem;
    })
  );
  console.log("🔥 Firebase Gallery Items:", items);
  console.log("🔥 Raw Firestore Docs:", querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
  return items;
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const docRef = doc(db, "gallery", id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    console.log("🔥 Gallery item not found for ID:", id);
    return null;
  }
  
  const item = { id: docSnap.id, ...serializeFirestoreData(docSnap.data()) } as GalleryItem;
  console.log("🔥 Single Gallery Item:", item);
  console.log("🔥 Raw Firestore Doc:", { id: docSnap.id, data: docSnap.data() });
  
  return item;
}

// Get company information from Firebase
export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const docRef = doc(db, "footerData", "main");
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.log("🔥 Company info not found");
      return null;
    }
    
    const data = serializeFirestoreData(docSnap.data()) as CompanyInfo;
    console.log("🔥 Company Info:", data);
    
    return data;
  } catch (error) {
    console.error("🔥 Error fetching company info:", error);
    return null;
  }
}

export { app, auth, db };
