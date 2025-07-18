'use client';
import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.config';
import WithAdminProtection from '@/components/WithAdminProtection';

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
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateDoc(doc(db, 'workshops', id), {
      title,
      date,
      venue,
      description,
      signupLink,
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
          placeholder="Venue"
          className="w-full border rounded p-2"
          value={venue}
          onChange={e => setVenue(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border rounded p-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Signup Link"
          className="w-full border rounded p-2"
          value={signupLink}
          onChange={e => setSignupLink(e.target.value)}
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

export default WithAdminProtection(EditWorkshopPage);
