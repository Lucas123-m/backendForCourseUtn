const service = require("../services/animeBD.service")
const serviceImg = require("../services/images.service")

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
exports.getImages = async (req, res) => {
    try {
        const images = await service.getAllImages()
        return res.json(images)
    } catch (err) {
        return res.status(500).json({ error: 'Error al obtener imagenes.' });
    }
}
exports.getOneImage = async (req, res) => {
    try {
        const image = await service.getImage(req.params.id)
        if (!image.length){
            return res.status(404).json({error: 'Imagen no encontrada.'})
        }
        return res.json(image)
    } catch (err) {
        return res.status(500).json({ error: 'Error al obtener imagen.' });
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
exports.AddAnimeContent = async (req, res) => {
    try {
        const content = await service.addAnimeContent(req.body)
        return res.status(201).json({info:"Se ha agregado un contenido correctamente."});
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar agregar un contenido de anime.' });
    }
}

exports.AddImage = async (req, res) => {
    try {
        const data = await serviceImg.uploadImage(req.file)
        const content = await service.addAnimeImage(data,req.body)
        return res.status(201).json(content);
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar subir una imagen.' });
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

exports.deleteImage = async (req, res) => {
    try {
        const images = await service.getAllImages()
        const imagesFilter = images.filter((elem)=> {
            return(elem.id===parseInt(req.params.id))
        })
        const public_id = imagesFilter[0]?.public_id
        if (public_id){
            const deleted = await service.removeImage(req.params.id);
            if (!deleted[0].affectedRows || !deleted[0].affectedRows===1 ){
                return res.status(500).json({error: "Ha ocurrido un error inesperado en la bbdd al intentar borrar la imagen.",detail: deleted})
            } 
            const deleteImage = await serviceImg.deleteRemoteImage(public_id)
            console.log(deleteImage["result"],deleteImage?.["result"] === "ok")
            if (!(deleteImage?.["result"] === "ok")){
                return res.status(500).json({error: "Ha ocurrido un error al borrar en cloudinary la imagen.",detail: deleteImage})
            } 
            return res.json({info: "Se ha borrado la imagen correctamente"})
        } else {
            return res.status(404).json({error:"No hay una imagen con el id informado."})
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar borrar una imagen...',detail: err.toString() });
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

exports.updateImage = async (req, res) => {
    //caso 1: Se mantiene la imagen pero cambio el nombre. entonces, url, public_id, quedan iguales
    //caso 2: Se mantiene el nombre pero cambio la imagen. entonces name queda igual 
    //,borro la imagen anterior en cloudinary y subo la nueva imagen para obtener nuevos campos 
    // y actualizar en bbdd
    //caso 3: cambian ambos. delete cloudinary y subir, cambio todo. 2 y 3 
    let newDataImg = {name: "",public_id: "",url:""}
    let dataImgBD = {}
    if (req.body?.name){
        newDataImg["image"] = req.body.name
    } else {
        //se mantiene el nombre, cambia la imagen
        dataImgBD = await service.getImage(req.params.id)
        newDataImg["image"]  = dataImgBD["name"]
    }
    var dataImg = {public_id: "",url:""}
    if (req.file){
        const response = await serviceImg.uploadImage(req.file)
        // if response ok...
        console.log("respuesta: ",response)
        dataImg["public_id"] = response["public_id"]
        dataImg["url"] = response["url"]

        console.log("dataimg:",dataImg)
    } else {
        //se mantiene la imagen, cambia el nombre
        dataImgBD = await service.getImage(req.params.id)
        dataImg["public_id"] = dataImgBD["public_id"]
        dataImg["url"] = dataImgBD["url"]
    }
    service.updateImage(req.params.id,newDataImg)
    res.json({info: "todo ok"})
}
