const { createLogbook } = require("../controllers/logbookController")
const userAuth = require("../middlewares/auth")

const router = require("express").Router()

router.route("/create-new").post(userAuth, createLogbook)

module.exports = router