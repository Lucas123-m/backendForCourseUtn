const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth.controller")
const {validarSesion} = require("../middlewares/validarSesion")
const {validarUser} = require("../middlewares/validarUser")
router.get("/cookie",validarSesion(),controller.checkCookie)
router.post("/logout",validarSesion(),controller.deleteCookieSession)
router.post("/register",validarUser(),controller.register)
router.post("/login",validarUser(),controller.login)

module.exports = router;