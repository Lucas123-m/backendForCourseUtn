const express = require("express")
const morgan = require("morgan")

const app = express()

const animes = [
    {
        id:1,
        title:"Ascendance of a bookworm",
        seasons:3
    }
]
app.set("valor_geneal","hola!") //se accede con app.get("valor_general")
app.set("case sensitive routing",true) //conf general para todo nuestro app
app.use(morgan("dev"))
app.use(express.json())

app.get("/animes",(req,res)=>{res.json(animes)})
app.post("/animes",(req,res)=>{
    console.log(req.body)
    const newAnime = {...req.body,id:animes.length+1}
    animes.push(newAnime)
    res.send(animes)
})
app.put("/animes/:id",(req,res)=>{
    console.log(animes)
    const index = animes.findIndex((elem)=>{return elem.id===parseInt(req.params.id)})
    if (index>-1){
        //esto NO pisa en caso de que se borre un key:value en un objeto, OJO.
        animes[index]={...animes[index],...req.body}
        res.json(animes)
    } else {
        res.status(404).json({message:`No existe el anime de id ${req.params.id}`})
    }
})
app.delete("/animes/:id",(req,res)=>{
    const index = animes.findIndex((elem)=>{return elem.id==parseInt(req.params.id)})
    console.log(index)
    if (index >= 0) {
        animes.splice(index)
        res.json(animes)
    } else {
        res.status(404).json({message:`No existe el anime de id ${req.params.id}`})
    }
})
app.get("/animes/:id",(req,res)=>{
    const anime = animes.find((elem)=>{return elem.id==parseInt(req.params.id)})
    if (anime) {
        res.json(anime)
    } else {
        res.status(404).json({message:`No existe el anime de id ${req.params.id}`})
    }
})
app.listen(3000,()=>{
    console.log(`Server working in http://localhost:3000`)
})