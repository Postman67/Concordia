import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import * as api from '../api/federation'

// Small helper to format ISO dates nicely
function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function DashboardPage() {
  const { user, setUser, signOut } = useAuth()

  // ── Edit form state ─────────────────────────────────────────────────────
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    username: user?.username ?? '',
    email: user?.email ?? '',
    password: '',
  })
  const [fieldErrors, setFieldErrors] = useState([])
  const [globalError, setGlobalError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [saving, setSaving] = useState(false)

  const fieldError = (field) => fieldErrors.find((e) => e.field === field)?.message

  const startEditing = () => {
    setForm({ username: user.username, email: user.email, password: '' })
    setFieldErrors([])
    setGlobalError('')
    setSuccessMsg('')
    setEditing(true)
  }

  const cancelEditing = () => {
    setEditing(false)
    setFieldErrors([])
    setGlobalError('')
    setSuccessMsg('')
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setFieldErrors([])
    setGlobalError('')
    setSuccessMsg('')
    setSaving(true)

    try {
      const payload = {
        username: form.username,
        email: form.email,
        ...(form.password ? { password: form.password } : {}),
      }
      const data = await api.updateProfile(payload)
      // updateProfile returns { message, user } — fall back to merging form data
      const updatedUser = data?.user ?? { ...user, ...payload }
      setUser(updatedUser)
      setSuccessMsg(data?.message ?? 'Profile updated successfully.')
      setEditing(false)
    } catch (err) {
      const respData = err.response?.data
      if (respData?.errors) {
        setFieldErrors(respData.errors)
      } else if (respData?.error) {
        setGlobalError(respData.error)
      } else {
        setGlobalError('Something went wrong. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500 text-sm">
            View and manage your Concordia account details.
          </p>
        </div>

        {/* Success banner */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex justify-between items-center">
            <span>{successMsg}</span>
            <button onClick={() => setSuccessMsg('')} className="ml-4 text-green-500 hover:text-green-700 font-bold">✕</button>
          </div>
        )}

        {/* Global error banner */}
        {globalError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex justify-between items-center">
            <span>{globalError}</span>
            <button onClick={() => setGlobalError('')} className="ml-4 text-red-500 hover:text-red-700 font-bold">✕</button>
          </div>
        )}

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Card header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg select-none">
                {user?.username?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user?.username}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            {!editing && (
              <button
                onClick={startEditing}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Edit profile
              </button>
            )}
          </div>

          {/* View mode */}
          {!editing && (
            <dl className="divide-y divide-gray-100">
              {[
                { label: 'User ID', value: user?.id },
                { label: 'Username', value: user?.username },
                { label: 'Email', value: user?.email },
                { label: 'Member since', value: formatDate(user?.created_at) },
                { label: 'Last updated', value: formatDate(user?.updated_at) },
              ].map(({ label, value }) => (
                <div key={label} className="px-6 py-4 flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-500 w-36">{label}</dt>
                  <dd className="text-sm text-gray-900 text-right">{value ?? '—'}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* Edit mode */}
          {editing && (
            <form onSubmit={handleSave} noValidate className="px-6 py-6 space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-username">
                  Username
                </label>
                <input
                  id="edit-username"
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                    fieldError('username') ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {fieldError('username') && (
                  <p className="mt-1 text-xs text-red-600">{fieldError('username')}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-email">
                  Email
                </label>
                <input
                  id="edit-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                    fieldError('email') ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {fieldError('email') && (
                  <p className="mt-1 text-xs text-red-600">{fieldError('email')}</p>
                )}
              </div>

              {/* New password (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-password">
                  New password{' '}
                  <span className="text-gray-400 font-normal">(leave blank to keep current)</span>
                </label>
                <input
                  id="edit-password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                    fieldError('password') ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {fieldError('password') && (
                  <p className="mt-1 text-xs text-red-600">{fieldError('password')}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Danger zone */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-red-100">
            <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wider">Danger zone</h2>
          </div>
          <div className="px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Sign out</p>
              <p className="text-xs text-gray-500 mt-0.5">End your current session on this device.</p>
            </div>
            <button
              onClick={signOut}
              className="text-sm font-medium text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
