import Layout from "../components/Layout"
import JobChart from "../components/JobChart"

function Analytics({ jobs }) {

  return (

    <Layout>

      <div className="text-black dark:text-white max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Job Analytics
        </h1>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">

          <JobChart jobs={jobs} />

        </div>

      </div>

    </Layout>

  )

}

export default Analytics