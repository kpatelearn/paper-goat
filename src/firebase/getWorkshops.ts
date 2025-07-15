import { db } from './firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export interface Workshop {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
  signupLink: string;
}

export async function getWorkshops(): Promise<Workshop[]> {
  try {
    const snapshot = await getDocs(collection(db, 'workshops'));
    console.log(`\u{1F4E6} Firestore snapshot size: ${snapshot.size}`);

    const workshops: Workshop[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log('\u{1F50D} Firestore doc data:', data);

      workshops.push({
        id: doc.id,
        title: data.title || 'No title',
        date: data.date || 'No date',
        venue: data.venue || 'No venue',
        description: data.description || '',
        imageUrl: data.imageUrl || '/images/default.jpg',
        signupLink: data.signupLink || '#',
      });
    });

    return workshops;
  } catch (error) {
    console.error('\u{274C} Firestore fetch error:', error);

    // TEMP: Fallback dummy data to check display
    return [
      {
        id: 'test1',
        title: 'Test Workshop',
        date: 'Tomorrow',
        venue: 'Test Venue',
        description: 'Just checking fallback!',
        imageUrl: '/images/test.jpg',
        signupLink: '#',
      },
    ];
  }
}
