import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <span className="mb-4 inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
          Real-time · Federated · Open
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl">
          Chat freely.{' '}
          <span className="text-indigo-600">Stay connected across the federation.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-xl">
          Concordia is a real-time, decentralized chat and social platform.
          Join servers, message friends, and own your identity — across the entire federation.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
              >
                Create an account
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl border border-indigo-200 hover:border-indigo-400 transition-colors shadow-sm"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </main>

      {/* Feature grid */}
      <section className="bg-white border-t border-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: '�',
              title: 'Real-time messaging',
              body: 'Instant messages, channels, and direct conversations — built for speed and delivered live across every node in the network.',
            },
            {
              icon: '🌐',
              title: 'Truly federated',
              body: 'No single company controls the network. Servers talk to each other directly, so your communities stay online and independent.',
            },
            {
              icon: '🔐',
              title: 'You own your identity',
              body: 'One account works across every Concordia server. Your profile, your data, your rules — secured with end-to-end signed tokens.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <span className="text-4xl">{icon}</span>
              <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} Concordia Federation
      </footer>
    </div>
  )
}
