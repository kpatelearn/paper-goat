'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { getWorkshops, type Workshop } from '@/firebase/getWorkshops';
import { deleteWorkshop } from '@/firebase/deleteWorkshop';

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getWorkshops();
      setWorkshops(data);
    })();
    const unsub = onAuthStateChanged(auth, user => setIsAdmin(!!user));
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this workshop?')) {
      await deleteWorkshop(id);
      setWorkshops(prev => prev.filter(w => w.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Upcoming Workshops</h1>
      {workshops.length === 0 ? (
        <p className="text-gray-500">No workshops currently listed.</p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2">
          {workshops.map(workshop => (
            <div key={workshop.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
              <Image
                src={workshop.imageUrl}
                alt={workshop.title}
                width={800}
                height={400}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold">{workshop.title}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  {workshop.date.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-gray-500 mb-3">{workshop.venue}</p>
                <p className="mb-4">{workshop.description}</p>
                <a
                  href={workshop.signupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800"
                >
                  Sign up
                </a>
                {isAdmin && (
                  <div className="flex gap-4 mt-2">
                    <button onClick={() => router.push(`/admin/workshops/edit/${workshop.id}`)}>Edit</button>
                    <button onClick={() => handleDelete(workshop.id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
