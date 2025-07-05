exports.validarID = ()=>{
    return (req,res,next)=>{
        if (req.params.id <= 0){
            return res.status(404).json({
                error: "Id no valido como parametro.",
            })
        }
        next()
    }   
}