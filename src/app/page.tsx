"use client";
// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-goat-beige text-goat-blue px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-xl" data-aos="fade-up">
        <Image src="/images/logo.png" alt="Paper Goat Logo" width={240} height={240} className="mb-6 mx-auto" />
        <h1 className="text-4xl font-bold mb-4 logo-text">Paper Goat</h1>
        <p className="text-lg text-goat-black mb-6">
          Social enterprise creating opportunities for NZ performers to develop their craft and give audiences greater access to creative, engaging performances.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="https://www.facebook.com/PaperGoatNz" target="_blank" className="text-goat-pink hover:underline">Facebook</Link>
          <Link href="https://www.instagram.com/papergoatnz/" target="_blank" className="text-goat-pink hover:underline">Instagram</Link>
        </div>
        <p className="mt-8 text-sm text-gray-500">Upcoming shows, workshops, blog, and shop coming soon.</p>
      </div>
    </main>
  );
}
