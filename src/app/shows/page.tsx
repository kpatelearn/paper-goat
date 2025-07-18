'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { getShows, type Show } from '@/firebase/getShows';
import { deleteShow } from '@/firebase/deleteShow';

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 800 });
    (async () => {
      const data = await getShows();
      setShows(data);
    })();
    const unsub = onAuthStateChanged(auth, user => setIsAdmin(!!user));
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this show?')) {
      await deleteShow(id);
      setShows(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-display-md heading-brand mb-8">Upcoming Shows</h1>
      {shows.length === 0 ? (
        <p className="text-gray-500">No shows currently listed.</p>
      ) : (
        <div className="grid-auto-fit">
            {shows.map(show => (
              <div
                key={show.id}
                className="card card-hover"
                data-aos="fade-up"
              >
              <Image
                src={show.imageUrl}
                alt={show.title}
                width={800}
                height={400}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold">{show.title}</h2>
                <p className="text-sm text-gray-500 mb-1">{show.date}</p>
                <p className="text-sm text-gray-500 mb-3">{show.venue}</p>
                <p className="mb-4">{show.description}</p>
                <a
                  href={show.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Get Tickets
                </a>
                {isAdmin && (
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => router.push(`/admin/shows/edit/${show.id}`)}
                      className="btn btn-accent btn-sm"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(show.id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
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
