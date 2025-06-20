const service = require("../services/anime.service")

exports.getAllAnimeSeries = async (req, res) => {
    try {
        const animes = await service.getAllAnimes()
        if (!animes.length){
            return res.status(200).json({info:"No hay series de anime registradas en la base de datos."})
        }
        res.json(animes)
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener animes.' });
    }
}
exports.getAllAnimeContent = async (req, res) => {
    try {
        const contenidos = await service.getAllContent()
        if (!contenidos.length){
            return res.status(200).json({info:"No hay contenidos de anime registrados en la base de datos."})
        }
        res.json(contenidos)
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener contenido de anime.' });
    }
}
exports.getOneAnimeSerie = async (req, res) => {
    try {
        const anime = await service.getAnime(req.params.id)
        if (!anime.length){
            return res.status(404).json({error:"Anime no encontrado."})
        } 
        
        res.json(anime)
        
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener un anime.' });
    }
}
exports.getOneAnimeContent = async (req, res) => {
    try {
        const content = await service.getAnimeContent(req.params.id)
        if (!content.length){
            return res.status(404).json({error:"Contenido no encontrado."})
        }
        res.json(content)
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener un contenido de anime.' });
    }
}

exports.AddAnimeSerie = async (req, res) => {
    try {
        const anime = await service.addAnime(req.body)
        res.status(201).json({info:"Se ha agregado un anime correctamente."});
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar agregar un anime.' });
    }
}
exports.AddAnimeContent = async (req, res) => {
    try {
        const content = await service.addAnimeContent(req.body)
        res.status(201).json({info:"Se ha agregado un contenido correctamente."});
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar agregar un contenido de anime.' });
    }
}

exports.deleteAnimeSerie = async (req, res) => {
    try {
        const deleted = await service.removeAnime(req.params.id);
        if (!deleted[0].changedRows){
            return res.json({info:"No hay series de anime con el id informado."})
        }
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar borrar un anime.' });
    }
}
exports.deleteAnimeContent = async (req, res) => {
    try {
        const deleted = await service.removeContent(req.params.id);
        if (!deleted[0].changedRows){
            return res.json({info:"No hay contenidos de anime con el id informado."})
        }
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar borrar un contenido de anime..' });
    }
}
exports.updateAnimeSerie = async (req, res) => {
    try {
        const updated = await service.updateAnime(req.params.id, req.body);
        if (!updated[0].affectedRows){
            return res.json({info:"No hay animes con el id informado."})
        } else if (!updated[0].changedRows){
            return res.json({info:"No se hicieron cambios en el anime informado."})
        }
        res.json({info:"Se ha actualizado el anime correctamente."});
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar actualizar datos de un anime.' });
    }
}
exports.updateAnimeContent = async (req, res) => {
    try {
        const updated = await service.updateContent(req.params.id, req.body);
        if (!updated[0].affectedRows){
            return res.json({info:"No hay contenidos de anime con el id informado."})
        } else if (!updated[0].changedRows){
            return res.json({info:"No se hicieron cambios en el contenido informado."})
        }
        res.json({info:"Se ha actualizado el contenido correctamente."});
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar actualizar datos de un contenido de anime.' });
    }
}    