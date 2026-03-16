const express = require("express")
const router = express.Router()

const { signup, login, uploadResume, uploadProfilePic } = require("../controllers/authController")

const auth = require("../middleware/authMiddleware")
const upload = require("../middleware/resumeUpload")

// =======================
// Auth Routes
// =======================

// Signup
router.post("/signup", signup)

// Login
router.post("/login", login)


// =======================
// Upload Routes
// =======================

// Upload Resume
router.post(
  "/upload-resume",
  auth,
  upload.single("resume"),
  uploadResume
)

// Upload Profile Picture
router.post(
  "/upload-profile",
  auth,
  upload.single("profilePic"),
  uploadProfilePic
)

module.exports = router