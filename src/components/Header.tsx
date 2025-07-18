'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-md shadow-sm text-goat-blue">
      <div className="container flex-between items-center">
        <Link href="/" className="text-xl font-bold logo-text">
          🐐 Paper Goat
        </Link>
        <nav className="flex gap-6 text-sm mobile-stack">
          <Link href="/shows" className="hover:underline">
            Shows
          </Link>
          <Link href="/workshops" className="hover:underline">
            Workshops
          </Link>
          <Link href="https://papergoat.digitees.co.nz" className="hover:underline">
            🛍️ Shop
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/login" className="hover:underline">
            Admin Login
          </Link>

        </nav>
      </div>
    </header>
  );
}
