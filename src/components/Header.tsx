'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-goat-black/80 backdrop-blur-md shadow-lg text-white">
      <div className="container flex-between items-center">
        <Link href="/" className="text-xl font-bold logo-text">
          🐐 Paper Goat
        </Link>
        <nav className="flex gap-3 text-sm mobile-stack">
          <Link href="/shows" className="menu-btn">
            Shows
          </Link>
          <Link href="/workshops" className="menu-btn">
            Workshops
          </Link>
          <Link href="https://papergoat.digitees.co.nz" className="menu-btn">
            🛍️ Shop
          </Link>
          <Link href="/blog" className="menu-btn">
            Blog
          </Link>
          <Link href="/login" className="menu-btn">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}