const serviceBD = require("../services/usersBD.service")
const bcrypt = require('bcrypt');
require("dotenv").config()

exports.register = async (req,res)=>{
    try{
        const {username,pwd} = req.body
        console.log(username,pwd)
        const validation = await serviceBD.getUser(req.body.username)
        if (validation[0].length>0){
            return res.status(404).json({details: "El usuario ya existe."})
        }
        const hashedPwd = await bcrypt.hash(pwd,parseInt(process.env.SEED_HASH))
        const result = await serviceBD.register({username:username,pwd: hashedPwd})
        return res.status(200).json({user: username})
    } catch(err) {
        return res.status(404).json({details: err.message})
    }
}