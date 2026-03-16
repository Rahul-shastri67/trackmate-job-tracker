import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      navigate("/")

    }catch(err){

      alert("Login failed")

    }

  }

  return(

    <div className="flex items-center justify-center min-h-screen">

      <div className="bg-white p-6 shadow rounded w-80">

        <h2 className="text-xl font-bold mb-4">
          Login
        </h2>

        <input
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button
        onClick={handleLogin}
        className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>

      </div>

    </div>

  )

}

export default Login