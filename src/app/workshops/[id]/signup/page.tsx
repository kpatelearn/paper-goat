'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase.config';
import { addWorkshopSignup } from '@/firebase/addWorkshopSignup';
import WorkshopSignUpForm, { SignUpFormValues } from '@/components/WorkshopSignUpForm';

export default function WorkshopSignupPage() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'workshops', id));
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title || '');
      }
      setLoading(false);
    };
    if (id) load();
  }, [id]);

  const handleSubmit = async (values: SignUpFormValues) => {
    if (!id) return;
    await addWorkshopSignup(id, values);
    setMessage('Thanks for signing up!');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Sign Up for {title}</h1>
      {message ? (
        <p>{message}</p>
      ) : (
        <WorkshopSignUpForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
