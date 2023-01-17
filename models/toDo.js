const mongoose = require("mongoose")

const ToDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },

    task: [String],

    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("todo", ToDoSchema)