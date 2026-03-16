require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")

const jobRoutes = require("./routes/jobRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// ======================
// Middleware
// ======================

app.use(cors())
app.use(express.json())

// static folder for uploads (resume / profile images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))


// ======================
// MongoDB Connection
// ======================

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error ❌", err))


// ======================
// Routes
// ======================

app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)


// ======================
// Test Route
// ======================

app.get("/", (req,res)=>{
  res.send("Job Tracker API Running 🚀")
})


// ======================
// Global Error Handler
// ======================

app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(500).json({
    message:"Something went wrong"
  })
})


// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT} 🚀`)
})