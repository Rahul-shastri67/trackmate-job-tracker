const express = require("express")
const router = express.Router()

const {
  signup,
  login,
  updateProfile,
  uploadResume,
  uploadProfilePic
} = require("../controllers/authController")

const auth = require("../middleware/authMiddleware")
const upload = require("../middleware/resumeUpload")

router.post("/signup", signup)
router.post("/login", login)

router.put("/update-profile", auth, updateProfile)

router.post(
  "/upload-resume",
  auth,
  upload.single("resume"),
  uploadResume
)

router.post(
  "/upload-profile",
  auth,
  upload.single("profilePic"),
  uploadProfilePic
)

module.exports = router