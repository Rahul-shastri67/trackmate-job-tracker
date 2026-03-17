import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import {
  FaUser, FaEnvelope, FaLock, FaBriefcase,
  FaEye, FaEyeSlash, FaCheckCircle
} from "react-icons/fa"

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields")
      return false
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const handleSignup = async () => {
    if (!validate()) return

    try {
      setLoading(true)
      setError("")

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      )

      navigate("/login", { state: { signedUp: true } })

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignup()
  }

  const passwordMatch =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 py-8">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-500 text-white p-3 rounded-xl mb-3">
              <FaBriefcase className="text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Start tracking your job applications
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name
            </label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
              <FaUser className="text-gray-400 text-sm shrink-0" />
              <input
                name="name"
                placeholder="Rahul Shastri"
                value={form.name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full p-2.5 outline-none bg-transparent text-sm text-black dark:text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
              <FaEnvelope className="text-gray-400 text-sm shrink-0" />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full p-2.5 outline-none bg-transparent text-sm text-black dark:text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
              <FaLock className="text-gray-400 text-sm shrink-0" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
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

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Confirm Password
            </label>
            <div className={`flex items-center gap-2 border rounded-lg px-3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition
              ${passwordMatch
                ? "border-green-400 dark:border-green-600"
                : "border-gray-300 dark:border-gray-700"
              }`}
            >
              <FaLock className="text-gray-400 text-sm shrink-0" />
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full p-2.5 outline-none bg-transparent text-sm text-black dark:text-white placeholder-gray-400"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                {passwordMatch && (
                  <FaCheckCircle className="text-green-500 text-sm" />
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirm(prev => !prev)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium text-sm transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Signup