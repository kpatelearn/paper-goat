import { db, storage } from './firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface WorkshopFormData {
  title: string;
  date: string;
  venue: string;
  description: string;
  signupLink: string;
}

export async function addWorkshop(data: WorkshopFormData, file: File) {
  const storageRef = ref(storage, `workshops/${Date.now()}_${file.name}`);
  const uploadTask = await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(uploadTask.ref);

  await addDoc(collection(db, 'workshops'), {
    ...data,
    imageUrl,
  });
}
