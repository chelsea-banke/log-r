const { createManual, getManual, updateManual, deleteManual } = require("../controllers/manualController")
const { userAuth } = require("../middlewares/auth")

const router = require("express").Router()

router.route("/create-new").post(userAuth, createManual)
router.route("/:email/:title").get(userAuth, getManual)
router.route("/:title").put(userAuth, updateManual)
router.route("/:title").delete(userAuth, deleteManual)

module.exports = router