const jwt = require('jsonwebtoken')

exports.validarCookie = ()=>{
    return (req,res,next)=>{
        const token = req.cookies.access_token
        data = {}
        if (token){
            try {
                data = jwt.verify(token,process.env.JWT_SECRET_KEY)
            } catch (error) {
                return res.status(400).json({
                    error: "Error en validacion de cookie",
                    details: error.message
                })
                
            }   
        } else {
            return res.status(404).json({
                error: "No hay una sesion activa.",
            })
        }
        req.data = data
        next()
    }   
}