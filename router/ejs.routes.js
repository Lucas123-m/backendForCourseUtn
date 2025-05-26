const express = require("express")
const router = express.Router()
const axios = require("axios")
const mailController = require('./../controller/mail.controller');

router.get("/",(req,res)=>{
    const titleContent  = "Hola a todos desde ejs"
    res.render("ejs/page",{title:titleContent,isActive:false})  
})

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

router.get("/dashboard",async (req,res)=>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
    res.render("ejs/dashboard",{posts:response.data})
})

router.get("/animes",async (req,res)=>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
    res.render("ejs/dashboard",{posts:response.data})
})

router.get("/contact",(req,res)=>{
    res.render("ejs/contact")
})
router.post("/send-email",mailController.sendEmail)

module.exports = router;