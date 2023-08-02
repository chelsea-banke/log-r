require("dotenv").config()
const express = require('express')
const cookieParser = require("cookie-parser")
const userRouter = require("./src/routes/user")
const connection = require("./src/utils/connection")

const server = express()

server.use(express.json())
express.use(cookieParser)
server.use("/api/user", userRouter)

server.listen(process.env.SERVER_PORT, async () => {
  console.log(`server is listening on port ${process.env.SERVER_PORT}...`)
  await connection.sync()
})