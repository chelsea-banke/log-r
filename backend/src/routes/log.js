const { createLog, getLogs, updateLog } = require("../controllers/logController")
const { userAuth, logbookAuth } = require("../middlewares/auth")

const router = require("express").Router()

router.route("/:title/create-log").post(userAuth, logbookAuth, createLog)
router.route("/:title/get-all").get(userAuth, logbookAuth, getLogs)
router.route("/:title/:date").put(userAuth, logbookAuth, updateLog)

module.exports = router