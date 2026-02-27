import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT || 3000
const FEDERATION_BASE_URL = process.env.FEDERATION_BASE_URL

if (!FEDERATION_BASE_URL) {
  console.error('ERROR: FEDERATION_BASE_URL environment variable is not set.')
  process.exit(1)
}

const app = express()

// ── Proxy: forward /api and /health to the Federation service ────────────────
const proxy = createProxyMiddleware({
  target: FEDERATION_BASE_URL,
  changeOrigin: true,
  on: {
    error: (err, _req, res) => {
      console.error('[proxy] Federation unreachable:', err.message)
      res.status(502).json({ error: 'Federation service unavailable.' })
    },
  },
})

app.use('/api', proxy)
app.use('/health', proxy)

// ── Static files (Vite build output) ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')))

// ── SPA fallback: all other GET requests serve index.html ─────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Concordia frontend listening on port ${PORT}`)
  console.log(`Proxying Federation API → ${FEDERATION_BASE_URL}`)
})
