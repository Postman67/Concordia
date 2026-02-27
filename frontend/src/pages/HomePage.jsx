import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <span className="mb-4 inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
          Welcome to Concordia
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl">
          One account.{' '}
          <span className="text-indigo-600">Everything connected.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-xl">
          Concordia gives you a single, secure identity across the federation.
          Register once and access every connected service seamlessly.
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
              icon: '🔐',
              title: 'Secure by default',
              body: 'Passwords are bcrypt-hashed and JWTs are signed server-side. Your credentials never leave our servers in plain text.',
            },
            {
              icon: '⚡',
              title: 'Federation-ready',
              body: 'One set of credentials works across every service in the Concordia federation — no extra sign-ups required.',
            },
            {
              icon: '🛠️',
              title: 'Manage your profile',
              body: 'Update your username, email, or password any time from your personal dashboard.',
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
