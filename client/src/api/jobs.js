import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

// Automatically attach token
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token")

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})


// ======================
// Get Jobs
// ======================

export const getJobs = () => {
  return API.get("/jobs")
}


// ======================
// Create Job
// ======================

export const createJob = (job) => {
  return API.post("/jobs", job)
}


// ======================
// Delete Job
// ======================

export const deleteJob = (id) => {
  return API.delete(`/jobs/${id}`)
}


// ======================
// Update Job
// ======================

export const updateJob = (id, job) => {
  return API.put(`/jobs/${id}`, job)
}