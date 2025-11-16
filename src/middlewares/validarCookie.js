const jwt = require('jsonwebtoken')

exports.validarCookie = ()=>{
    return (req,res,next)=>{
        const token = req.cookies.access_token
        data = {}
        if (token){
            try {
                data = jwt.verify(token,process.env.JWT_SECRET_KEY)
            } catch (error) {
                res.status(400).json({
                    error: "Error en validacion de cookie",
                    details: error.message
                })
                return
            }   
        }
        req.data = data
        next()
    }   
}