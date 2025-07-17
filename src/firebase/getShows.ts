// src/firebase/getShows.ts
import { db } from './firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export interface Show {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  imageUrl: string;
  ticketLink: string;
}

export async function getShows(): Promise<Show[]> {
  try {
    const snapshot = await getDocs(collection(db, 'shows'));
    console.log(`📦 Firestore snapshot size: ${snapshot.size}`);

    const shows: Show[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log('🔍 Firestore doc data:', data);

      shows.push({
        id: doc.id,
        title: data.title || 'No title',
        date: data.date || 'No date',
        venue: data.venue || 'No venue',
        description: data.description || '',
        imageUrl: data.imageUrl || '/images/default.jpg',
        ticketLink: data.ticketLink || '#',
      });
    });

    return shows;
  } catch (error) {
    console.error('❌ Firestore fetch error:', error);

    // Return an empty array so the UI can show a friendly message
    return [];
  }
}
