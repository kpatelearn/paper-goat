'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/shows', label: 'Shows' },
  { href: '/workshops', label: 'Workshops' },
  { href: 'https://papergoat.digitees.co.nz', label: '🛍️ Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/login', label: 'Admin' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const items = links.map((link) => (
    <Link key={link.href} href={link.href} className="menu-btn" onClick={() => setOpen(false)}>
      {link.label}
    </Link>
  ));

  return (
    <header className="w-full py-4 px-6 bg-goat-black/80 backdrop-blur-md shadow-lg text-white relative">
      <div className="container flex-between items-center">
        <Link href="/" className="text-xl font-bold logo-text">
          🐐 Paper Goat
        </Link>
        <button
          className="md:hidden p-2 rounded focus-ring"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <nav className="hidden md:flex gap-3 text-sm mobile-stack">{items}</nav>
      </div>
      {open && <nav className="mobile-menu-overlay md:hidden">{items}</nav>}
    </header>
  );
}