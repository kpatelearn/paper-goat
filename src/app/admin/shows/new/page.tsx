'use client';

import { useState, FormEvent } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { addShow } from '@/firebase/addShow';
import WithAdminProtection from '@/components/WithAdminProtection'; // Adjust path if needed

function NewShowPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [ticketLink, setTicketLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload(); // Optional: refresh to show login if needed
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage('Please select an image.');
      return;
    }

    setSubmitting(true);
    try {
      await addShow({ title, date, venue, description, ticketLink }, imageFile);
      setMessage('Show added successfully.');
      setTitle('');
      setDate('');
      setVenue('');
      setDescription('');
      setTicketLink('');
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add show.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Add Show</h1>
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
          placeholder="Venue"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ticket Link"
          className="w-full border rounded p-2 text-white bg-goat-black/80"
          value={ticketLink}
          onChange={(e) => setTicketLink(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-goat-black/80 text-white rounded disabled:opacity-50"
        >
          {submitting ? 'Uploading...' : 'Add Show'}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
      <button
        onClick={handleLogout}
        className="btn btn-primary mt-12"
      >
        Log out
      </button>
    </div>
  );
}

export default WithAdminProtection(NewShowPage);
