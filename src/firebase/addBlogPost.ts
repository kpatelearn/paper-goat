import { db, storage } from './firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  type UploadTaskSnapshot,
} from 'firebase/storage';

export interface BlogPostFormData {
  title: string;
  date: string;
  slug: string;
  content: string;
}

export async function addBlogPost(data: BlogPostFormData, file: File) {
  const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  const snapshot: UploadTaskSnapshot = await new Promise((resolve, reject) => {
    uploadTask.on('state_changed', null, reject, () => resolve(uploadTask.snapshot));
  });

  const imageUrl = await getDownloadURL(snapshot.ref);

  await addDoc(collection(db, 'posts'), {
    ...data,
    imageUrl,
  });
}
