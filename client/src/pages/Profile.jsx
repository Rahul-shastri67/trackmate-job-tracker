import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import axios from "axios"
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaUpload, FaSignOutAlt, FaCode, FaFileUpload,
  FaCheckCircle, FaFilePdf, FaExternalLinkAlt
} from "react-icons/fa"

function InputField({ icon, label, name, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
        <span className="text-gray-400 text-sm shrink-0">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2.5 outline-none bg-transparent text-sm text-black dark:text-white placeholder-gray-400"
        />
      </div>
    </div>
  )
}

function Toast({ message, type = "success" }) {
  return (
    <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2
      ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
    >
      <FaCheckCircle />
      {message}
    </div>
  )
}

function Profile() {
  const navigate = useNavigate()
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
  const token = localStorage.getItem("token")

  const [fields, setFields] = useState({
    name:     storedUser.name     || "",
    email:    storedUser.email    || "",
    phone:    storedUser.phone    || "",
    location: storedUser.location || "",
    skills:   storedUser.skills   || "",
  })

  const [profilePic, setProfilePic] = useState(null)
  const [resume, setResume]         = useState(null)
  const [loading, setLoading]       = useState(false)
  const [toast, setToast]           = useState(null)

  const imagePreview = profilePic
    ? URL.createObjectURL(profilePic)
    : storedUser.profilePic

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const uploadProfileImage = async () => {
    if (!profilePic) return storedUser.profilePic
    const formData = new FormData()
    formData.append("profilePic", profilePic)
    const res = await axios.post(
      "http://localhost:5000/api/auth/upload-profile",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return res.data.profilePic
  }

  const uploadResume = async () => {
    if (!resume) return storedUser.resume
    const formData = new FormData()
    formData.append("resume", resume)
    const res = await axios.post(
      "http://localhost:5000/api/auth/upload-resume",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return res.data.resume
  }

  // ==========================
  // Save Profile — DB + localStorage sync
  // ==========================

  const handleSave = async () => {
    try {
      setLoading(true)

      // Step 1 — upload image/resume to cloudinary if changed
      const uploadedImage  = await uploadProfileImage()
      const uploadedResume = await uploadResume()

      // Step 2 — save text fields to DB
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        {
          name:     fields.name,
          email:    fields.email,
          phone:    fields.phone,
          location: fields.location,
          skills:   fields.skills,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Step 3 — sync localStorage with latest data from DB
      const updatedUser = {
        ...res.data.user,
        profilePic: uploadedImage  || storedUser.profilePic,
        resume:     uploadedResume || storedUser.resume,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))

      showToast("Profile updated successfully!")

    } catch (err) {
      showToast("Update failed. Try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <Layout>

      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="max-w-2xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Manage your account details
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Profile picture card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Profile Photo
          </h2>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 border-2 border-gray-200 dark:border-gray-700">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-3xl text-blue-400" />
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition w-fit">
                <FaUpload className="text-xs" />
                Upload Photo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </label>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                JPG, PNG up to 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Info fields card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Personal Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              icon={<FaUser />}
              label="Full Name"
              name="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="Rahul Shastri"
            />
            <InputField
              icon={<FaEnvelope />}
              label="Email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
            />
            <InputField
              icon={<FaPhone />}
              label="Phone"
              name="phone"
              value={fields.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
            />
            <InputField
              icon={<FaMapMarkerAlt />}
              label="Location"
              name="location"
              value={fields.location}
              onChange={handleChange}
              placeholder="Delhi, India"
            />
          </div>
          <div className="mt-4">
            <InputField
              icon={<FaCode />}
              label="Skills"
              name="skills"
              value={fields.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB..."
            />
          </div>
        </div>

        {/* Resume card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Resume
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition w-fit">
              <FaFileUpload className="text-xs" />
              {resume ? "Change Resume" : "Upload Resume"}
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
              />
            </label>

            {resume && (
              <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <FaFilePdf className="text-red-500" />
                {resume.name}
              </span>
            )}

            {!resume && storedUser.resume && (
              
               <a href={storedUser.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-blue-500 hover:underline"
              >
                <FaExternalLinkAlt className="text-xs" />
                View current resume
              </a>
            )}
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            PDF, DOC, DOCX up to 5MB
          </p>
        </div>

        {/* Save button */}
        <div className="flex justify-end pb-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg text-sm font-medium transition"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>

      </div>
    </Layout>
  )
}

export default Profile