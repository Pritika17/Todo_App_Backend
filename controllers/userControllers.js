const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.createUser = async (req, res) => {
    try {
        // collecting data from frontend
        const {name, email, password} = req.body

        // validate data if exists
        if (!(name && email && password)) {
            throw new Error("All fields are required")
        }

        // checking if user exists
        const existingUser = await User.findOne({email})
        if (existingUser) {
            throw new Error("Email already exists")
        }

        // Encrypt the password 
        const encryptedPassword = await bcrypt.hash(password, 10)

        // create a new entry to the database
        const newUser = await User.create({
            name,
            email,
            password: encryptedPassword
        })

        // create a new token and send it to user
        const token = jwt.sign({
            id: newUser._id, email
        }, process.env.SECRET, {expiresIn: "2h"})

        newUser.token = token

        // don't want to send the password
        newUser.password = undefined

        res.status(201).json({
            success: true,
            newUser: newUser
        })

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}