export default function Footer() {
  return (
    <footer className="bg-goat-black/80 backdrop-blur-md text-white py-8 text-sm mt-12">
      <div className="container flex-between items-center gap-4 mobile-stack">
        <p>&copy; {new Date().getFullYear()} Paper Goat. Powered by improv & goats.</p>
        <div className="flex gap-4">
          <a className="hover:text-goat-yellow" href="https://www.facebook.com/PaperGoatNz" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
          <a className="hover:text-goat-yellow" href="https://www.instagram.com/papergoatnz/" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
        </div>
      </div>
    </footer>
  );
}
