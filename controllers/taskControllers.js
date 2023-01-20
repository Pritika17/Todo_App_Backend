const Todo = require("../models/toDo")

exports.createTask = async (req, res) => {
    try {
        const { todoId } = req.params
        const todoExists = await Todo.findById(todoId)
        if (!todoExists) {
            throw new Error("This Todo do not exists")
        }
        const todo = await Todo.findById(todoId)

        const { id, task } = req.body
        if (!(id || task)) {
            throw new Error("Task is required")
        }

        todo.task.push({
            taskNumber: req.body.taskNumber,
            task: task
        })
        const savedTask = await todo.save()
        res.status(200).json({
            success: true,
            message: "Task successfully added",
            todo
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.editTask = async (req, res) => {
    try {
        const { todoId, taskId } = req.params

        const todoExists = await Todo.findById(todoId)
        if (!todoExists) {
            throw new Error("This todo do not exists")
        }

        const todo = await Todo.findById(todoId)

        const taskExists = todo.task.filter(i => i._id == taskId)

        if (taskExists.length == 0) {
            throw new Error("Task do not exists")
        }

        const newTask = todo.task.map(i => {
            if (i._id == taskId) {
                i.taskNumber = req.body.taskNumber
                i.task = req.body.task
                return i
            } else {
                return i
            }
        })

        todo.task = newTask
        const editedTodo = await Todo.findByIdAndUpdate(todoId, todo)

        res.status(200).json({
            success: true,
            message: "Task successfully updated",
            todo
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { todoId, taskId } = req.params

        const todoExists = await Todo.findById(todoId)
        if (!todoExists) {
            throw new Error("This todo do not exists")
        }

        const todo = await Todo.findById(todoId)

        const taskExists = todo.task.filter(i => i._id == taskId)

        if (taskExists.length == 0) {
            throw new Error("Task do not exists")
        }

        const deletedTask = todo.task.filter(i => i._id != taskId)
        todo.task = deletedTask

        const updateTodo = await Todo.findByIdAndUpdate(todoId, todo)

        res.status(200).json({
            success: true,
            message: "Task successfully deleted",
            deletedTask,
            todo
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { todoId } = req.params
        const todoExists = await Todo.findById(todoId)
        if (!todoExists) {
            throw new Error("Todo do not exists")
        }
        const todo = await Todo.findById(todoId)
        const tasks = todo.task
        res.status(200).json({
            success: true,
            message: "Tasks successfully fetched",
            tasks
        })
    } catch (error) {
        res.status(401).json({
            success: true,
            message: "Cannot fetch the tasks"
        })
    }
}