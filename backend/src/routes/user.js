const { updatePassword } = require("../controllers/user/userController")
const signUp = require("../controllers/user/signUp")
const signIn = require("../controllers/user/signIn")

const router = require("express").Router()

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)

router.put("/update/password", updatePassword)

module.exports = router