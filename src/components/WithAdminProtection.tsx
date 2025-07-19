import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase.config';
import { useAdmin } from '@/hooks/useAdmin';

const WithAdminProtection = <P extends object>(Component: React.ComponentType<P>) => {
  const AdminProtectedComponent = (props: P) => {
    const { isAdmin, loading } = useAdmin();
    const router = useRouter();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAdmin) {
      const handleRetry = async () => {
        await signOut(auth);
        router.push('/login');
      };

      return (
        <div className="text-center mt-20 space-y-4">
          <p className="text-red-600 font-bold text-lg">
            Access denied. You are not an admin.
          </p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-goat-blue text-white rounded hover:bg-goat-pink transition"
          >
            Sign Out and Try Again
          </button>
        </div>
      );
    }

    return <Component {...props} />;
  };

  return AdminProtectedComponent;
};

export default WithAdminProtection;
