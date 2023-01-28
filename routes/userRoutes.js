const express = require("express")
const { createUser, loginUser } = require("../controllers/userControllers")
const router = express.Router()
const auth = require("../middleware/auth")


router.post("/user/createUser", createUser)
router.post("/user/loginUser", loginUser)

module.exports = router