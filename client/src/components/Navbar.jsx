import { FaUserCircle, FaBriefcase, FaSignOutAlt } from "react-icons/fa"
import { Link, useNavigate, useLocation } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 dark:text-blue-400 font-medium"
      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex justify-between items-center sticky top-0 z-10">

      <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
        <FaBriefcase />
        TrackMate
      </h1>

      <div className="flex items-center gap-5 text-sm">
        <Link to="/" className={isActive("/")}>
          Dashboard
        </Link>
        <Link to="/analytics" className={isActive("/analytics")}>
          Analytics
        </Link>
        <Link to="/profile" className={`flex items-center gap-1 ${isActive("/profile")}`}>
          <FaUserCircle />
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </nav>
  )
}

export default Navbar