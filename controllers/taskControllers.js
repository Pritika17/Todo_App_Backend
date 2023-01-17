const Todo = require("../models/toDo")

exports.createTask = async (req, res) => {
    try {
        const { todoId } = req.params
        const { task } = req.body
        const todoExists = await Todo.findById(todoId)
        if (!todoExists) {
            throw new Error("Todo do not exists")
        }
        const todo = await Todo.findById(todoId)

        const createTask = await Todo.findByIdAndUpdate(todoId, todo)
        todo.task.push(task)
        const savedTask = await todo.save()
        res.status(200).json({
            success: true,
            message: "Task successfully created",
            todo
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

