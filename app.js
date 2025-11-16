require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const path = require('path')
const seriesRouter = require("./src/routes/series.routes")
const imagesRouter = require("./src/routes/images.routes")
const usersRouter = require("./src/routes/users.routes")
const app = express();

/*app.use(cors({origin: (origin,callback)=>{
    const optionsOrigin = ['http://localhost:5173','http://localhost:3000']
    if (optionsOrigin.some((elem)=>elem===origin)){
        return callback(null,true)
    }

    if (!origin){
        return callback(null,true)
    }
    return callback(new Error(("Error de CORS")))
},credentials: true}))*/
app.use(cors({origin: true,credentials: true}))
app.use(express.json())
app.use(cookieParser())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use("/animes/series",seriesRouter)
app.use("/animes/images",imagesRouter)
app.use("/users",usersRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

