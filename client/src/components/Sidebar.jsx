import { Link, useLocation } from "react-router-dom"
import {
  FaUserCircle, FaMoon, FaSun,
  FaChartBar, FaTachometerAlt, FaTimes
} from "react-icons/fa"
import { useState, useEffect } from "react"

function Sidebar({ onClose }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const location = useLocation()

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const navLink = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition
    ${location.pathname === path
      ? "bg-blue-500 text-white"
      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`

  return (
    <div className="w-64 flex flex-col justify-between h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 px-4 py-6">

      {/* Top */}
      <div>
        {/* Header with close btn on mobile */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            TrackMate
          </h1>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden text-gray-500 dark:text-gray-400 text-xl"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          <Link to="/" className={navLink("/")} onClick={onClose}>
            <FaTachometerAlt />
            Dashboard
          </Link>
          <Link to="/analytics" className={navLink("/analytics")} onClick={onClose}>
            <FaChartBar />
            Analytics
          </Link>
        </nav>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-3xl text-blue-500" />
          )}
          <div>
            <p className="font-semibold text-gray-800 dark:text-white text-sm">
              {user.name || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Developer
            </p>
          </div>
        </Link>
      </div>

    </div>
  )
}

export default Sidebar