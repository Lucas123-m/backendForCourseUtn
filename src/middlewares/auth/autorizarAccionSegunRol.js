
exports.autorizarRol = ()=>{
    return (req,res,next)=>{
        console.log(req.data)
        return res.status(400).json({
            error: "Error en validacion de rol",
            details: "Rechazo todo como prueba"
        })
    }
}