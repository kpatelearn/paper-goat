import { db } from './firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { BlogPost } from './getBlogPosts';

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const q = query(collection(db, 'posts'), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || 'No title',
      date: data.date || 'No date',
      slug: data.slug || doc.id,
      content: data.content || '',
      imageUrl: data.imageUrl || '/images/default.jpg',
    };
  } catch (error) {
    console.error('\u{274C} Firestore fetch error:', error);
    return null;
  }
}
