const service = require("../services/animeBD.service")
const serviceImg = require("../services/images.service")

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
exports.getImages = async (req, res) => {
    try {
        const images = await service.getAllImages()
        res.json(images)
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener imagenes.' });
    }
}
exports.getOneImage = async (req, res) => {
    try {
        const image = await service.getImage(req.params.id)
        if (!image.length){
            return res.json({info: 'Imagen no encontrada.'})
        }
        res.json(image)
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener imagen.' });
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

exports.AddImage = async (req, res) => {
    try {
        const url = await serviceImg.uploadImage(req.file)
        const content = await service.addAnimeImage(url,req.body)
        res.status(201).json(content);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error al intentar agregar un contenido de anime.' });
    }
}

exports.deleteAnimeSerie = async (req, res) => {
    try {
        const deleted = await service.removeAnime(req.params.id);
        if (!deleted[0].affectedRows){
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
        if (!deleted[0].affectedRows){
            return res.json({info:"No hay contenidos de anime con el id informado."})
        }
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar borrar un contenido de anime..' });
    }
}

exports.deleteImage = async (req, res) => {
    try {
        console.log("id:",req.params.id,typeof(req.params.id))
        const deleted = await service.removeImage(req.params.id);
        console.log(deleted)
        if (!deleted[0].affectedRows){
            return res.json({info:"No hay una imagen con el id informado."})
        }
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar borrar una imagen de la bbdd...' });
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

exports.updateImage = async (req, res) => {
    try {
        const updated = await service.updateImage(req.params.id, req.body);
        if (!updated[0].affectedRows){
            return res.json({info:"No hay imagen con el id informado."})
        } else if (!updated[0].changedRows){
            return res.json({info:"No se hicieron cambios en la imagen informado."})
        }
        res.json({info:"Se ha actualizado la imagen correctamente."});
    } catch (err) {
        res.status(500).json({ error: 'Error al intentar actualizar datos de una imagen.' });
    }
} 