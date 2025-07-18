'use client';

import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import WithAdminProtection from '@/components/WithAdminProtection';

function AdminDashboard() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        <Link
          href="/admin/shows/new"
          className="border rounded-lg p-6 text-center hover:bg-gray-50"
        >
          New Show
        </Link>
        <Link
          href="/admin/workshops/new"
          className="border rounded-lg p-6 text-center hover:bg-gray-50"
        >
          New Workshop
        </Link>
        <Link
          href="/admin/blog/new"
          className="border rounded-lg p-6 text-center hover:bg-gray-50"
        >
          New Blog Post
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 underline text-sm text-blue-600"
      >
        Log out
      </button>
    </div>
  );
}

export default WithAdminProtection(AdminDashboard);
