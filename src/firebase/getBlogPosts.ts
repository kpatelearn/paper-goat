import { db } from './firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  slug: string;
  content: string;
  imageUrl: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    console.log(`\u{1F4E6} Firestore snapshot size: ${snapshot.size}`);

    const posts: BlogPost[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log('\u{1F50D} Firestore doc data:', data);

      posts.push({
        id: doc.id,
        title: data.title || 'No title',
        date: data.date || 'No date',
        slug: data.slug || doc.id,
        content: data.content || '',
        imageUrl: data.imageUrl || '/images/default.jpg',
      });
    });

    return posts;
  } catch (error) {
    console.error('\u{274C} Firestore fetch error:', error);
    return [];
  }
}
