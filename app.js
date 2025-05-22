const express = require("express")
const app = express()
const PORT = 3000
const bp = require('body-parser')

const users = {1:{name:"Lucas",age:24},2:{name:"Pedro",age:22}}

app.use(bp.json())
app.get("/",(req,res)=>{
  res.send("Hola desde express")
})

app.get("/contacto",(req,res)=>{
  res.send("contacto")
})

app.get("/api/users",(req,res)=>{
  res.json(users)
})

app.get("/api/users/:id",(req,res)=>{
  const { id } = req.params
  res.send(users[id])
})

app.post("/api/users",(req,res)=>{
  const datos = req.body;
  console.log(datos)
  if ("id" in datos && "name" in datos && "age" in datos && !(datos["id"] in users)){
    users[datos["id"]]={name:datos["name"],age:datos["age"]}

    res.json(users)
  } else {
    console.log("id" in datos)
    console.log("name" in datos)
    console.log("age" in datos)
    console.log(!(datos["id"] in users))
    console.log("id" in datos && "name" in datos && "age" in datos && !datos["id"] in users)
    res.send("Ocurrio un error al mandar el dato")
  }

})

app.put("api/users/:id",(req,res)=>{
  const datos = req.body;
  console.log(datos)
  if (!("id" in datos)){
    res.send(`No existe el campo id en ${datos}`)
    return
  }
  if (!(datos["id"] in users)){
    res.send(`No existe el id en ${users}`)
    return
  }
  if (!("age" in datos || "name" in datos)){
    res.send(`No existe el campo age o name en ${datos}`)
    return
  }
  users[datos["id"]]["name"]=datos["name"]
  users[datos["id"]]["age"]=datos["age"]
  res.send(users)
})


app.listen(PORT,()=>{
  console.log(`Server working in http://localhost:3000`)
})