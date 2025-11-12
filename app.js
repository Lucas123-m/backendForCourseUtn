require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
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
},
credentials: true
}))*/
app.use(cookieParser())
//app.use(cors({credentials: true }))
app.set('view engine','ejs')
app.use(express.json())
app.get("/",(req,res)=>{
    //res.send("<h1>Hola mundo!</h1>")
    console.log("cookies:",req.cookies)
    const token = req.cookies.access_token
    if (!token){
        return res.status(404).send('Access not authorized.')
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET_KEY)
    } catch (error) {
        return res.status(404).send('Error.')
    }
    console.log(data)
    res.render('protected',data)
})
app.use("/animes/series",seriesRouter)
app.use("/animes/images",imagesRouter)
app.use("/users",usersRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

