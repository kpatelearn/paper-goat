'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase.config';
import WithAdminProtection from '@/components/WithAdminProtection';
import WorkshopDropdown, { WorkshopOption } from '@/components/WorkshopDropdown';
import WorkshopSignupsTable, { SignupRecord } from '@/components/WorkshopSignupsTable';

function WorkshopSignupsDashboard() {
  const [workshops, setWorkshops] = useState<WorkshopOption[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [signups, setSignups] = useState<SignupRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWorkshops = async () => {
      const snap = await getDocs(collection(db, 'workshops'));
      const list: WorkshopOption[] = [];
      snap.forEach(doc => {
        const data = doc.data();
        list.push({ id: doc.id, title: data.title || doc.id });
      });
      setWorkshops(list);
    };
    loadWorkshops();
  }, []);

  const loadSignups = async (id: string) => {
    setSelectedId(id);
    if (!id) { setSignups([]); return; }
    setLoading(true);
    const snap = await getDocs(collection(db, 'workshops', id, 'signups'));
    const list: SignupRecord[] = [];
    snap.forEach(doc => {
      const data = doc.data();
      list.push({
        id: doc.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
      });
    });
    setSignups(list);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Workshop Signups</h1>
      <WorkshopDropdown workshops={workshops} value={selectedId} onChange={loadSignups} />
      {loading ? <p className="mt-4">Loading...</p> : <div className="mt-4"><WorkshopSignupsTable signups={signups} /></div>}
    </div>
  );
}

export default WithAdminProtection(WorkshopSignupsDashboard);
