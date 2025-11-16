const {userSchema} = require("../schemas/user")

exports.validarUser = ()=>{
    return (req,res,next)=>{
        const result = userSchema.safeParse(req.body)
        if(!result.success){
            return res.status(400).json({
                error: "Error en validacion de campos",
                details: result.error
            })
        }
        next()
    }
}