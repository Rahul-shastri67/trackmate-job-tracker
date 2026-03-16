import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

function JobChart({ jobs = [] }) {

  const applied = jobs.filter(j => j.status === "Applied").length
  const interview = jobs.filter(j => j.status === "Interview").length
  const offer = jobs.filter(j => j.status === "Offer").length
  const rejected = jobs.filter(j => j.status === "Rejected").length

  const data = [
    { name: "Applied", value: applied },
    { name: "Interview", value: interview },
    { name: "Offer", value: offer },
    { name: "Rejected", value: rejected }
  ]

  const total = applied + interview + offer + rejected

  const COLORS = ["#facc15", "#3b82f6", "#22c55e", "#ef4444"]

  return (

    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 mt-8">

      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
        Job Application Analytics Chart
      </h2>

      {total === 0 ? (

        <p className="text-center text-gray-500 dark:text-gray-400">
          No job data available yet.
        </p>

      ) : (

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >

              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}

            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      )}

    </div>

  )
}

export default JobChart