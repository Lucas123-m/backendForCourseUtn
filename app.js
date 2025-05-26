const express = require("express")
const app = express()
const PORT = 3000
const bp = require('body-parser')
const usersRouter = require("./router/users.routes")
const path = require("path")
require("ejs")

const morgan = require("morgan")
app.set("views",path.join(__dirname,"public","views"))
app.set("view engine","ejs")

//middleware logger
app.use(morgan())
app.use(bp.json())

//Al poner http://localhost:3000/ ya me despliega, sin necesidad de un app.get en "/"
app.use(express.static("public"))
app.use(express.static("public/views"))

app.get("/contacto",(req,res)=>{
  res.send("contacto")
})

app.get("/ejs",(req,res)=>{
  const title  = "xdddd"
  res.render("page",{title:title})  
})

app.use("/api/users",usersRouter)

app.listen(PORT,()=>{
  console.log(`Server working in http://localhost:3000`)
})