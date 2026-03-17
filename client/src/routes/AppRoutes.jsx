import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import Layout from "../components/Layout"
import DashboardStats from "../components/DashboardStats"
import JobForm from "../components/JobForm"
import JobList from "../components/JobList"
import JobFilter from "../components/JobFilter"
import JobSearch from "../components/JobSearch"
import JobChart from "../components/JobChart"
import ProtectedRoute from "../components/ProtectedRoute"

import Profile from "../pages/Profile"
import Analytics from "../pages/Analytics"
import Login from "../pages/Login"
import Signup from "../pages/Signup"

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-bounce">
      {message}
    </div>
  )
}

function Dashboard({ jobs, refreshJobs, setFilter, setSearch, loading }) {
  return (
    <Layout>
      <div className="space-y-5">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Organize · Apply · Achieve 🚀
          </p>
        </div>

        <DashboardStats jobs={jobs} />

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <JobSearch setSearch={setSearch} />
          </div>
          <JobFilter setFilter={setFilter} jobs={jobs} />
        </div>

        <JobForm refreshJobs={refreshJobs} />

        {loading ? (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
            Loading jobs...
          </div>
        ) : (
          <JobList jobs={jobs} refreshJobs={refreshJobs} />
        )}

        <JobChart jobs={jobs} />

      </div>
    </Layout>
  )
}

function AppRoutes({ jobs = [], refreshJobs, setFilter, setSearch, loading = false }) {
  const location = useLocation()
  const [toast, setToast] = useState("")

  useEffect(() => {
    if (location.state?.signedUp) {
      setToast("Account created! Please login 🎉")
    }
  }, [location.state])

  return (
    <>
      {toast && (
        <Toast message={toast} onClose={() => setToast("")} />
      )}

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard
                jobs={jobs}
                refreshJobs={refreshJobs}
                setFilter={setFilter}
                setSearch={setSearch}
                loading={loading}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics jobs={jobs} />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default AppRoutes