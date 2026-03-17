import {
  FaTrash, FaEdit, FaTimes, FaBuilding, FaBriefcase,
  FaLink, FaMapMarkerAlt, FaCalendarAlt, FaStickyNote
} from "react-icons/fa"
import { deleteJob, updateJob } from "../api/jobs"
import { useState } from "react"

const STATUS_COLORS = {
  Applied: "bg-yellow-500",
  Interview: "bg-blue-500",
  Offer: "bg-green-500",
  Rejected: "bg-red-500",
}

const STATUS_OPTIONS = ["Applied", "Interview", "Offer", "Rejected"]

function ExternalLink({ url }) {
  if (!url) return null
  return (
    
    <a  href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-blue-500 hover:underline"
    >
      <FaLink /> Job Link
    </a>
  )
}

function JobList({ jobs, refreshJobs }) {
  const [editJob, setEditJob] = useState(null)
  const [form, setForm] = useState({})

  const openEdit = (job) => {
    setEditJob(job)
    setForm({
      company: job.company || "",
      position: job.position || "",
      status: job.status || "Applied",
      location: job.location || "",
      jobLink: job.jobLink || "",
      interviewDate: job.interviewDate
        ? new Date(job.interviewDate).toISOString().split("T")[0]
        : "",
      notes: job.notes || "",
    })
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return
    await deleteJob(id)
    refreshJobs()
  }

  const handleUpdate = async () => {
    await updateJob(editJob._id, form)
    setEditJob(null)
    refreshJobs()
  }

  const handleStatusChange = async (id, status) => {
    await updateJob(id, { status })
    refreshJobs()
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    })
  }

  return (
    <div className="mt-8">

      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
        Your Applications
      </h2>

      {jobs.length === 0 && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          <FaBriefcase className="text-4xl mx-auto mb-3 opacity-30" />
          <p>No jobs added yet. Start tracking!</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {jobs.map((job) => {
          return (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-4 hover:shadow-lg transition border border-gray-100 dark:border-gray-800"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg text-black dark:text-white">
                      {job.company}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-white text-xs ${STATUS_COLORS[job.status] || "bg-gray-500"}`}>
                      {job.status}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">
                    {job.position}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500 dark:text-gray-400">

                    {job.location && (
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {job.location}
                      </span>
                    )}

                    {job.interviewDate && (
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> {formatDate(job.interviewDate)}
                      </span>
                    )}

                    <ExternalLink url={job.jobLink} />

                    <span className="flex items-center gap-1">
                      Added: {formatDate(job.createdAt)}
                    </span>

                  </div>

                  {job.notes && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1">
                      <FaStickyNote className="mt-0.5 shrink-0" />
                      <span className="line-clamp-2">{job.notes}</span>
                    </p>
                  )}
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => openEdit(job)}
                    className="flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition flex-1 sm:flex-none"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition flex-1 sm:flex-none"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                  className="w-full sm:w-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 text-sm rounded-lg"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )
        })}
      </div>

      {editJob && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold">Edit Job</h2>
              <button
                onClick={() => setEditJob(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl p-1"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex flex-col gap-3">

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Company</label>
                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800">
                  <FaBuilding className="text-gray-400 text-sm shrink-0" />
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleFormChange}
                    placeholder="Company"
                    className="w-full p-2 outline-none bg-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Position</label>
                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800">
                  <FaBriefcase className="text-gray-400 text-sm shrink-0" />
                  <input
                    name="position"
                    value={form.position}
                    onChange={handleFormChange}
                    placeholder="Position"
                    className="w-full p-2 outline-none bg-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-lg text-sm"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Location</label>
                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800">
                  <FaMapMarkerAlt className="text-gray-400 text-sm shrink-0" />
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleFormChange}
                    placeholder="Location (optional)"
                    className="w-full p-2 outline-none bg-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Job Link</label>
                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800">
                  <FaLink className="text-gray-400 text-sm shrink-0" />
                  <input
                    name="jobLink"
                    value={form.jobLink}
                    onChange={handleFormChange}
                    placeholder="Job URL (optional)"
                    className="w-full p-2 outline-none bg-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Interview Date</label>
                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800">
                  <FaCalendarAlt className="text-gray-400 text-sm shrink-0" />
                  <input
                    type="date"
                    name="interviewDate"
                    value={form.interviewDate}
                    onChange={handleFormChange}
                    className="w-full p-2 outline-none bg-transparent text-sm dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleFormChange}
                  placeholder="Notes (optional)"
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-lg text-sm outline-none resize-none"
                />
              </div>

            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditJob(null)}
                className="flex-1 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default JobList