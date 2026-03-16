import { useState } from "react"
import { createJob } from "../api/jobs"

function JobForm({ refreshJobs }) {

const [form,setForm] = useState({
company:"",
position:"",
status:"Applied",
notes:""
})

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const handleSubmit = async (e)=>{

e.preventDefault()

try{

await createJob(form)

setForm({
company:"",
position:"",
status:"Applied",
notes:""
})

refreshJobs()

}catch(error){

alert("Please login again")

}

}

return (

<form
onSubmit={handleSubmit}
className="bg-white dark:bg-gray-900 shadow-lg p-6 rounded-xl text-black dark:text-white"
>

<h2 className="text-xl font-bold mb-6">
Add Job Application
</h2>

{/* Grid Inputs */}

<div className="grid md:grid-cols-2 gap-4">

<input
name="company"
placeholder="Company"
value={form.company}
onChange={handleChange}
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded"
/>

<input
name="position"
placeholder="Position"
value={form.position}
onChange={handleChange}
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded"
/>

</div>


{/* Status */}

<select
name="status"
value={form.status}
onChange={handleChange}
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 w-full mt-4 rounded"
>

<option>Applied</option>
<option>Interview</option>
<option>Offer</option>
<option>Rejected</option>

</select>


{/* Notes */}

<textarea
name="notes"
placeholder="Notes"
value={form.notes}
onChange={handleChange}
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 w-full mt-4 rounded"
/>


{/* Button */}

<div className="flex justify-end mt-4">

<button
className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
>
Add Job
</button>

</div>

</form>

)

}

export default JobForm