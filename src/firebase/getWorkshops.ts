// getWorkshops.ts
import { db } from './firebase.config';
import { collection, getDocs, Timestamp } from 'firebase/firestore';

export interface Workshop {
  id: string;
  title: string;
  date: Timestamp; // Changed type
  venue: string;
  description: string;
  imageUrl: string;
  signupLink: string;
}

export async function getWorkshops(): Promise<Workshop[]> {
  try {
    const snapshot = await getDocs(collection(db, 'workshops'));
    console.log(`📦 Firestore snapshot size: ${snapshot.size}`);

    const workshops: Workshop[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      // Ensure data.date is a Timestamp before converting
      const workshopDate = data.date instanceof Timestamp ? data.date : Timestamp.now(); // Fallback if data.date is not a Timestamp

      workshops.push({
        id: doc.id,
        title: data.title || 'No title',
        date: workshopDate, // Keep as Timestamp for now
        venue: data.venue || 'No venue',
        description: data.description || '',
        imageUrl: data.imageUrl || '/images/default.jpg',
        signupLink: data.signupLink || '#',
      });
    });

    return workshops;
  } catch (error) {
    console.error('❌ Firestore fetch error:', error);
    return [];
  }
}