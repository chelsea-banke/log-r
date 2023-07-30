const { updatePassword } = require("../controllers/userController")

const router = require("express").Router()

router.post("/update/password", updatePassword)

module.exports = router