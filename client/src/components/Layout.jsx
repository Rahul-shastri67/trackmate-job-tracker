import { useState } from "react"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import { FaBars, FaTimes } from "react-icons/fa"

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen z-30 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main wrapper */}
      <div className="md:ml-64 flex flex-col min-h-screen">

        {/* Mobile topbar */}
        <div className="md:hidden sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <span className="text-base font-bold text-blue-600 dark:text-blue-400">
            TrackMate
          </span>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <FaBars className="text-lg" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 w-full">
          {children}
        </main>

        <Footer />
      </div>

    </div>
  )
}

export default Layout