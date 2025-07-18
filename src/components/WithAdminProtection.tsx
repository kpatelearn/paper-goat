import React from 'react';
import { useAdmin } from '@/hooks/useAdmin';


const WithAdminProtection = <P extends object>(Component: React.ComponentType<P>) => {
  const AdminProtectedComponent = (props: P) => {
    const { isAdmin, loading } = useAdmin();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAdmin) {
      return <div className="text-red-600 font-bold">Access denied. You are not an admin.</div>;
    }

    return <Component {...props} />;
  };

  return AdminProtectedComponent;
};

export default WithAdminProtection;
