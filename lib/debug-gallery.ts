// Debug script to check Firestore gallery data
import { getGalleryItems } from './gallery';

export async function debugGalleryData() {
  try {
    const items = await getGalleryItems();
    console.log('=== FIRESTORE GALLERY DEBUG ===');
    console.log('Total items found:', items.length);
    
    items.forEach((item, index) => {
      console.log(`\n--- Item ${index + 1} ---`);
      console.log('ID:', item.id);
      console.log('Title:', item.title);
      console.log('Category:', item.category);
      console.log('Material:', item.material);
      console.log('Image URL:', item.mainImageUrl);
      console.log('Created:', item.createdAt);
    });
    
    return items;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return [];
  }
}
