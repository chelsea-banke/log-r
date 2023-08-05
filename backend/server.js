require("dotenv").config()
const express = require('express')
const cookieParser = require("cookie-parser")
const userRouter = require("./src/routes/user")
const logbookRouter = require("./src/routes/logbook")
const connection = require("./src/utils/connection")

const server = express()

server.use(express.json())
server.use(cookieParser())
server.use("/api/user", userRouter)
server.use("/api/logbook", logbookRouter)

server.get("/", (req, res)=>{
  res.send("hello world !")
})

server.listen(process.env.SERVER_PORT, async () => {
  console.log(`server is listening on port ${process.env.SERVER_PORT}...`)
  await connection.sync()
})