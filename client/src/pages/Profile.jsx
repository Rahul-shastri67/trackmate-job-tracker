import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import axios from "axios"

import {
FaUser,
FaEnvelope,
FaPhone,
FaMapMarkerAlt,
FaUpload,
FaSignOutAlt,
FaCode,
FaFileUpload
} from "react-icons/fa"


const InputField = ({ icon, name, value, onChange, type="text" }) => {

return (

<div className="flex items-center border rounded-md px-3 bg-white dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500">

<div className="w-8 flex justify-center items-center text-gray-400">
{icon}
</div>

<input
type={type}
name={name}
value={value}
onChange={onChange}
className="w-full p-2 outline-none bg-transparent dark:text-white"
/>

</div>

)

}



function Profile() {

const navigate = useNavigate()

const storedUser = JSON.parse(localStorage.getItem("user") || "{}")

const token = localStorage.getItem("token")

const [name,setName] = useState(storedUser.name || "")
const [email,setEmail] = useState(storedUser.email || "")
const [phone,setPhone] = useState(storedUser.phone || "")
const [location,setLocation] = useState(storedUser.location || "")
const [skills,setSkills] = useState(storedUser.skills || "")

const [profilePic,setProfilePic] = useState(null)
const [resume,setResume] = useState(null)

const imagePreview =
profilePic ? URL.createObjectURL(profilePic) : storedUser.profilePic


// ====================
// Upload Profile Image
// ====================

const uploadProfileImage = async () => {

if(!profilePic) return

const formData = new FormData()

formData.append("profilePic",profilePic)

const res = await axios.post(
"http://localhost:5000/api/auth/upload-profile",
formData,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

return res.data.profilePic

}


// ====================
// Upload Resume
// ====================

const uploadResume = async () => {

if(!resume) return storedUser.resume

const formData = new FormData()

formData.append("resume",resume)

const res = await axios.post(
"http://localhost:5000/api/auth/upload-resume",
formData,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

return res.data.resume

}


// ====================
// Save Profile
// ====================

const handleSave = async () => {

try{

const uploadedImage = await uploadProfileImage()
const uploadedResume = await uploadResume()

const updatedUser = {
name,
email,
phone,
location,
skills,
profilePic: uploadedImage || storedUser.profilePic,
resume: uploadedResume || storedUser.resume
}

localStorage.setItem("user",JSON.stringify(updatedUser))

alert("Profile Updated Successfully")

}catch(err){

alert("Upload failed")

}

}


// ====================
// Logout
// ====================

const handleLogout = () => {

localStorage.removeItem("token")
localStorage.removeItem("user")

navigate("/login")

}


return (

<Layout>

<div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">

<div className="flex justify-between items-center mb-6">

<h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
Profile Settings
</h2>

<button
onClick={handleLogout}
className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
>

<FaSignOutAlt/>
Logout

</button>

</div>


{/* Profile Image */}

<div className="flex items-center gap-6 mb-6">

<div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">

{imagePreview ? (

<img
src={imagePreview}
alt="profile"
className="w-full h-full object-cover"
/>

) : (

<FaUser className="text-3xl text-blue-500"/>

)}

</div>

<label className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">

<FaUpload/>
Upload Photo

<input
type="file"
hidden
accept="image/*"
onChange={(e)=>setProfilePic(e.target.files[0])}
/>

</label>

</div>


{/* Name */}

<div className="mb-4">

<label className="block mb-1 dark:text-gray-300">
Name
</label>

<InputField
icon={<FaUser/>}
name="name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

</div>


{/* Email */}

<div className="mb-4">

<label className="block mb-1 dark:text-gray-300">
Email
</label>

<InputField
icon={<FaEnvelope/>}
name="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

</div>


{/* Phone */}

<div className="mb-4">

<label className="block mb-1 dark:text-gray-300">
Phone
</label>

<InputField
icon={<FaPhone/>}
name="phone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

</div>


{/* Location */}

<div className="mb-4">

<label className="block mb-1 dark:text-gray-300">
Location
</label>

<InputField
icon={<FaMapMarkerAlt/>}
name="location"
value={location}
onChange={(e)=>setLocation(e.target.value)}
/>

</div>


{/* Skills */}

<div className="mb-4">

<label className="block mb-1 dark:text-gray-300">
Skills
</label>

<InputField
icon={<FaCode/>}
name="skills"
value={skills}
onChange={(e)=>setSkills(e.target.value)}
/>

</div>


{/* Resume Upload */}

<div className="mb-6">

<label className="dark:text-gray-300">
Resume
</label>

<label className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer w-fit mt-2">

<FaFileUpload/>
Upload Resume

<input
type="file"
hidden
accept=".pdf,.doc,.docx"
onChange={(e)=>setResume(e.target.files[0])}
/>

</label>

{resume && (

<p className="text-sm mt-2 text-gray-500">
{resume.name}
</p>

)}

</div>


<button
onClick={handleSave}
className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
>

Save Profile

</button>

</div>

</Layout>

)

}

export default Profile