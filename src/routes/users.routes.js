const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth.controller")

router.get("/",controller.renderInitialPage)
router.get("/protected",controller.renderProtected)
router.post("/logout",controller.deleteCookieSession)
router.post("/register",controller.register)
router.post("/login",controller.login)

module.exports = router;