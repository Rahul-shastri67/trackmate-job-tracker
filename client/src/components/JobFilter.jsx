import { useState } from "react"

function JobFilter({ setFilter }) {

  const filters = ["All","Applied","Interview","Offer","Rejected"]
  const [active, setActive] = useState("All")

  const handleClick = (status) => {
    setActive(status)
    setFilter(status)
  }

  return (

    <div className="flex flex-wrap gap-3 mb-6">

      {filters.map((status) => (

        <button
          key={status}
          onClick={() => handleClick(status)}
          className={`px-4 py-2 rounded-lg transition 
          ${
            active === status
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-blue-500 hover:text-white"
          }`}
        >
          {status}
        </button>

      ))}

    </div>

  )

}

export default JobFilter