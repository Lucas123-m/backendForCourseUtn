const express = require("express")
const router = express.Router()
router.get("/users",(req,res)=>{
    const users = [{
        id:1,
        name:"Lucas",
        surname:"Miño"
    },{
        id:2,
        name:"pedro",
        surname:"gonzalez"
    }]
    res.render("ejs/users",{users})
})

router.get("/dashboard",(req,res)=>{
    res.render("ejs/dashboard")
})

module.exports = router;