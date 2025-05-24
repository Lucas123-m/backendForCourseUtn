const express = require("express")
const router = express.Router()
const users = {1:{name:"Lucas",age:24},2:{name:"Pedro",age:22}}

router.get("/",(req,res)=>{
    res.json(users)
})

router.get("/:id",(req,res)=>{
    //queries=> url +?variable=valor&variable2=valor2 
    console.log(req.query)
    const { id } = req.params
    res.send(users[id])
})
  
router.post("/",(req,res)=>{
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
  
router.put("/:id",(req,res)=>{
    const { id } = req.params
    const datos = req.body;
    console.log(datos)
    if (!(id in users)){
      res.send(`No existe el id ${id} en ${JSON.stringify(users)}`)
      return
    }
    if (!("age" in datos && "name" in datos)){
      res.send(`No existe el campo age o name en ${JSON.stringify(datos)}`)
      return
    }
    users[id]["name"]=datos["name"]
    users[id]["age"]=datos["age"]
    res.send(users)
})
  
router.delete("/:id",(req,res)=>{
    const { id } = req.params
    if (!(id in users)){
      res.send(`No existe el id ${id} en ${JSON.stringify(users)}`)
      return
    }
    delete users[id]
    res.send(users)
})
  
router.get("/mipagina",(req,res)=>{
  res.render("/views/index.html")
})
  
module.exports = router;