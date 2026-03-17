import { useState } from "react"

const STATUS_META = [
  { label: "All",       color: "bg-gray-500"   },
  { label: "Applied",   color: "bg-yellow-500" },
  { label: "Interview", color: "bg-blue-500"   },
  { label: "Offer",     color: "bg-green-500"  },
  { label: "Rejected",  color: "bg-red-500"    },
]

function JobFilter({ setFilter, jobs = [] }) {
  const [active, setActive] = useState("All")

  const getCount = (label) => {
    if (label === "All") return jobs.length
    return jobs.filter(j => j.status === label).length
  }

  const handleClick = (label) => {
    setActive(label)
    setFilter(label)
  }

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 pb-1 min-w-max">
        {STATUS_META.map(({ label, color }) => (
          <button
            key={label}
            onClick={() => handleClick(label)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap
              ${active === label
                ? `${color} text-white shadow-md`
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold
              ${active === label
                ? "bg-white bg-opacity-30 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
              }`}
            >
              {getCount(label)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default JobFilter