import React,{useState,useEffect,useRef} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

  const { loading,handleLogin } = useAuth()
  const navigate = useNavigate()
  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [errors,setErrors] = useState({})
  const [submitError,setSubmitError] = useState("")
  const isMounted = useRef(true)

  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await handleLogin({ email, password });

    navigate("/", { replace: true });

  } catch (error) {
    setSubmitError(error?.message || "Login failed");
  }
}

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-sky-50 to-slate-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-4xl border border-slate-200 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.4)] p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to continue to your dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-rose-600">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-100"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-rose-600">{errors.password}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="remember" className="text-sm text-slate-600">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-white font-semibold shadow-lg shadow-sky-200/50 transition hover:bg-sky-700"
          >
            Login
          </button>
          {submitError && (
            <p className="text-sm text-rose-600">{submitError}</p>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?
          <Link to="/register" className="ml-1 font-medium text-sky-600 hover:text-sky-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
