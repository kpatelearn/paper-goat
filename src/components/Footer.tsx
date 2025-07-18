export default function Footer() {
  return (
    <footer className="bg-goat-black text-white py-8 text-sm mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-6">
        <p>&copy; {new Date().getFullYear()} Paper Goat. Powered by improv & goats.</p>
        <div className="flex gap-4">
          <a className="hover:text-goat-yellow" href="https://www.facebook.com/PaperGoatNz" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a className="hover:text-goat-yellow" href="https://www.instagram.com/papergoatnz/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
