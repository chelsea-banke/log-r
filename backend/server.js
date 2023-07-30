require("dotenv").config()
const authRouter = require("./src/routes/auth")
const userRouter = require("./src/routes/user")
const pool = require("./src/utils/pool")
const express = require('express')

const server = express()
server.use(express.json())
server.use("/api/auth", authRouter)
server.use("/api/user", userRouter)

server.listen(process.env.SERVER_PORT, async () => {
  console.log(`server is listening on port ${process.env.SERVER_PORT}...`)
  await pool.sync()
})