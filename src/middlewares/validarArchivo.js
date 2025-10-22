exports.validarArchivo = ()=>{    
    return (req,res,next)=>{
        if (!req.file){
            return res.status(400).json({error : "No se ha enviado ningun archivo csv."})
        }
        next()
    }
}