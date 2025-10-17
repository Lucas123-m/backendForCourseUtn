require("dotenv").config()
const express = require("express")
const cors = require("cors")
const animeRouter = require("./src/routes/anime.routes")

const app = express();

app.use(cors({origin: (origin,callback)=>{
    const optionsOrigin = ['http://localhost:5173']
    if (optionsOrigin.some((elem)=>elem===origin)){
        return callback(null,true)
    }

    if (!origin){
        return callback(null,true)
    }
    return callback(new Error(("Error de CORS")))
}}))
app.use(express.json())
app.use("/animes",animeRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

