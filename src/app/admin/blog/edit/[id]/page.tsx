'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/firebase/firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import WithAdminProtection from '@/components/WithAdminProtection';

function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'posts', id));
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title || '');
        setDate(data.date || '');
        setSlug(data.slug || '');
        setContent(data.content || '');
        setCurrentImageUrl(data.imageUrl || '');
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, 'posts', id);

    let imageUrl: string | undefined = undefined;

    if (imageFile) {
      const storageRef = ref(storage, `posts/${Date.now()}_${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      const snapshot: any = await new Promise((resolve, reject) => {
        uploadTask.on('state_changed', null, reject, () => resolve(uploadTask.snapshot));
      });

      imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(docRef, {
      title,
      date,
      slug,
      content,
      ...(imageUrl && { imageUrl }), // only update if a new image is uploaded
    });

    setMessage('Post updated.');
    router.push('/blog');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Date"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Slug"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
       <div
  contentEditable
  className="w-full border rounded p-2 text-white bg-goat-black/80 min-h-[200px]"
  onInput={(e) => setContent((e.target as HTMLElement).innerHTML)}
  dangerouslySetInnerHTML={{ __html: content }}
  suppressContentEditableWarning={true}
/>

        {currentImageUrl && (
          <div>
            <p className="text-sm text-white mb-1">Current Image:</p>
            <img src={currentImageUrl} alt="Current" className="rounded mb-2" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
        <p className="text-xs text-white italic">Landscape-oriented images work best.</p>

        <button type="submit" className="px-4 py-2 bg-goat-black/80 text-white rounded">
          Save
        </button>
      </form>
      {message && <p className="mt-4 text-white">{message}</p>}
    </div>
  );
}

export default WithAdminProtection(EditBlogPage);
