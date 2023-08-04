const { updatePassword, updateUser, deleteUser, getUser } = require("../controllers/user/userController")
const signUp = require("../controllers/user/signUp")
const signIn = require("../controllers/user/signIn")
const userAuth = require("../middlewares/auth")

const router = require("express").Router()

router.route("/sign-up").post(signUp)
router.route("/sign-in").post(signIn)

router.route("/update/password").put(userAuth, updatePassword)
router.route("/update").put(userAuth, updateUser)

router.route("/get").get(userAuth, getUser)
router.route("/delete").delete(userAuth ,deleteUser)

module.exports = router