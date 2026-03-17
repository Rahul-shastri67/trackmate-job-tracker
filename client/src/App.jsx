import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { getJobs } from "./api/jobs"

function App() {
  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const loadJobs = async () => {
    try {
      setLoading(true)
      const res = await getJobs()
      setJobs(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }
    loadJobs()
  }, [])

  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter(j => j.status === filter)

  const searchedJobs = filteredJobs.filter(j =>
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.position.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppRoutes
      jobs={searchedJobs}
      refreshJobs={loadJobs}
      setFilter={setFilter}
      setSearch={setSearch}
      loading={loading}
    />
  )
}

export default App