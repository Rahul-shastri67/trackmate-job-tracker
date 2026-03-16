import { FaBriefcase, FaUserTie, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

function DashboardStats({ jobs }) {

  const applied = jobs.filter(j => j.status === "Applied").length
  const interview = jobs.filter(j => j.status === "Interview").length
  const offer = jobs.filter(j => j.status === "Offer").length
  const rejected = jobs.filter(j => j.status === "Rejected").length

  const cards = [
    {title:"Applied",value:applied,icon:<FaBriefcase />,color:"text-yellow-500"},
    {title:"Interview",value:interview,icon:<FaUserTie />,color:"text-blue-500"},
    {title:"Offer",value:offer,icon:<FaCheckCircle />,color:"text-green-500"},
    {title:"Rejected",value:rejected,icon:<FaTimesCircle />,color:"text-red-500"},
  ]

  return (

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

      {cards.map((card,i) => (

        <div
          key={i}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 transition hover:scale-105"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm text-gray-500 dark:text-gray-300">
                {card.title}
              </p>

              <h2 className="text-2xl font-bold text-black dark:text-white">
                {card.value}
              </h2>

            </div>

            <div className={`text-2xl ${card.color}`}>

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>

  )

}

export default DashboardStats