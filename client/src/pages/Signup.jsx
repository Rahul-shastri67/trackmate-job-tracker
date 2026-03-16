import { FaUserPlus, FaUser, FaEnvelope, FaLock } from "react-icons/fa"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signup(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const handleSignup = async () => {


try{

  const res = await axios.post(
    "http://localhost:5000/api/auth/signup",
    {
      name,
      email,
      password
    }
  )

  alert("Signup successful ✅")

  navigate("/login")

}catch(err){

  console.log(err.response?.data)

  alert(
    err.response?.data?.message ||
    "Signup failed"
  )

}


}

return(


<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">

  <div className="bg-white dark:bg-gray-800 p-6 shadow rounded w-80">

    <h2 className="text-xl font-bold mb-4 text-center dark:text-white">
      Signup
    </h2>

    {/* Name */}
    <div className="flex items-center border p-2 mb-3 rounded dark:bg-gray-700">

      <FaUser className="mr-2 text-gray-500"/>

      <input
        placeholder="Name"
        className="w-full outline-none bg-transparent dark:text-white"
        onChange={(e)=>setName(e.target.value)}
      />

    </div>

    {/* Email */}
    <div className="flex items-center border p-2 mb-3 rounded dark:bg-gray-700">

      <FaEnvelope className="mr-2 text-gray-500"/>

      <input
        placeholder="Email"
        className="w-full outline-none bg-transparent dark:text-white"
        onChange={(e)=>setEmail(e.target.value)}
      />

    </div>

    {/* Password */}
    <div className="flex items-center border p-2 mb-4 rounded dark:bg-gray-700">

      <FaLock className="mr-2 text-gray-500"/>

      <input
        type="password"
        placeholder="Password"
        className="w-full outline-none bg-transparent dark:text-white"
        onChange={(e)=>setPassword(e.target.value)}
      />

    </div>

    <button
      onClick={handleSignup}
      className="flex items-center justify-center gap-2 bg-green-600 text-white w-full py-2 rounded-lg shadow-md hover:bg-green-700 transition"
    >
      <FaUserPlus />
      Signup
    </button>

  </div>

</div>


)

}

export default Signup
