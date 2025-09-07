import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, getDoc, query, where, orderBy, updateDoc, deleteDoc } from "firebase/firestore";

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

// Delete a review by ID
export async function deleteReview(reviewId: string): Promise<void> {
	const reviewRef = doc(db, "reviews", reviewId);
	await deleteDoc(reviewRef);
}

// Update a review (sets status to 'pending' on edit)
export async function updateReview(reviewId: string, data: Partial<Omit<Review, 'id' | 'userId' | 'galleryId' | 'createdAt'>>): Promise<void> {
	const reviewRef = doc(db, "reviews", reviewId);
	await updateDoc(reviewRef, { ...data, status: 'pending' });
}
// Get all reviews for a specific user
export async function getUserReviews(userId: string): Promise<Review[]> {
	const reviewsRef = collection(db, "reviews");
	const q = query(reviewsRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Review[];
}
// Get reviews for a gallery item by status
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

// Add a new gallery item
export async function addGalleryItem(item: Omit<GalleryItem, "id">): Promise<GalleryItem> {
	const docRef = await addDoc(collection(db, "gallery"), item);
	return { id: docRef.id, ...item };
}

// Helper function to serialize Firestore data
export function serializeFirestoreData(data: any): any {
	if (data && typeof data === 'object') {
		if (data.toDate && typeof data.toDate === 'function') {
			// Convert Firestore Timestamp to ISO string
			const serializedDate = data.toDate().toISOString();
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

// Get all gallery items
export async function getGalleryItems(): Promise<GalleryItem[]> {
	const querySnapshot = await getDocs(collection(db, "gallery"));
	console.log('🔥 Gallery.ts - Firestore docs count:', querySnapshot.size)
	
	const items = await Promise.all(
		querySnapshot.docs.map(async doc => {
			const data = serializeFirestoreData(doc.data());
			const id = doc.id;
			console.log('🔥 Gallery.ts - Processing doc:', { id, title: data.title })
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
	console.log('🔥 Gallery.ts - Final processed items:', items.length)
	return items;
}

// Get a single gallery item by ID
export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
	const docRef = doc(db, "gallery", id);
	const docSnap = await getDoc(docRef);
	
	if (!docSnap.exists()) {
		return null;
	}
	
	const item = { id: docSnap.id, ...serializeFirestoreData(docSnap.data()) } as GalleryItem;
	
	return item;
}

// Add a review to the reviews collection
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
	const reviews = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as Review[];
	
	return reviews;
}

// Update review status (for admin)
export async function updateReviewStatus(reviewId: string, status: "pending" | "approved" | "rejected"): Promise<void> {
	const reviewRef = doc(db, "reviews", reviewId);
	await updateDoc(reviewRef, { status });
}
