const express = require("express")
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const controller = require("../controllers/images.controller")
const { validarID } = require("../middlewares/validarID")
const { validarCamposObligatorios } = require("../middlewares/validarCampos")
const { validarSesion } = require("../middlewares/auth/validarSesion");

router.get("/",controller.getImages)
router.get("/all",controller.getImagesRemote)
router.get("/:id",validarID(),controller.getOneImage)

router.use(validarSesion()) //Aplica a todas las rutas, dejar los .get ANTES.

router.delete("/",controller.deleteAllImages)
router.delete("/:id",validarID(),controller.deleteImage)

router.use(validarCamposObligatorios(["name"]))

router.post("/",upload.single('file'),controller.AddImage)
router.put("/:id",upload.single('file'),validarID(),controller.updateImage)

module.exports = router