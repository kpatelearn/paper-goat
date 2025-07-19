'use client';
import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.config';
import WithAdminProtection from '@/components/WithAdminProtection';

function EditShowPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [ticketLink, setTicketLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'shows', id));
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title || '');
        setDate(data.date || '');
        setVenue(data.venue || '');
        setDescription(data.description || '');
        setTicketLink(data.ticketLink || '');
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateDoc(doc(db, 'shows', id), {
      title,
      date,
      venue,
      description,
      ticketLink,
    });
    setMessage('Show updated.');
    router.push('/shows');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Show</h1>
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
        <input
          type="text"
          placeholder="Ticket Link"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={ticketLink}
          onChange={e => setTicketLink(e.target.value)}
          required
        />
        <button type="submit" className="px-4 py-2 bg-goat-black/80 text-white rounded">
          Save
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default WithAdminProtection(EditShowPage);
