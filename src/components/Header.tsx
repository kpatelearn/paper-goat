'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/shows', label: 'Shows' },
  { href: '/workshops', label: 'Workshops' },
  { href: 'https://papergoat.digitees.co.nz', label: '🛍️ Shop' },
  { href: '/blog', label: 'Blog' }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const items = links.map((link) => (
    <Link 
      key={link.href} 
      href={link.href} 
      className="menu-btn" 
      onClick={() => setOpen(false)}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="w-full py-4 px-6 bg-goat-black/80 backdrop-blur-md shadow-lg text-white relative z-50">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-xl font-bold logo-text hover:text-gray-200 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg">
          🐐 Paper Goat
        </Link>
        
        {/* Mobile hamburger button - visible on mobile, hidden on desktop */}
        <button
          className="lg:hidden p-2 rounded focus-ring"
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
        
        {/* Desktop navigation - hidden on mobile, visible on desktop */}
        <nav className="hidden lg:flex gap-3 text-sm">
          {items}
        </nav>
      </div>
      
      {/* Mobile overlay menu - only visible when open and on mobile */}
      {open && (
        <nav className="absolute top-full left-0 right-0 bg-goat-black/95 backdrop-blur-md shadow-lg lg:hidden z-[100]">
          <div className="flex flex-col py-4 px-6 space-y-3">
            {items}
          </div>
        </nav>
      )}
    </header>
  );
}