const { updatePassword } = require("../controllers/user/userController")

const signUp = require("../controllers/user/signUp")
const signIn = require("../controllers/user/signIn")
const userAuth = require("../middlewares/auth")

const router = require("express").Router()

router.route("/sign-up").post(signUp)
router.route("/sign-in").post(signIn)

router.route("/update/password").put(userAuth, updatePassword)

module.exports = router