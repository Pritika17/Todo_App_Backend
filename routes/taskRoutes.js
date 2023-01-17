const express = require("express")
const { createTask } = require("../controllers/taskControllers")
const router = express.Router()

router.put("/createTask/:todoId", createTask)

module.exports = router