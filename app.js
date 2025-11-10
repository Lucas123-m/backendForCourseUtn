require("dotenv").config()
const express = require("express")
const cors = require("cors")
const seriesRouter = require("./src/routes/series.routes")
const imagesRouter = require("./src/routes/images.routes")
const usersRouter = require("./src/routes/users.routes")
const app = express();

app.use(cors({origin: (origin,callback)=>{
    const optionsOrigin = ['http://localhost:5173','http://localhost:3000']
    if (optionsOrigin.some((elem)=>elem===origin)){
        return callback(null,true)
    }

    if (!origin){
        return callback(null,true)
    }
    return callback(new Error(("Error de CORS")))
}}))
//app.use(cors())
app.set('view engine','ejs')
app.use(express.json())
app.get("/",(req,res)=>{
    //res.send("<h1>Hola mundo!</h1>")
    res.render('example',{name: "Lucas"})
})
app.use("/animes/series",seriesRouter)
app.use("/animes/images",imagesRouter)
app.use("/users",usersRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

