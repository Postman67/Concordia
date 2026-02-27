import axios from 'axios'

const BASE_URL = import.meta.env.VITE_FEDERATION_BASE_URL
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT to every request if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Auth ────────────────────────────────────────────────────────────────────

/**
 * Register a new account.
 * @param {{ username: string, email: string, password: string }} data
 */
export async function register(data) {
  const res = await client.post('/api/auth/register', data)
  return res.data          // { message, token, user }
}

/**
 * Log in with email + password.
 * @param {{ email: string, password: string }} data
 */
export async function login(data) {
  const res = await client.post('/api/auth/login', data)
  return res.data          // { message, token, user }
}

// ── User / Profile ───────────────────────────────────────────────────────────
// These endpoints follow the pattern implied by the Federation API.
// Adjust paths if the server exposes them under a different prefix.

/**
 * Fetch the currently authenticated user's profile.
 * Requires a valid JWT stored in localStorage.
 */
export async function getProfile() {
  const res = await client.get('/api/user/me')
  return res.data          // { id, username, email, created_at, updated_at }
}

/**
 * Update the currently authenticated user's profile.
 * @param {{ username?: string, email?: string, password?: string }} data
 */
export async function updateProfile(data) {
  const res = await client.put('/api/user/me', data)
  return res.data          // { message, user }
}

// ── Health ───────────────────────────────────────────────────────────────────

export async function healthCheck() {
  const res = await client.get('/health')
  return res.data
}
