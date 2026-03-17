import Layout from "../components/Layout"
import JobChart from "../components/JobChart"
import {
  FaBriefcase, FaUserTie, FaCheckCircle,
  FaTimesCircle, FaBuilding
} from "react-icons/fa"

const STATUS_META = [
  { key: "Applied",   label: "Applied",   icon: <FaBriefcase />,   color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
  { key: "Interview", label: "Interview", icon: <FaUserTie />,      color: "text-blue-500",   bg: "bg-blue-50 dark:bg-blue-900/20"   },
  { key: "Offer",     label: "Offers",    icon: <FaCheckCircle />,  color: "text-green-500",  bg: "bg-green-50 dark:bg-green-900/20" },
  { key: "Rejected",  label: "Rejected",  icon: <FaTimesCircle />,  color: "text-red-500",    bg: "bg-red-50 dark:bg-red-900/20"     },
]

function Analytics({ jobs = [] }) {
  const total = jobs.length

  const getCount = (status) =>
    jobs.filter(j => j.status === status).length

  const getPercent = (status) =>
    total > 0 ? Math.round((getCount(status) / total) * 100) : 0

  // Top 5 companies by application count
  const companyCounts = jobs.reduce((acc, job) => {
    acc[job.company] = (acc[job.company] || 0) + 1
    return acc
  }, {})

  const topCompanies = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Overview of your job search progress
          </p>
        </div>

        {total === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <FaBriefcase className="text-5xl mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">No data yet</p>
            <p className="text-sm mt-1">Add some jobs to see your analytics</p>
          </div>
        ) : (
          <>
            {/* Status breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATUS_META.map(({ key, label, icon, color, bg }) => (
                <div
                  key={key}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {label}
                      </p>
                      <p className="text-2xl font-bold text-black dark:text-white mt-0.5">
                        {getCount(key)}
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg ${bg}`}>
                      <span className={`text-lg ${color}`}>{icon}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        key === "Applied"   ? "bg-yellow-500" :
                        key === "Interview" ? "bg-blue-500"   :
                        key === "Offer"     ? "bg-green-500"  : "bg-red-500"
                      }`}
                      style={{ width: `${getPercent(key)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {getPercent(key)}% of total
                  </p>
                </div>
              ))}
            </div>

            {/* Chart + Top Companies side by side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

              {/* Chart */}
              <div className="lg:col-span-2">
                <JobChart jobs={jobs} />
              </div>

              {/* Top Companies */}
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaBuilding className="text-blue-500" />
                  Top Companies
                </h3>

                {topCompanies.length === 0 ? (
                  <p className="text-sm text-gray-400">No data</p>
                ) : (
                  <div className="space-y-3">
                    {topCompanies.map(([company, count], i) => (
                      <div key={company} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-bold text-gray-400 w-4">
                            {i + 1}
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                            {company}
                          </span>
                        </div>
                        <span className="text-xs font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-500 px-2 py-0.5 rounded-full shrink-0">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary line */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl px-5 py-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Out of <strong>{total}</strong> applications —{" "}
                <strong>{getCount("Interview")}</strong> reached interview stage and{" "}
                <strong>{getCount("Offer")}</strong> converted to offers.
                That's a <strong>{getPercent("Offer")}%</strong> offer rate. 🎯
              </p>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Analytics