require("dotenv").config()
const authController = require("./src/controllers/authController")
const pool = require("./src/utils/pool")
const gracefulShutdown = require("./src/utils/gracefulShutdown")
const express = require('express')

const server = express()
server.use(express.json())
server.use("/api/auth", authController)

server.listen(process.env.SERVER_PORT, async () => {
  console.log(`server is listening on port ${process.env.SERVER_PORT}...`)
  await pool.sync()
})