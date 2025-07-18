'use client';
import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.config';
import WithAdminProtection from '@/components/WithAdminProtection';

function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
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
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateDoc(doc(db, 'posts', id), {
      title,
      date,
      slug,
      content,
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
          className="w-full border rounded p-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Date"
          className="w-full border rounded p-2"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Slug"
          className="w-full border rounded p-2"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full border rounded p-2"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Save
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default WithAdminProtection(EditBlogPage);
