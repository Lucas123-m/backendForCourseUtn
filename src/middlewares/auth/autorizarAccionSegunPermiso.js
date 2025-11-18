const serviceBD = require("../../services/usersBD.service")

exports.validarPermiso = (action)=>{
    return async (req,res,next)=>{
        const result = await serviceBD.getUserAndPermission({permission: action,username: req.data.username})
        if (result[0].length===0)
        return res.status(500).json({
            error: "El usuario no tiene los permisos para realizar la acción."
        })
        next()
    }
}