const express = require("express")
const { createUser, loginUser, getUsers } = require("../controllers/userControllers")
const router = express.Router()
const auth = require("../middleware/auth")


router.post("/user/createUser", createUser)
router.post("/user/loginUser", loginUser)
router.get("/user/getUser", auth, getUsers)

module.exports = router