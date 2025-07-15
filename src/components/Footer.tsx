export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 mt-12 bg-gray-100 text-gray-600 text-sm border-t border-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Paper Goat. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://www.facebook.com/PaperGoatNz" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://www.instagram.com/papergoatnz/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
