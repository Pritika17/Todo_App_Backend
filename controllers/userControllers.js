const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.createUser = async (req, res) => {
    try {
        // collecting data from frontend
        const { name, email, password } = req.body

        // validate data if exists
        if (!(name && email && password)) {
            throw new Error("All fields are required")
        }

        // checking if user exists
        const existingUser = await User.findOne({ email })
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
        }, process.env.SECRET, { expiresIn: "2h" })

        newUser.token = token

        // don't want to send the password
        newUser.password = undefined

        res.status(201).json({
            success: true,
            newUser: newUser,
            token
        })

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        // collect info from frontend
        const { email, password } = req.body

        // validating the information
        if (!(email && password)) {
            throw new Error("Email and password are required")
        }

        // check user in database
        const user = await User.findOne({ email })

        // if user do not exists 
        if (!user) {
            throw new Error("User do not exists")
        }

        // match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id, email }, process.env.SECRET, { expiresIn: '2h' })

            user.password = undefined
            user.token = token

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true 
            }

            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            })
        }

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}