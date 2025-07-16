'use client';

import { useState, FormEvent } from 'react';
import { addWorkshop } from '@/firebase/addWorkshop';

export default function NewWorkshopPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [signupLink, setSignupLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage('Please select an image.');
      return;
    }
    setSubmitting(true);
    try {
      await addWorkshop(
        { title, date, venue, description, signupLink },
        imageFile,
      );
      setMessage('Workshop added successfully.');
      setTitle('');
      setDate('');
      setVenue('');
      setDescription('');
      setSignupLink('');
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add workshop.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Add Workshop</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Date"
          className="w-full border rounded p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Venue"
          className="w-full border rounded p-2"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Signup Link"
          className="w-full border rounded p-2"
          value={signupLink}
          onChange={(e) => setSignupLink(e.target.value)}
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
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {submitting ? 'Uploading...' : 'Add Workshop'}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
