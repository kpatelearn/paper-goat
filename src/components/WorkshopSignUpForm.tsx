'use client';
import { useState, FormEvent } from 'react';

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export default function WorkshopSignUpForm({ onSubmit }: { onSubmit: (values: SignUpFormValues) => Promise<void>; }) {
  const [values, setValues] = useState<SignUpFormValues>({ firstName: '', lastName: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
  };

  return (
  <form onSubmit={handleSubmit} className="space-y-4">
  <input
    name="firstName"
    placeholder="First Name"
    className="w-full border rounded p-2 text-white bg-goat-black/80"
    value={values.firstName}
    onChange={handleChange}
    required
  />
  <input
    name="lastName"
    placeholder="Last Name"
    className="w-full border rounded p-2 text-white bg-goat-black/80"
    value={values.lastName}
    onChange={handleChange}
    required
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    className="w-full border rounded p-2 text-white bg-goat-black/80"
    value={values.email}
    onChange={handleChange}
    required
  />
  <input
    name="phone"
    placeholder="Phone (optional)"
    className="w-full border rounded p-2 text-white bg-goat-black/80"
    value={values.phone ?? ''}
    onChange={handleChange}
  />
  <button type="submit" disabled={submitting} className="btn btn-primary">
    {submitting ? 'Submitting...' : 'Sign Up'}
  </button>
</form>

  );
}
