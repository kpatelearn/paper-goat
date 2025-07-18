'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          🐐 Paper Goat
        </Link>
        <nav className="flex gap-6 text-sm text-gray-700">
          <Link href="/shows" className="hover:underline">
            Shows
          </Link>
          <Link href="/workshops" className="hover:underline">
            Workshops
          </Link>
          <Link href="https://papergoat.digitees.co.nz" className="hover:underline">
            Shop
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/login" className="hover:underline">
            Admin Login
          </Link>
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
