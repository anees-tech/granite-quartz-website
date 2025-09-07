// Utility to debug Firestore data
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function debugFirestoreGallery(): Promise<any[]> {
  console.log('🔍 Checking Firestore gallery collection...');
  
  try {
    const querySnapshot = await getDocs(collection(db, "gallery"));
    console.log('📊 Total documents in gallery collection:', querySnapshot.size);
    
    if (querySnapshot.empty) {
      console.log('✅ Gallery collection is empty');
      return [];
    }
    
    const docs: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('📄 Document ID:', doc.id);
      console.log('📄 Document data:', {
        title: data.title,
        category: data.category,
        material: data.material,
        hasImage: !!data.mainImageUrl,
        createdAt: data.createdAt
      });
      docs.push({ id: doc.id, ...data });
    });
    
    return docs;
  } catch (error) {
    console.error('❌ Error checking Firestore:', error);
    return [];
  }
}
