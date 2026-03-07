import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3000

const app = express()

// ── Static files (Vite build output) ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')))

// ── SPA fallback ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Concordia frontend listening on port ${PORT}`)
})
