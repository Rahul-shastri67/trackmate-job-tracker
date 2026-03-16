const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cloudinary = require("../config/cloudinary")

// ==========================
// Signup
// ==========================

exports.signup = async (req, res) => {

  try {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      message: "User created successfully"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}


// ==========================
// Login
// ==========================

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        skills: user.skills,
        profilePic: user.profilePic,
        resume: user.resume
      }
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}


// ==========================
// Upload Resume
// ==========================

exports.uploadResume = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      })
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "trackmate/resumes"
      },
      async (error, uploaded) => {

        if (error) {
          console.log("Cloudinary Error:", error)
          return res.status(500).json({
            message: "Upload failed"
          })
        }

        const user = await User.findByIdAndUpdate(
          req.userId,
          { resume: uploaded.secure_url },
          { returnDocument: "after" }
        )

        if (!user) {
          return res.status(404).json({
            message: "User not found"
          })
        }

        res.json({
          message: "Resume uploaded successfully",
          resume: user.resume
        })

      }
    )

    stream.end(req.file.buffer)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Upload error"
    })

  }

}


// ==========================
// Upload Profile Picture
// ==========================

exports.uploadProfilePic = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded"
      })
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "trackmate/profile"
      },
      async (error, uploaded) => {

        if (error) {
          console.log(error)
          return res.status(500).json({
            message: "Image upload failed"
          })
        }

        const user = await User.findByIdAndUpdate(
          req.userId,
          { profilePic: uploaded.secure_url },
          { returnDocument: "after" }
        )

        res.json({
          message: "Profile picture uploaded",
          profilePic: user.profilePic
        })

      }
    )

    stream.end(req.file.buffer)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}