const { serieSchema }  = require("../schemas/anime")

exports.validarSerie = ()=>{    
    return (req,res,next)=>{
        const result = serieSchema.safeParse(req.body)
        if(!result.success){
            return res.status(400).json({
                error: "Error en validacion de campos",
                details: result.error
            })
        }
        next()
    }
}