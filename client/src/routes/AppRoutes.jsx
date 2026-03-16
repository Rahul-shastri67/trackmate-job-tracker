import { Routes, Route } from "react-router-dom"

import Layout from "../components/Layout"
import DashboardStats from "../components/DashboardStats"
import JobForm from "../components/JobForm"
import JobList from "../components/JobList"
import JobFilter from "../components/JobFilter"
import JobSearch from "../components/JobSearch"
import JobChart from "../components/JobChart"

import Profile from "../pages/Profile"
import Analytics from "../pages/Analytics"
import Login from "../pages/Login"
import Signup from "../pages/Signup"

function AppRoutes({ jobs = [], refreshJobs, setFilter, setSearch, handleLogout }) {

  return (
    <Routes>

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* DASHBOARD */}
      <Route
        path="/"
        element={
          <Layout>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-blue-400">
                Organize - Apply - Achieve 🚀
              </h1>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>

            <DashboardStats jobs={jobs} />
            <JobSearch setSearch={setSearch} />
            <JobFilter setFilter={setFilter} />
            <JobForm refreshJobs={refreshJobs} />
            <JobList jobs={jobs} refreshJobs={refreshJobs} />
            <JobChart jobs={jobs} />

          </Layout>
        }
      />

      {/* PROFILE */}
      <Route path="/profile" element={<Profile />} />

      {/* ANALYTICS */}
      <Route path="/analytics" element={<Analytics jobs={jobs} />} />

    </Routes>
  )
}

export default AppRoutes