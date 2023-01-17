require("dotenv").config()
const express = require("express")
const connectToDB = require("./config/db")
const app = express()
const todoRoutes = require("./routes/todoRoutes")
const taskRoutes = require("./routes/taskRoutes")
const cors = require("cors")

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors());

connectToDB()
app.use("/", todoRoutes)
app.use("/", taskRoutes)

module.exports = app