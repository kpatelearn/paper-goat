import { db } from './firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';

export async function deleteBlogPost(id: string) {
  await deleteDoc(doc(db, 'posts', id));
}
