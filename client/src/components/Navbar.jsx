import { FaUserCircle, FaBriefcase, FaSignOutAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (

    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
        <FaBriefcase />
        Smart Job Tracker
      </h1>

      <div className="flex items-center gap-6">

        <Link to="/" className="hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600">
          <FaUserCircle />
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500 hover:text-red-700"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </nav>

  )
}

export default Navbar