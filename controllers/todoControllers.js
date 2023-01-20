const Todo = require("../models/toDo")

exports.home = (req, res) => {
    res.send("Hello from server")
}

exports.createTodo = async (req, res) => {
    try {
        const { title } = req.body
        if (!title) {
            throw new Error("Title of Todo is required")
        }
        const todo = new Todo({
            title
        })
        const saveTodo = await todo.save()
        res.status(200).json({
            success: true,
            message: "Todo successfully saved",
            todo: saveTodo
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json({
            success: true,
            todos
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

exports.editTodo = async (req, res) => {
    try {
        const { todoId } = req.params
        const { title } = req.body
        const todoExists = await Todo.findById(todoId)
        const todo = await Todo.findById(todoId)
        if (!todoExists) {
            throw new Error("This Todo do not exists")
        }
        todo.title = title
        const editTodo = await Todo.findByIdAndUpdate(todoId, todo)
        res.status(200).json({
            success: true,
            message: "Todo title edited successfully",
            editedTodo: todo
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params
        const todoExists = await Todo.findById(todoId)
        if (!todoExists) {
            throw new Error("This Todo do not exists")
        }

        const deleteTodo = await Todo.findByIdAndDelete(todoId)
        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            deletedTodo: deleteTodo
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}