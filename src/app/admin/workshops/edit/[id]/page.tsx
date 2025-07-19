'use client';
import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.config';
import WithAdminProtection from '@/components/WithAdminProtection';
import { storage } from '@/firebase/firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


function EditWorkshopPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [signupLink, setSignupLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);


  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'workshops', id));
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title || '');
        setDate(data.date || '');
        setVenue(data.venue || '');
        setDescription(data.description || '');
        setSignupLink(data.signupLink || '');
        setImageUrl(data.imageUrl || '');
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  let finalImageUrl = imageUrl;

  if (newImageFile) {
    const imageRef = ref(storage, `workshops/${Date.now()}_${newImageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, newImageFile);
  await new Promise<void>((resolve, reject) => {
  uploadTask.on(
    'state_changed',
    null,
    reject,
    () => resolve()
  );
});
    finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
  }

  await updateDoc(doc(db, 'workshops', id), {
    title,
    date,
    venue,
    description,
    signupLink,
    imageUrl: finalImageUrl,
  });

  setMessage('Workshop updated.');
  router.push('/workshops');
};


  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Workshop</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Date"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Venue"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={venue}
          onChange={e => setVenue(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        {imageUrl && (
  <div>
    <p className="text-white">Current Image:</p>
    <img src={imageUrl} alt="Current" className="w-full mb-2 rounded" />
  </div>
)}

<input
  type="file"
  accept="image/*"
  onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
  className="w-full border rounded p-2 bg-goat-black/80 text-white file:text-white file:bg-goat-black/50"
/>

        <button type="submit" className="px-4 py-2 bg-goat-black/80 text-white rounded">
          Save
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default WithAdminProtection(EditWorkshopPage);
