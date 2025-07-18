'use client';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="container py-12">
      <h1 className="text-display-md heading-brand mb-8">Upcoming Workshops</h1>
      {workshops.length === 0 ? (
        <p className="text-gray-500">No workshops currently listed.</p>
      ) : (
        <div className="grid-auto-fit">
          {workshops.map(workshop => (
            <div key={workshop.id} className="card card-hover" data-aos="fade-up">
              <Image
                src={workshop.imageUrl}
                alt={workshop.title}
                width={800}
                height={400}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h2 className="text-heading-lg text-goat-black/80 mb-2">{workshop.title}</h2>
                <p className="text-sm text-gray-500">{workshop.venue}</p>
                <p className="mb-4">{workshop.description}</p>
                <Link href={`/workshops/${workshop.id}/signup`}>
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
                {isAdmin && (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => router.push(`/admin/workshops/edit/${workshop.id}`)}
                      className="btn btn-accent btn-sm"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(workshop.id)}
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
