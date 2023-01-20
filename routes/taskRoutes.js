const express = require("express")
const router = express.Router()
const { 
    createTask, 
    editTask, 
    deleteTask,
    getTasks
} = require("../controllers/taskControllers")


router.put("/createTask/:todoId", createTask)
router.put("/editTask/:todoId/:taskId", editTask)
router.delete("/deleteTask/:todoId/:taskId", deleteTask)
router.get("/getTasks/:todoId", getTasks)
module.exports = router