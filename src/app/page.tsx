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
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 gap-12">
        <div className="bg-white text-goat-blue p-8 rounded-2xl shadow-xl max-w-xl mx-auto text-center card" data-aos="fade-up">
          <Image src="/images/logo.png" alt="Paper Goat Logo" width={240} height={240} className="mb-6 mx-auto" />
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 logo-text text-center">Paper Goat</h1>
          <p className="text-lg md:text-xl font-light leading-relaxed text-center text-goat-black">
            Social enterprise creating opportunities for NZ performers to develop their craft and give audiences greater access to creative, engaging performances.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="https://www.facebook.com/PaperGoatNz" target="_blank" className="text-goat-pink hover:underline">Facebook</Link>
            <Link href="https://www.instagram.com/papergoatnz/" target="_blank" className="text-goat-pink hover:underline">Instagram</Link>
          </div>
          <p className="mt-8 text-sm text-gray-500">Upcoming shows, workshops, blog, and shop coming soon.</p>
        </div>
        <section className="bg-goat-yellow text-goat-black py-12 w-full">
          <div className="max-w-4xl mx-auto text-center px-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-2">Upcoming Workshops</h2>
            <p className="text-md">Learn, rehearse, and perform with Paper Goat.</p>
          </div>
        </section>
        <section className="bg-goat-pink text-white py-12 w-full">
          <div className="max-w-4xl mx-auto text-center px-4" data-aos="fade-up">
            <h2 className="text-2xl font-bold mb-2">Upcoming Shows</h2>
            <p className="text-md">Catch our next performances around NZ.</p>
          </div>
          <div className="bg-goat-blue text-white p-6 rounded-lg font-display text-center shadow-lg">
  🐐 Tailwind is now working!
</div>

        </section>
      </main>
  );
}
