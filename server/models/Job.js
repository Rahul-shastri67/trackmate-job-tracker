const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer", "Rejected"],
    default: "Applied"
  },
  location: {
    type: String,
    default: ""
  },
  jobLink: {
    type: String,
    default: ""
  },
  interviewDate: {
    type: Date
  },
  notes: {
    type: String,
    default: ""
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Job", JobSchema)