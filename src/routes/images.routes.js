const express = require("express")
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const controller = require("../controllers/images.controller")
const { validarID } = require("../middlewares/validarID")
const { validarCamposObligatorios } = require("../middlewares/validarCampos")
const { validarSesion } = require("../middlewares/auth/validarSesion");
const { validarPermiso } = require("../middlewares/auth/autorizarAccionSegunPermiso");

router.get("/",controller.getImages)
router.get("/all",controller.getImagesRemote)
router.get("/:id",validarID(),controller.getOneImage)

router.use(validarSesion()) //Aplica a todas las rutas, dejar los .get ANTES.

router.delete("/",validarPermiso("image:delete"),controller.deleteAllImages)
router.delete("/:id",validarPermiso("image:delete"),validarID(),controller.deleteImage)

router.use(upload.single('file'),validarCamposObligatorios(["name"])) //Validar que suban un archivo con campo name

router.post("/",validarPermiso("image:add"),controller.AddImage)
router.put("/:id",validarPermiso("image:update"),validarID(),controller.updateImage)

module.exports = router