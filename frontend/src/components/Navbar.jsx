import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Wordmark logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/branding/Wordmark - Indigo.svg"
            alt="Concordia"
            className="h-9 w-auto"
            draggable={false}
          />
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="https://app.concordiachat.com"
            className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Open App
          </a>
        </div>

      </div>
    </nav>
  )
}
