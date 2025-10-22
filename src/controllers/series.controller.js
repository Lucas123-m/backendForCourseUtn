const service = require("../services/animeBD.service")
const csvUtil = require("../utils/csvreader")
const {serieSchema,contentSchema} = require("../schemas/anime")
const { validateRow } = require("../utils/validateRowsCSV")
exports.getAllAnimeSeries = async (req, res) => {
    try {
        const animes = await service.getAllAnimes()
        if (!animes.length){
            return res.status(200).json({info:"No hay series de anime registradas en la base de datos."})
        }
        return res.json(animes)
    } catch (err) {
        return res.status(500).json({ error: 'Error al obtener animes.' });
    }
}

exports.getAllAnimeContent = async (req, res) => {
    try {
        const contenidos = await service.getAllContent()
        if (!contenidos.length){
            return res.status(200).json({info:"No hay contenidos de anime registrados en la base de datos."})
        }
        return res.json(contenidos)
    } catch (err) {
        return res.status(500).json({ error: 'Error al obtener contenido de anime.' });
    }
}
exports.getOneAnimeSerie = async (req, res) => {
    try {
        const anime = await service.getAnime(req.params.id)
        if (!anime.length){
            return res.status(404).json({error:"Anime no encontrado."})
        } 
        
        return res.json(anime)
        
    } catch (err) {
        return res.status(500).json({ error: 'Error al obtener un anime.' });
    }
}
exports.getOneAnimeContent = async (req, res) => {
    try {
        const content = await service.getAnimeContent(req.params.id)
        if (!content.length){
            return res.status(404).json({error:"Contenido no encontrado."})
        }
        return res.json(content)
    } catch (err) {
        return res.status(500).json({ error: 'Error al obtener un contenido de anime.' });
    }
}

exports.AddAnimeSerie = async (req, res) => {
    try {
        const anime = await service.addAnime(req.body)
        return res.status(201).json({info:"Se ha agregado un anime correctamente."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar agregar un anime.',details: err});
    }
}
exports.ImportAnimeSeries = async (req, res) => {
    try {
        const results = await csvUtil.readCSV(req.file.path)
        var validacion = {}
        const error = {errores: {}}
        for (const [index, value] of results.data.entries()){
            validacion = validateRow(value,serieSchema)
            if(!validacion.success){
                error.errores[index+1] = validacion.error
            } else {
                try{
                    await service.addAnime(value)
                } catch (err){
                    error.errores[index+1] = err
                }
            }
        }
        if (Object.keys(error.errores).length > 0){
            return res.status(400).json({ error: 'Error al intentar importar, formato incorrecto.',details: error.errores});
        }
        return res.status(201).json({info:"Se ha importado."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar importar, ver.'});
    }

}
exports.AddAnimeContent = async (req, res) => {
    try {
        const content = await service.addAnimeContent(req.body)
        return res.status(201).json({info:"Se ha agregado un contenido correctamente."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar agregar un contenido de anime.' });
    }
}
exports.ImportAnimeContent = async (req, res) => {
    try {
        const results = await csvUtil.readCSV(req.file.path)
        var validacion = {}
        const error = {errores: {}}
        for (const [index, value] of results.data.entries()){
            validacion = validateRow(value,contentSchema)
            console.log("values:",index,value)
            if(!validacion.success){
                error.errores[index+1] = validacion.error
            } else {
                try{
                    const anime = await service.getAnime(value.id_serie)
                    if (!anime.length){
                        throw new Error(`No existe una serie con id ${value.id_serie}.`)
                    }
                    await service.addAnimeContent(value)
                } catch (err){
                    error.errores[index+1] = err.message
                }
            }
        }
        if (Object.keys(error.errores).length > 0){
            return res.status(400).json({ error: 'Error al intentar importar, formato incorrecto.',details: error.errores});
        }
        return res.status(201).json({info:"Se ha importado."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar importar.',details: `${err.name} - ${err.stack}`});
    }

}
exports.deleteAnimeSerie = async (req, res) => {
    try {
        const deleted = await service.removeAnime(req.params.id);
        if (!deleted[0].affectedRows){
            return res.status(404).json({error:"No hay series de anime con el id informado."})
        }
        return res.json({info: "Se ha borrado el anime correctamente."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar borrar un anime.' });
    }
}
exports.deleteAnimesFromFile = async (req, res) => {
    try {
        const results = await csvUtil.readCSV(req.file.path)
        if (results.data.length<= 0){
            return res.status(404).json({ error: 'No se especifican IDs en el archivo.' });
        }
        const keys = Object.keys(results.data[0])
        if (keys.length>1 || keys[0].toLowerCase()!== "id"){
            return res.status(404).json({ error: 'Formato de columnas incorrecto, debe ser una sola con titulo id.' });
        }
        const error = {errores: {}}
        for (const [index,value] of results.data.entries()){
            if(!isNaN(value.id) && Number(value.id) > 0 && Number.isInteger(Number(value.id))){
                try {
                    const deleted = await service.removeAnime(Number(value.id));
                    if (!deleted[0].affectedRows){
                        error.errores[index+1] = "No hay series de anime con el id informado."
                    }
                } catch (err){
                    error.errores[index+1]=`Error al borrar un anime: ${err.stack}.`
                }
            } else {
                error.errores[index+1]=`No se indicó un ID numerico valido.`
            }
        }
        if (Object.keys(error.errores).length > 0){
            return res.status(400).json({ error: 'Error al intentar borrar animes.',details: error.errores});
        }
        return res.status(201).json({info:"Se han borrado los animes correctamente."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar borrar un anime.',details: `${err.stack}`});
    }
}
exports.deleteAnimeContent = async (req, res) => {
    try {
        const deleted = await service.removeContent(req.params.id);
        if (!deleted[0].affectedRows){
            return res.status(404).json({error:"No hay contenidos de anime con el id informado."})
        }
        return res.json({info: "Se ha borrado el contenido correctamente."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar borrar un contenido de anime..' });
    }
}

exports.deleteContentFromFile = async (req, res) => {
    try {
        const results = await csvUtil.readCSV(req.file.path)
        if (results.data.length<= 0){
            return res.status(404).json({ error: 'No se especifican IDs en el archivo.' });
        }
        const keys = Object.keys(results.data[0])
        if (keys.length>1 || keys[0].toLowerCase()!== "id"){
            return res.status(404).json({ error: 'Formato de columnas incorrecto, debe ser una sola con titulo id.' });
        }
        const error = {errores: {}}
        for (const [index,value] of results.data.entries()){
            if(!isNaN(value.id) && Number(value.id) > 0 && Number.isInteger(Number(value.id))){
                try {
                    const deleted = await service.removeContent(Number(value.id));
                    if (!deleted[0].affectedRows){
                        error.errores[index+1] = "No hay contenido con el id informado."
                    }
                } catch (err){
                    error.errores[index+1]=`Error al borrar un contenido: ${err.stack}.`
                }
            } else {
                error.errores[index+1]=`No se indicó un ID numerico valido.`
            }
        }
        if (Object.keys(error.errores).length > 0){
            return res.status(400).json({ error: 'Error al intentar borrar contenidos.',details: error.errores});
        }
        return res.status(201).json({info:"Se han borrado los contenidos correctamente."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar borrar un contenidos.',details: `${err.stack}`});
    }
}

exports.updateAnimeSerie = async (req, res) => {
    try {
        const updated = await service.updateAnime(req.params.id, req.body);
        if (!updated[0].affectedRows){
            return res.status(404).json({error:"No hay animes con el id informado."})
        } else if (!updated[0].changedRows){
            return res.json({info:"No se hicieron cambios en el anime informado."})
        }
        return res.json({info:"Se ha actualizado el anime correctamente."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar actualizar datos de un anime.' });
    }
}
exports.updateAnimeContent = async (req, res) => {
    try {
        const updated = await service.updateContent(req.params.id, req.body);
        if (!updated[0].affectedRows){
            return res.status(404).json({error:"No hay contenidos de anime con el id informado."})
        } else if (!updated[0].changedRows){
            return res.json({info:"No se hicieron cambios en el contenido informado."})
        }
        return res.json({info:"Se ha actualizado el contenido correctamente."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar actualizar datos de un contenido de anime.' });
    }
} 