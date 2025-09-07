// Admin utility for managing gallery data
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export async function listAllGalleryItems() {
  try {
    const querySnapshot = await getDocs(collection(db, 'gallery'));
    const items: any[] = [];
    
    console.log('📋 Gallery Items in Firestore:');
    console.log('Total documents:', querySnapshot.size);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('\n--- Document ---');
      console.log('ID:', doc.id);
      console.log('Title:', data.title || 'No title');
      console.log('Category:', data.category || 'No category');
      console.log('Material:', data.material || 'No material');
      console.log('Created:', data.createdAt || 'No date');
      
      items.push({
        id: doc.id,
        ...data
      });
    });
    
    return items;
  } catch (error) {
    console.error('❌ Error listing gallery items:', error);
    return [];
  }
}

export async function deleteGalleryItem(itemId: string) {
  try {
    await deleteDoc(doc(db, 'gallery', itemId));
    console.log(`✅ Successfully deleted gallery item: ${itemId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error deleting gallery item ${itemId}:`, error);
    return false;
  }
}

export async function clearAllGalleryItems() {
  try {
    const querySnapshot = await getDocs(collection(db, 'gallery'));
    
    if (querySnapshot.empty) {
      console.log('✅ Gallery collection is already empty');
      return true;
    }
    
    console.log(`🗑️ Deleting ${querySnapshot.size} gallery items...`);
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    console.log('✅ All gallery items deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ Error clearing gallery items:', error);
    return false;
  }
}

// Function to run in browser console to check gallery data
export function debugGalleryInBrowser() {
  // You can call this function in the browser console like:
  // import('./lib/admin-utils').then(module => module.debugGalleryInBrowser())
  listAllGalleryItems().then(items => {
    console.log('Gallery items found:', items.length);
    if (items.length > 0) {
      console.table(items.map(item => ({
        id: item.id,
        title: item.title || 'No title',
        category: item.category || 'No category',
        material: item.material || 'No material'
      })));
    }
  });
}
