const express  = require("express")
const signUp = require("../controllers/signUp")
const signIn = require("../controllers/signIn")

const router = express.Router()

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)

module.exports = router