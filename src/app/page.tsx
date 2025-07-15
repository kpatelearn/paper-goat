// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4 py-12">
      <Image
        src="/images/logo.png"
        alt="Paper Goat Logo"
        width={240}
        height={240}
        className="mb-6"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Paper Goat
      </h1>

      <p className="text-lg md:text-xl text-center max-w-2xl mb-6">
        Social enterprise creating opportunities for NZ performers to develop their craft and give audiences greater access to creative, engaging performances.
      </p>

      <div className="flex gap-6">
        <Link
          href="https://www.facebook.com/PaperGoatNz"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Facebook
        </Link>
        <Link
          href="https://www.instagram.com/papergoatnz/"
          target="_blank"
          className="text-pink-600 hover:underline"
        >
          Instagram
        </Link>
      </div>

      {/* Placeholder for future sections */}
      <div className="mt-12 text-gray-500 text-sm">
        Upcoming shows, workshops, blog, and shop coming soon.
      </div>
    </main>
  );
}
