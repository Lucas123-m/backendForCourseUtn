const serviceBD = require("../services/usersBD.service")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

require("dotenv").config()

exports.register = async (req,res)=>{
    try{
        const {username,password} = req.body
        const validation = await serviceBD.getUser(req.body.username)
        if (validation[0].length>0){
            return res.status(404).json({details: "El usuario ya existe."})
        }
        const hashedPwd = await bcrypt.hash(password,parseInt(process.env.SEED_HASH))
        const result = await serviceBD.register({username:username,pwd: hashedPwd})
        const id = result[0].insertId
        const token = jwt.sign({id: id,username: username},process.env.JWT_SECRET_KEY,{
            expiresIn: '1h'
        })
        res.cookie('access_token',token,{maxAge: 1000*60*60})
        return res.status(200).json({user: username})
    } catch(err) {
        return res.status(404).json({details: err.message})
    }
}

exports.login = async (req,res)=>{
    const {pwd} = req.body
    try {
        const resultado = await serviceBD.getUser(req.body)
        if (resultado[0].length==0){
            return res.status(404).json({details: "El usuario no existe."})
        }
        const user = resultado[0][0]
        const token = jwt.sign({id: user.id,username: user.username},process.env.JWT_SECRET_KEY,{
            expiresIn: '1h'
        })
        console.log(user,user.username  )
        res.cookie('access_token',token,{maxAge: 1000*60*60,httpOnly:true,SameSite:'lax',secure: false})
        res.status(200).json({usr: user.username,token_value: token})
    }catch(error){
        res.status(500).json({err: error.message})
    }
}

exports.renderInitialPage = async (req,res)=>{
    return res.render('index',req.data)
}

exports.renderProtected = async(req,res)=>{
    if(req.data){
        res.render('protected',req.data)
    } else {
        res.status(404).send("Se debe iniciar sesion para entrar a esta pagina")
    }
    return
}

exports.deleteCookieSession = async (req,res)=>{
    const token = req.cookies.access_token
    if (token == undefined) {
        return res.status(500).send("Error al borrar sesion")
    }
    res.clearCookie("access_token")
    res.send("Sesion cerrada correctamente")
}

exports.checkCookie = async (req,res)=>{
    if (Object.keys(req.data).length === 0){
        return res.status(404).json({info:"No hay cookies o no es valida."})
    }
    return res.status(200).json({cookie: req.data})
}