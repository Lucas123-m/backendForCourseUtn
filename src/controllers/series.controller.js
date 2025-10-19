const service = require("../services/animeBD.service")
const csvService = require("../services/csvreader")
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
        return res.status(500).json({ error: 'Error al intentar agregar un anime.' });
    }
}
exports.ImportAnimeSeries = async (req, res) => {
    console.log(req.file.path)
    try {
        const results = await csvService.readCSV(req.file.path)
        console.log(results)
        return res.status(201).json({info:"Se ha importado.",details: results.info});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar importar.',details: err});
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