import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { getJobs } from "./api/jobs"

function App() {

  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const loadJobs = async () => {
    try {
      const res = await getJobs()
      setJobs(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

 useEffect(()=>{

  const token = localStorage.getItem("token")

  if(!token){
    navigate("/login")
    return
  }

  loadJobs()

},[])

  // Filter jobs
  const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter(job => job.status === filter)

  // Search jobs
  const searchedJobs = filteredJobs.filter(job =>
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.position.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppRoutes
      jobs={searchedJobs}
      refreshJobs={loadJobs}
      setFilter={setFilter}
      setSearch={setSearch}
      handleLogout={handleLogout}
    />
  )
}

export default App