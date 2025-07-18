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
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 gap-12 page-transition">
        <div className="card card-hover text-goat-blue p-6 max-w-xl mx-auto text-center" data-aos="fade-up">
          <Image src="/images/logo.png" alt="Paper Goat Logo" width={200} height={200} className="mb-6 mx-auto" />
          <h1 className="text-display-md mb-4 logo-text text-center">Paper Goat</h1>
          <p className="text-body-lg text-center text-goat-black mb-6">
            Social enterprise creating opportunities for NZ performers to develop their craft and give audiences greater access to creative, engaging performances.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              href="https://www.facebook.com/PaperGoatNz" 
              target="_blank" 
              className="btn-social btn-facebook"
            >
              Facebook
            </Link>
            <Link 
              href="https://www.instagram.com/papergoatnz/" 
              target="_blank" 
              className="btn-social btn-instagram"
            >
              Instagram
            </Link>
          </div>
        </div>
            <section className="bg-goat-accent text-white py-12 w-full">
          <div className="max-w-4xl mx-auto text-center px-4" data-aos="fade-up">
            <h2 className="text-heading-lg mb-4 heading-brand">Upcoming Shows</h2>
            <p className="text-body-md mb-6">Catch our next performances around NZ.</p>
            <Link href="/shows" className="btn btn-primary">
              View Shows
            </Link>
          </div>
        </section>
        
        <section className="bg-goat-blue text-white py-12 w-full">
          <div className="max-w-4xl mx-auto text-center px-4" data-aos="fade-up">
            <h2 className="text-heading-lg mb-4 heading-brand">Upcoming Workshops</h2>
            <p className="text-body-md mb-6">Learn, rehearse, and perform with Paper Goat.</p>
            <Link href="/workshops" className="btn btn-accent">
              View Workshops
            </Link>
          </div>
        </section>
        
    
      </main>
  );
}