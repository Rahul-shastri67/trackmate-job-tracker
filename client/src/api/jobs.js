import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export const getJobs = () =>
  API.get("/jobs")

export const createJob = (job) =>
  API.post("/jobs", job)

export const deleteJob = (id) =>
  API.delete(`/jobs/${id}`)

export const updateJob = (id, job) =>
  API.put(`/jobs/${id}`, job)