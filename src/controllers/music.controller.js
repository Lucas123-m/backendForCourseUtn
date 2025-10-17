const serviceImg = require("../services/animeBD.service")

exports.getImages = async (req, res) => {
    try {
        const images = await serviceImg.getAllImages()
        console.log(images)
        return res.json(images)
    } catch (err) {
        return res.status(500).json({ error: 'Error al obtener imagenes.' });
    }
}
exports.getOneImage = async (req, res) => {
    try {
        const image = await serviceImg.getImage(req.params.id)
        if (!image.length){
            return res.status(404).json({error: 'Imagen no encontrada.'})
        }
        return res.json(image)
    } catch (err) {
        return res.status(500).json({ error: 'Error al obtener imagen.' });
    }
}

exports.AddImage = async (req, res) => {
    try {
        if (!req.file){
            return res.status(400).json({error : "No se ha enviado ninguna imagen."})
        }
        const data = await serviceImgImg.uploadImage(req.file)
        const content = await serviceImg.addAnimeImage(data,req.body)
        return res.status(201).json(content);
    } catch (err) {
        return res.status(500).json({ error: 'Error al intentar subir una imagen.' });
    }
}

exports.deleteImage = async (req, res) => {
    try {
        const images = await serviceImg.getAllImages()
        const imagesFilter = images.filter((elem)=> {
            return(elem.id===parseInt(req.params.id))
        })
        const public_id = imagesFilter[0]?.public_id
        if (public_id){
            const deleted = await serviceImg.removeImage(req.params.id);
            if (!deleted[0].affectedRows || !deleted[0].affectedRows===1 ){
                return res.status(500).json({error: "Ha ocurrido un error inesperado en la bbdd al intentar borrar la imagen.",detail: deleted})
            } 
            const deleteImage = await serviceImgImg.deleteRemoteImage(public_id)
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

exports.updateImage = async (req, res) => {
    let newDataImg = {name: "",public_id: "",url:""}
    let dataImgBD =  await serviceImg.getImage(req.params.id)
    if (!dataImgBD.length){
        return res.status(400).json({error: "No se ha encontrado la imagen en la bbdd"})
    } 
    dataImgBD = dataImgBD[0]
    if (req.body?.name){
        newDataImg["name"] = req.body.name
    } else {
        //se mantiene el nombre, cambia la imagen
        newDataImg["name"]  = dataImgBD["name"]
    }
    if (req.file){
        const resImgUploaded = await serviceImgImg.uploadImage(req.file)
        // if response ok...
        const resImgDeleted = await serviceImgImg.deleteRemoteImage(dataImgBD.public_id)
        newDataImg["public_id"] = resImgUploaded["public_id"]
        newDataImg["url"] = resImgUploaded["url"]
    } else {
        //se mantiene la imagen, cambia el nombre
        
        newDataImg["public_id"] = dataImgBD["public_id"]
        newDataImg["url"] = dataImgBD["url"]
    }
    const data = await serviceImg.updateImage(req.params.id,newDataImg)
    res.json({info: "todo ok",detail: data})
}
