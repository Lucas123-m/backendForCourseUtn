const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(morgan())

app.get("/animes",(req,res)=>{res.send("Obteniendo animes")})
app.post("/animes",(req,res)=>{res.send("Agregando animes")})
app.put("/animes",(req,res)=>{res.send("Modificando animes")})
app.delete("/animes",(req,res)=>{res.send("Borrando animes")})
app.get("/animes/:id",(req,res)=>{res.send("Obteniendo 1 anime")})

app.listen(3000,()=>{
    console.log(`Server working in http://localhost:3000`)
})