import { db } from './firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';

export async function deleteWorkshop(id: string) {
  await deleteDoc(doc(db, 'workshops', id));
}
