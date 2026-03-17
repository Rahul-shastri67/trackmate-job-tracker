import {
  FaBriefcase, FaUserTie, FaCheckCircle,
  FaTimesCircle, FaChartLine
} from "react-icons/fa"

function DashboardStats({ jobs }) {
  const applied   = jobs.filter(j => j.status === "Applied").length
  const interview = jobs.filter(j => j.status === "Interview").length
  const offer     = jobs.filter(j => j.status === "Offer").length
  const rejected  = jobs.filter(j => j.status === "Rejected").length
  const total     = jobs.length

  const successRate = total > 0 ? Math.round((offer / total) * 100) : 0

  const cards = [
    {
      title: "Total",
      value: total,
      icon: <FaChartLine />,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Applied",
      value: applied,
      icon: <FaBriefcase />,
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "Interview",
      value: interview,
      icon: <FaUserTie />,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Offer",
      value: offer,
      icon: <FaCheckCircle />,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <FaTimesCircle />,
      color: "text-red-500",
      bg: "bg-red-50 dark:bg-red-900/20",
    },
  ]

  return (
    <div className="space-y-3">

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:shadow-md transition hover:-translate-y-0.5"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {card.title}
                </p>
                <h2 className="text-2xl font-bold text-black dark:text-white mt-0.5">
                  {card.value}
                </h2>
              </div>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <span className={`text-lg ${card.color}`}>
                  {card.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Success rate bar */}
      {total > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Offer Rate
            </span>
            <span className="text-xs font-bold text-green-500">
              {successRate}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default DashboardStats