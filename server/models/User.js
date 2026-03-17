const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  skills: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },
  resume: {
    type: String,
    default: ""
  }
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)