require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")

const jobRoutes = require("./routes/jobRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}))

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err))

app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)

app.get("/", (req, res) => {
  res.send("TrackMate API Running 🚀")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`)
})