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
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
