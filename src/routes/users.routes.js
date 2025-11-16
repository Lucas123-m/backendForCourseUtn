const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth.controller")
const {validarSesion} = require("../middlewares/auth/validarSesion")
const {validarUser} = require("../middlewares/schema/validarUser")
router.get("/cookie",validarSesion(),controller.checkCookie)
router.post("/logout",validarSesion(),controller.deleteCookieSession)
router.post("/register",validarUser(),controller.register)
router.post("/login",validarUser(),controller.login)

module.exports = router;