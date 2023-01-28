const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Name is required"]
    },

    email: {
        type: String,
        required: [true, "Email is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "password cannot be less than 6 characters"]
    }
})

module.exports = new mongoose.model ("user", UserSchema)