const { createLogbook, getLogbook, updateLogbook, deleteLogbook } = require("../controllers/logbookController")
const { userAuth } = require("../middlewares/auth")

const router = require("express").Router()

router.route("/create-new").post(userAuth, createLogbook)
router.route("/:title").get(userAuth, getLogbook)
router.route("/:title").put(userAuth, updateLogbook)
router.route("/:title").delete(userAuth, deleteLogbook)

module.exports = router