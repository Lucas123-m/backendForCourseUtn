require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

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
app.use(express.json())
app.use(cookieParser())
app.set('view engine','ejs')
app.get("/",(req,res)=>{
    const token = req.cookies.access_token
    var data = {}
    if (token){
        try {
            data = jwt.verify(token,process.env.JWT_SECRET_KEY)
        } catch (error) {
            console.log("Error",error.message)
        }   
        return res.render('index',data)
    } else {
        return res.render('index')
    }
})
app.get("/protected",(req,res)=>{
    const token = req.cookies.access_token
    var data = {}
    console.log(token)
    if (token){
        try {
            data = jwt.verify(token,process.env.JWT_SECRET_KEY)
            console.log(data)
        } catch (error) {
            console.log("Error",error.message)
        }   
        return res.render('protected',data)
    } else {
        return res.render('protected')
    }
})
app.post("/logout",(req,res)=>{
    const token = req.cookies.access_token
    if (token == undefined) {
        return res.status(500).send("Error al borrar sesion")
    }
    res.clearCookie("access_token")
    res.send("Sesion cerrada correctamente")
})
app.use("/animes/series",seriesRouter)
app.use("/animes/images",imagesRouter)
app.use("/users",usersRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

