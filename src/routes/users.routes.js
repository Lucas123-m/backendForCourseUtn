const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth.controller")

router.get("/prueba",(req,res)=>{
    console.log(req.cookies)
    res.send(req.cookies)
})
router.post("/register",controller.register)
router.post("/login",controller.login)
router.post("/prueba",(req,res)=>{
    res.cookie('prueba','Holaaa',{httpOnly:false,maxAge: 1000*60*60,secure: true,
        sameSite: 'none',})
    res.send('cookie enviada')
})
module.exports = router;