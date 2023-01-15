const express = require("express")
const router = express.Router()
const { 
    home,
    createTodo, 
    getTodo, 
    editTodo, 
    deleteTodo 
} = require("../controllers/todoControllers")

router.get("/", home)
router.post("/createTodo", createTodo)
router.get("/getTodo", getTodo)
router.put("/editTodo/:todoId", editTodo)
router.delete("/deleteTodo/:todoId", deleteTodo)

module.exports = router
