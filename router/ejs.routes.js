const express = require("express")
const router = express.Router()
router.get("/users",(req,res)=>{
    res.render("ejs/users")
})

router.get("/dashboard",(req,res)=>{
    res.render("ejs/dashboard")
})

module.exports = router;