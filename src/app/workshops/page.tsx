'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
    AOS.init({ duration: 800 });
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
            <div key={workshop.id} className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg" data-aos="fade-up">
              <Image
                src={workshop.imageUrl}
                alt={workshop.title}
                width={800}
                height={400}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{workshop.title}</h2>
                <p className="text-sm text-gray-500">{workshop.venue}</p>
                <p className="mb-4">{workshop.description}</p>
                <a
                  href={workshop.signupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-goat-pink text-white text-sm font-medium rounded hover:bg-pink-700"
                >
                  Sign up
                </a>
                {isAdmin && (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => router.push(`/admin/workshops/edit/${workshop.id}`)}
                      className="px-4 py-1 bg-goat-yellow text-black rounded-md text-sm hover:bg-yellow-400 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(workshop.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
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
