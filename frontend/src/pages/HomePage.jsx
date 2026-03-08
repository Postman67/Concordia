export default function HomePage() {
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
          <a
            href="https://app.concordiachat.com"
            className="w-full sm:w-auto px-10 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-md text-center"
          >
            Open Concordia
          </a>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-white border-t border-gray-100 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-indigo-400 text-xs uppercase tracking-widest font-semibold mb-14">
            What makes Concordia different
          </p>
          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-14 text-center">
            {[
              {
                icon: String.fromCodePoint(0x1F511),
                title: 'One identity, every server',
                body: 'Register a single global username. It works across every Concordia server — no separate accounts, no impersonation.',
              },
              {
                icon: String.fromCodePoint(0x1F5A5),
                title: 'Real servers',
                body: 'Servers are actual hardware — bare metal or virtualised. Self-host at home, run in the cloud, or anything in between.',
              },
              {
                icon: String.fromCodePoint(0x1F310),
                title: 'Federated by design',
                body: 'Servers talk directly to each other. Share emotes, messages, and channels across instances without a central authority.',
              },
              {
                icon: String.fromCodePoint(0x1F5C4),
                title: 'Your data, your rules',
                body: 'Every byte lives on your server. Full message history, large uploads, unlimited custom emotes — stored exactly where you decide.',
              },
              {
                icon: String.fromCodePoint(0x1F513),
                title: 'No gatekeepers',
                body: 'No single company owns the network. Any server can join or leave freely, and the communities you build always belong to you.',
              },
              {
                icon: String.fromCodePoint(0x1F4D6),
                title: 'Fully open source',
                body: 'Every line of code is public. Audit it, fork it, self-host it, or contribute — Concordia has nothing to hide.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <span className="text-4xl">{icon}</span>
                <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-100 py-10 px-4 text-xs text-gray-400">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span>{'\u00A9'} {new Date().getFullYear()} Concordia Federation</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: 'Concordia', href: 'https://github.com/Postman67/Concordia' },
              { label: 'Federation', href: 'https://github.com/Postman67/Concordia-Federation' },
              { label: 'Client', href: 'https://github.com/Postman67/Concordia-Client' },
              { label: 'Server', href: 'https://github.com/Postman67/Concordia-Server' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 transition-colors"
              >
                GitHub — {label}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}