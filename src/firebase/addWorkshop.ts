import { db, storage } from './firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export interface WorkshopFormData {
  title: string;
  date: string;
  venue: string;
  description: string;
  signupLink: string;
}

export async function addWorkshop(data: WorkshopFormData, file: File) {
  const storageRef = ref(storage, `workshops/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  const snapshot: any = await new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      null,
      reject,
      () => resolve(uploadTask.snapshot)
    );
  });

  const imageUrl = await getDownloadURL(snapshot.ref);

  await addDoc(collection(db, 'workshops'), {
    ...data,
    imageUrl,
  });
}

