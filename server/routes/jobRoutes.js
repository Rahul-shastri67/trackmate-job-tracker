const express = require("express")
const router = express.Router()

const Job = require("../models/Job")
const auth = require("../middleware/authMiddleware")

router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.userId })
      .sort({ createdAt: -1 })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", auth, async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      userId: req.userId
    })
    await job.save()
    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    )
    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }
    res.json(job)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    })
    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }
    res.json({ message: "Job deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router