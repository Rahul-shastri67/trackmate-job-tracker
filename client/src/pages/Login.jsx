import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { FaEnvelope, FaLock, FaBriefcase, FaEye, FaEyeSlash } from "react-icons/fa"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      setLoading(true)
      setError("")

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      navigate("/")

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-500 text-white p-3 rounded-xl mb-3">
              <FaBriefcase className="text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Login to your TrackMate account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
              <FaEnvelope className="text-gray-400 text-sm shrink-0" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2.5 outline-none bg-transparent text-sm text-black dark:text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
              <FaLock className="text-gray-400 text-sm shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2.5 outline-none bg-transparent text-sm text-black dark:text-white placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 shrink-0"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium text-sm transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Sign up free
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login