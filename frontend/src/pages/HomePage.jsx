import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero SVG banner */}
      <section className="w-full">
        <img
          src="/branding/Hero - Indigo.svg"
          alt="Concordia - Talk free"
          className="w-full h-auto block"
          draggable={false}
        />
      </section>

      {/* CTA strip */}
      <section className="bg-indigo-600 py-10 px-4">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
          {user ? (
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-10 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-md text-center"
            >
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="w-full sm:w-auto px-10 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-md text-center"
              >
                Create account
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-10 py-3 bg-transparent text-white font-bold rounded-xl border-2 border-white/60 hover:border-white hover:bg-white/10 transition-colors text-center"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-white border-t border-gray-100 py-20 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: String.fromCodePoint(0x1F4AC),
              title: 'Real-time messaging',
              body: 'Instant messages, channels, and direct conversations built for speed and delivered live across every node in the network.',
            },
            {
              icon: String.fromCodePoint(0x1F310),
              title: 'Truly federated',
              body: 'No single company controls the network. Servers talk to each other directly so your communities stay online and independent.',
            },
            {
              icon: String.fromCodePoint(0x1F511),
              title: 'You own your identity',
              body: 'One account works across every Concordia server. Your profile, your data, your rules secured with signed tokens.',
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <span className="text-4xl">{icon}</span>
              <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-xs text-gray-400 border-t border-gray-100">
        {'\u00A9'} {new Date().getFullYear()} Concordia Federation
      </footer>

    </div>
  )
}