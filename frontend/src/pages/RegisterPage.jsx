import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [errors, setErrors] = useState([])
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const fieldError = (field) => errors.find((e) => e.field === field)?.message

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    setGlobalError('')
    setLoading(true)
    try {
      await signUp(form)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const data = err.response?.data
      if (data?.errors) {
        setErrors(data.errors)
      } else if (data?.error) {
        setGlobalError(data.error)
      } else {
        setGlobalError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
        <p className="text-sm text-gray-500 mb-8">
          One identity. Every server. Join the Concordia federation.
        </p>

        {globalError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                fieldError('username') ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="petersmith"
            />
            {fieldError('username') && (
              <p className="mt-1 text-xs text-red-600">{fieldError('username')}</p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              3–50 characters. Letters, numbers, _ and - only.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                fieldError('email') ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
            />
            {fieldError('email') && (
              <p className="mt-1 text-xs text-red-600">{fieldError('email')}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                fieldError('password') ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            {fieldError('password') && (
              <p className="mt-1 text-xs text-red-600">{fieldError('password')}</p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Min. 8 characters, at least one uppercase letter and one number.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
