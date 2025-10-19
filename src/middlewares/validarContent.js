const content = require("../schemas/content")

exports.validarContent = ()=>{    
    return (req,res,next)=>{
        const result = content.serieSchema.safeParse(req.body)
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