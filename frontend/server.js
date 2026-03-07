import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT || 3000
let FEDERATION_BASE_URL = process.env.FEDERATION_BASE_URL

if (!FEDERATION_BASE_URL) {
  console.error('ERROR: FEDERATION_BASE_URL environment variable is not set.')
  process.exit(1)
}

// Ensure the URL has a scheme — Railway internal hostnames have none by default
if (!/^https?:\/\//i.test(FEDERATION_BASE_URL)) {
  FEDERATION_BASE_URL = `http://${FEDERATION_BASE_URL}`
}

// Append port if provided and not already in the URL
const FEDERATION_PORT = process.env.FEDERATION_PORT
if (FEDERATION_PORT) {
  const parsed = new URL(FEDERATION_BASE_URL)
  if (!parsed.port) {
    parsed.port = FEDERATION_PORT
    FEDERATION_BASE_URL = parsed.origin
  }
}

const app = express()

// ── Proxy: forward /api and /health to the Federation service ────────────────
// Uses Node 18+ native fetch — no external proxy dependency needed.
async function proxyToFederation(req, res) {
  const url = `${FEDERATION_BASE_URL}${req.originalUrl}`

  // Forward the original body as a raw buffer so content-type is preserved
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const body = chunks.length > 0 ? Buffer.concat(chunks) : undefined

  // Copy safe request headers; strip hop-by-hop and host headers
  const skipHeaders = new Set(['host', 'connection', 'transfer-encoding', 'te',
    'trailer', 'keep-alive', 'proxy-authorization', 'proxy-authenticate', 'upgrade'])
  const headers = {}
  for (const [k, v] of Object.entries(req.headers)) {
    if (!skipHeaders.has(k.toLowerCase())) headers[k] = v
  }

  try {
    const upstream = await fetch(url, {
      method: req.method,
      headers,
      body: body?.length ? body : undefined,
      // Prevent Node from following redirects automatically
      redirect: 'manual',
    })

    // Forward response status + headers
    res.status(upstream.status)
    for (const [k, v] of upstream.headers.entries()) {
      // Skip hop-by-hop headers
      if (!skipHeaders.has(k.toLowerCase())) res.setHeader(k, v)
    }

    const responseBody = await upstream.arrayBuffer()
    res.end(Buffer.from(responseBody))
  } catch (err) {
    console.error('[proxy] Federation unreachable:', err.message)
    res.status(502).json({ error: 'Federation service unavailable.' })
  }
}

app.use('/api', proxyToFederation)
app.use('/health', proxyToFederation)

// ── Static files (Vite build output) ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')))

// ── SPA fallback: all other GET requests serve index.html ─────────────────────
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Concordia frontend listening on port ${PORT}`)
  console.log(`Proxying Federation API → ${FEDERATION_BASE_URL}`)
})
