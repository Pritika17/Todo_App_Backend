const express = require("express")
const { createUser } = require("../controllers/userControllers")
const router = express.Router()
const auth = require("../middleware/auth")


router.post("/user/createUser", createUser)

module.exports = router