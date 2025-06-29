const service = require("../services/anime.service")

exports.getAllAnimeSeries = async (req, res) => {
    try {
        const animes = await service.getAllAnimes()
        res.json(animes)
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener animes.' });
    }
}
exports.getAllAnimeContent = async (req, res) => {
    try {
        const animes = await service.getAllContent()
        res.json(animes)
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener contenido de anime.' });
    }
}
exports.getOneSerie = async (req, res) => {
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
        res.status(201).json(anime);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar agregar un anime.' });
    }
}
exports.AddAnimeContent = async (req, res) => {
    try {
        const content = await service.addAnimeContent(req.body)
        res.status(201).json(content);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar agregar un contenido de anime.' });
    }
}

exports.deleteAnimeSerie = async (req, res) => {
    try {
        const deleted = await service.removeAnime(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar borrar un anime.' });
    }
}
exports.deleteAnimeContent = async (req, res) => {
    try {
        const deleted = await service.removeContent(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar borrar un contenido de anime..' });
    }
}
exports.updateAnimeSerie = async (req, res) => {
    try {
        const updated = await service.updateAnime(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar actualizar datos de un anime.' });
    }
}
exports.updateAnimeContent = async (req, res) => {
    try {
        const updated = await service.updateContent(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar actualizar datos de un contenido de anime.' });
    }
}    