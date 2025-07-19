// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Paper Goat',
  description: 'Social enterprise creating opportunities for NZ performers.',
  icons: {
    icon: '/images/favicon.ico', // adjust if using .png or .svg
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=DM+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-goat-blue text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <div className="goat-watermark">🐐</div>
      </body>
    </html>
  );
}
