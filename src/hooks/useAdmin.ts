'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { getFunctions, httpsCallable } from 'firebase/functions';

type AdminStatusResponse = {
  isAdmin: boolean;
};

export function useAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const functions = getFunctions();
          const getAdminStatus = httpsCallable(functions, 'getAdminStatus');
            const result = await getAdminStatus();
            const data = result.data as AdminStatusResponse;
            setIsAdmin(data.isAdmin === true);
             } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAdmin, loading };
}
