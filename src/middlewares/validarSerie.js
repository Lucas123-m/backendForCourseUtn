const serie = require("../schemas/serie")

exports.validarSerie = ()=>{    
    return (req,res,next)=>{
        const result = serie.serieSchema.safeParse(req.body)
        if(!result.success){
            return res.status(400).json({
                error: "Error en validacion de campos",
                details: result.error
            })
        }
        next()
    }
}