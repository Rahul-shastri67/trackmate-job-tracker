import { useState } from "react"
import { createJob } from "../api/jobs"
import {
  FaBuilding, FaBriefcase, FaMapMarkerAlt,
  FaLink, FaCalendarAlt, FaStickyNote, FaPlus
} from "react-icons/fa"

function JobForm({ refreshJobs }) {
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    location: "",
    jobLink: "",
    interviewDate: "",
    notes: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createJob(form)
      setForm({
        company: "",
        position: "",
        status: "Applied",
        location: "",
        jobLink: "",
        interviewDate: "",
        notes: "",
      })
      refreshJobs()
    } catch (err) {
      alert("Please login again")
    }
  }

  const inputWrapper = "flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800"
  const inputClass = "w-full p-2.5 outline-none bg-transparent text-sm text-black dark:text-white placeholder-gray-400"
  const iconClass = "text-gray-400 text-sm shrink-0"

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 shadow-lg p-5 rounded-xl text-black dark:text-white border border-gray-100 dark:border-gray-800"
    >
      <h2 className="text-lg font-bold mb-5">
        Add Job Application
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* Company */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Company *
          </label>
          <div className={inputWrapper}>
            <FaBuilding className={iconClass} />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. Google"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Position *
          </label>
          <div className={inputWrapper}>
            <FaBriefcase className={iconClass} />
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Location
          </label>
          <div className={inputWrapper}>
            <FaMapMarkerAlt className={iconClass} />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Bangalore / Remote"
              className={inputClass}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2.5 rounded-lg text-sm"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Job Link */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Job Link
          </label>
          <div className={inputWrapper}>
            <FaLink className={iconClass} />
            <input
              name="jobLink"
              value={form.jobLink}
              onChange={handleChange}
              placeholder="Job posting URL"
              className={inputClass}
            />
          </div>
        </div>

        {/* Interview Date */}
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
            Interview Date
          </label>
          <div className={inputWrapper}>
            <FaCalendarAlt className={iconClass} />
            <input
              type="date"
              name="interviewDate"
              value={form.interviewDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

      </div>

      {/* Notes — full width */}
      <div className="mt-3">
        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
          Notes
        </label>
        <div className="flex items-start gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 pt-1 bg-white dark:bg-gray-800">
          <FaStickyNote className="text-gray-400 text-sm shrink-0 mt-2.5" />
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any notes about this application..."
            rows={3}
            className="w-full p-2 outline-none bg-transparent text-sm text-black dark:text-white placeholder-gray-400 resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
        >
          <FaPlus /> Add Job
        </button>
      </div>

    </form>
  )
}

export default JobForm