const { createLog } = require("../controllers/logController")
const { userAuth, logbookAuth } = require("../middlewares/auth")

const router = require("express").Router()

router.route("/:title/create-log").post(userAuth, logbookAuth, createLog)

module.exports = router