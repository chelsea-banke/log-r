const { createLogbook, getLogbook } = require("../controllers/logbookController")
const userAuth = require("../middlewares/auth")

const router = require("express").Router()

router.route("/create-new").post(userAuth, createLogbook)
router.route("/:title").get(userAuth, getLogbook)

module.exports = router