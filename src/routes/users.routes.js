const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth.controller")
const {validarCookie} = require("../middlewares/validarCookie")

router.get("/cookie",validarCookie(),controller.checkCookie)
router.get("/protected",validarCookie(),controller.renderProtected)
router.post("/logout",controller.deleteCookieSession)
router.post("/register",controller.register)
router.post("/login",controller.login)

module.exports = router;