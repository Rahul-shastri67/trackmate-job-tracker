const express = require("express")
const router = express.Router()

const Job = require("../models/Job")
const auth = require("../middleware/authMiddleware")

// ======================
// Get All Jobs
// ======================

router.get("/", auth, async (req, res) => {

  try {

    const jobs = await Job.find({ userId: req.userId })
      .sort({ createdAt: -1 })

    res.json(jobs)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// ======================
// Add Job
// ======================

router.post("/", auth, async (req, res) => {

  try {

    const job = new Job({
      ...req.body,
      userId: req.userId
    })

    await job.save()

    res.status(201).json(job)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// ======================
// Update Job
// ======================

router.put("/:id", auth, async (req, res) => {

  try {

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { returnDocument: "after" }
    )

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }

    res.json(job)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// ======================
// Delete Job
// ======================

router.delete("/:id", auth, async (req, res) => {

  try {

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    })

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      })
    }

    res.json({
      message: "Job deleted successfully"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

module.exports = router