'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-goat-blue text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-2xl font-bold logo-text">🐐 Paper Goat</Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/shows" className="hover:text-goat-yellow">Shows</Link>
          <Link href="/workshops" className="hover:text-goat-yellow">Workshops</Link>
          <Link href="https://papergoat.digitees.co.nz" className="hover:text-goat-yellow">Shop</Link>
          <Link href="/blog" className="hover:text-goat-yellow">Blog</Link>
          <Link href="/login" className="hover:text-goat-yellow">Admin Login</Link>
        </nav>
      </div>
    </header>
  );
}
