require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/db")
const app = express()
const todoRoutes = require("./routes/todoRoutes")
const taskRoutes = require("./routes/taskRoutes")
const userRoutes = require("./routes/userRoutes")
const cookieParser = require('cookie-parser');
const cors = require("cors")

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors());

connectToDB()
app.use("/todo", todoRoutes)
app.use("/todo", taskRoutes)
app.use("/todo/auth", userRoutes)

module.exports = app