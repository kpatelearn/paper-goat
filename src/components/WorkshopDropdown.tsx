'use client';

export interface WorkshopOption {
  id: string;
  title: string;
}

export default function WorkshopDropdown({
  workshops,
  value,
  onChange,
}: {
  workshops: WorkshopOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <select
      className="border rounded p-2"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">Select workshop</option>
      {workshops.map(w => (
        <option key={w.id} value={w.id}>
          {w.title}
        </option>
      ))}
    </select>
  );
}
