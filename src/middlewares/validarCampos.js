exports.validarCamposObligatorios = (campos)=>{
    return (req,res,next)=>{
        const faltantes = [];
        for (let campo of campos){
            
            const valor = req.body?.[campo];
            if (!valor){
                faltantes.push(campo)
            }
        }
        if (faltantes.length){
            return res.status(400).json({
                error: "Faltan campos obligatorios",
                campos: faltantes
            })
        }
        next()
    }   
}