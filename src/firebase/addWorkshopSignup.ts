import { db } from './firebase.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface WorkshopSignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export async function addWorkshopSignup(workshopId: string, data: WorkshopSignupData) {
  const ref = collection(db, 'workshops', workshopId, 'signups');
  await addDoc(ref, { ...data, timestamp: serverTimestamp() });
}
