import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts"
import { useState } from "react"

const COLORS = ["#facc15", "#3b82f6", "#22c55e", "#ef4444"]

const STATUS_LIST = ["Applied", "Interview", "Offer", "Rejected"]

function JobChart({ jobs = [] }) {
  const [chartType, setChartType] = useState("pie")

  const data = STATUS_LIST.map((status, i) => ({
    name: status,
    value: jobs.filter(j => j.status === status).length,
    color: COLORS[i],
  })).filter(d => d.value > 0)

  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Applications Chart
        </h2>

        {total > 0 && (
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setChartType("pie")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition
                ${chartType === "pie"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
                }`}
            >
              Pie
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition
                ${chartType === "bar"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
                }`}
            >
              Bar
            </button>
          </div>
        )}
      </div>

      {total === 0 ? (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
          No job data available yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius="40%"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${Math.round(percent * 100)}%`
                }
                labelLine={false}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [value, name]}
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg, #fff)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          ) : (
            <BarChart data={data} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  fontSize: "12px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default JobChart