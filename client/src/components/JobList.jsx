import { FaTrash, FaEdit } from "react-icons/fa"
import { deleteJob, updateJob } from "../api/jobs"
import { useState } from "react"

function JobList({ jobs, refreshJobs }) {

const [editJob,setEditJob] = useState(null)
const [company,setCompany] = useState("")
const [position,setPosition] = useState("")


// ======================
// Delete Job
// ======================

const handleDelete = async (id) => {

const confirmDelete = window.confirm("Delete this job?")

if(!confirmDelete) return

await deleteJob(id)

refreshJobs()

}


// ======================
// Update Job
// ======================

const handleUpdate = async () => {

await updateJob(editJob._id,{
company,
position,
status:editJob.status
})

setEditJob(null)

refreshJobs()

}


// ======================
// Change Status
// ======================

const handleStatusChange = async (id,status)=>{

await updateJob(id,{status})

refreshJobs()

}


// ======================
// Status Color
// ======================

const getStatusColor = (status)=>{

if(status === "Applied") return "bg-yellow-500"
if(status === "Interview") return "bg-blue-500"
if(status === "Offer") return "bg-green-500"
if(status === "Rejected") return "bg-red-500"

return "bg-gray-500"

}


// ======================
// UI
// ======================

return (

<div className="mt-8">

<h2 className="text-xl font-bold mb-4 text-black dark:text-white">
Your Applications
</h2>


{/* Empty State */}

{jobs.length === 0 && (

<p className="text-gray-500">
No jobs added yet
</p>

)}


{jobs.map((job)=> (

<div
key={job._id}
className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md p-4 mb-4 rounded-lg flex justify-between items-center hover:shadow-lg transition"
>

{/* Job Info */}

<div>

<h3 className="font-semibold text-lg">
{job.company}
</h3>

<p className="text-gray-600 dark:text-gray-400 mb-2">
{job.position}
</p>


<span
className={`px-3 py-1 rounded-full text-white text-xs ${getStatusColor(job.status)}`}
>

{job.status}

</span>


<div className="mt-2">

<select
value={job.status}
onChange={(e)=>handleStatusChange(job._id,e.target.value)}
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 text-sm rounded text-black dark:text-white"
>

<option>Applied</option>
<option>Interview</option>
<option>Offer</option>
<option>Rejected</option>

</select>

</div>

</div>


{/* Actions */}

<div className="flex gap-2">

<button
onClick={()=>{
setEditJob(job)
setCompany(job.company)
setPosition(job.position)
}}
className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
>

<FaEdit/>

Edit

</button>


<button
onClick={()=>handleDelete(job._id)}
className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
>

<FaTrash/>

Delete

</button>

</div>

</div>

))}


{/* ====================== */}
{/* Edit Modal */}
{/* ====================== */}

{editJob && (

<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

<div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg w-80 shadow-lg">

<h2 className="text-lg font-bold mb-4">
Edit Job
</h2>


<input
type="text"
value={company}
onChange={(e)=>setCompany(e.target.value)}
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 w-full mb-3 rounded"
placeholder="Company"
/>


<input
type="text"
value={position}
onChange={(e)=>setPosition(e.target.value)}
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 w-full mb-3 rounded"
placeholder="Position"
/>


<div className="flex justify-end gap-2">

<button
onClick={()=>setEditJob(null)}
className="px-3 py-1 bg-gray-400 text-white rounded"
>
Cancel
</button>

<button
onClick={handleUpdate}
className="px-3 py-1 bg-blue-500 text-white rounded"
>
Save
</button>

</div>

</div>

</div>

)}

</div>

)

}

export default JobList