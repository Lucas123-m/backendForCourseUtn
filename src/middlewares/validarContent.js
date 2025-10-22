const { contentSchema } = require("../schemas/anime")

exports.validarContent = ()=>{    
    return (req,res,next)=>{
        const result = contentSchema.safeParse(req.body)
        console.log(result)
        if(!result.success){
            return res.status(400).json({
                error: "Error en validacion de campos",
                details: result.error
            })
        }
        next()
    }
}