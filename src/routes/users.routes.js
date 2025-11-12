const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth.controller")

router.get("/",(req,res)=>{
    console.log(req.cookies)
    res.send(req.cookies)
})
router.get("/prueba",(req,res)=>{
    /*res.cookie('prueba','Holaaa',{httpOnly:false,maxAge: 1000*60*60,secure: true,
        sameSite: 'none',})*/
    res.cookie("name","Lucas")
    res.send('cookie enviada')
})
router.post("/register",controller.register)
router.post("/login",controller.login)
router.post("/prueba",(req,res)=>{
    console.log("--- Reached /prueba route. Attempting to set cookie ---");
    res.cookie("cookie-pro","cookie",{httpOnly:true,maxAge:1000*60*60*24})
    console.log(req.cookies)
    res.send('cookie enviada')
})
module.exports = router;