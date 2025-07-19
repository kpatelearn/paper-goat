'use client';

export interface SignupRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export default function WorkshopSignupsTable({ signups }: { signups: SignupRecord[] }) {
  if (signups.length === 0) {
    return <p>No signups yet.</p>;
  }

  return (
    <table className="min-w-full border border-collapse">
      <thead>
        <tr>
          <th className="border p-2">First</th>
          <th className="border p-2">Last</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone</th>
        </tr>
      </thead>
      <tbody>
        {signups.map(s => (
          <tr key={s.id}>
            <td className="border p-2">{s.firstName}</td>
            <td className="border p-2">{s.lastName}</td>
            <td className="border p-2">{s.email}</td>
            <td className="border p-2">{s.phone || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
