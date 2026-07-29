import Reac,{ useState } from 'react'
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

  const navigate = useNavigate()
  const { loading,handleRegister } = useAuth()

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({username,email,password})
    navigate("/")
  }

  if(loading){
    return <h1>Loading...</h1>
  }


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
