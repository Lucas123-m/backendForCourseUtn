const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth.controller")
const {validarCookie} = require("../middlewares/validarCookie")
const {validarUser} = require("../middlewares/validarUser")
router.get("/cookie",validarCookie(),controller.checkCookie)
router.get("/protected",validarCookie(),controller.renderProtected)
router.post("/logout",validarCookie(),controller.deleteCookieSession)
router.post("/register",validarUser(),controller.register)
router.post("/login",validarUser(),controller.login)

module.exports = router;