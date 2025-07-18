import { db } from './firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';

export async function deleteShow(id: string) {
  await deleteDoc(doc(db, 'shows', id));
}
