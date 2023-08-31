require("dotenv").config()
const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const userRouter = require("./src/routes/user")
const logbookRouter = require("./src/routes/logbook")
const logRouter = require("./src/routes/log")
const connection = require("./src/utils/connection")

const server = express()
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ["set-cookie"]
}

server.use(express.json())
server.use(cookieParser())
server.use(cors(corsOptions))
server.use("/api/user", userRouter)
server.use("/api/logbook", logbookRouter)
server.use("/api/log", logRouter)

server.listen(process.env.SERVER_PORT, async () => {
  console.log(`server is listening on port ${process.env.SERVER_PORT}...`)
  await connection.sync()
})