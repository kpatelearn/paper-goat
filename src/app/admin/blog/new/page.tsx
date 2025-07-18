'use client';

import { useState, FormEvent } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { addBlogPost } from '@/firebase/addBlogPost';
import WithAdminProtection from '@/components/WithAdminProtection';

function NewBlogPostPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage('Please select an image.');
      return;
    }

    setSubmitting(true);
    try {
      await addBlogPost({ title, date, slug, content }, imageFile);
      setMessage('Blog post added successfully.');
      setTitle('');
      setDate('');
      setSlug('');
      setContent('');
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add blog post.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Add Blog Post</h1>
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
          placeholder="Slug"
          className="w-full border rounded p-2"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full border rounded p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
          {submitting ? 'Uploading...' : 'Add Blog Post'}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
      <button
        onClick={handleLogout}
        className="text-sm text-blue-600 underline mt-6"
      >
        Log out
      </button>
    </div>
  );
}

export default WithAdminProtection(NewBlogPostPage);
