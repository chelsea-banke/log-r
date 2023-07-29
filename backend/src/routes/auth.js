const express  = require("express")
const signUp = require("../controllers/signUp")
const signIn = require("../controllers/signIn")

const router = express.Router()

router.route("/sign-up").post(signUp)
router.route("/sign-in").post(signIn)

module.exports = router