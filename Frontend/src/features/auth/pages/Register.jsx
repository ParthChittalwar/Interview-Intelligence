import React from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault()
  }

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-white font-semibold shadow-sm transition hover:bg-sky-700"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">Already have an account? <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700 transition">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register
