const { createLog, getLogs, updateLog } = require("../controllers/logController")
const { userAuth, manualAuth } = require("../middlewares/auth")

const router = require("express").Router()

router.route("/:title/create-log").post(userAuth, manualAuth, createLog)
router.route("/:title/get-all").get(userAuth, manualAuth, getLogs)
router.route("/:email/:title/:week").put(userAuth, manualAuth, updateLog)

module.exports = router