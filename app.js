const express = require("express")
const app = express()
const PORT = 3000
const bp = require('body-parser')
const usersRouter = require("./router/users.routes")


app.use(bp.json())

//Al poner http://localhost:3000/ ya me despliega, sin necesidad de un app.get en "/"
app.use(express.static("public"))
app.use(express.static("public/views"))


app.get("/contacto",(req,res)=>{
  res.send("contacto")
})

app.use("/api/users",usersRouter)

app.listen(PORT,()=>{
  console.log(`Server working in http://localhost:3000`)
})