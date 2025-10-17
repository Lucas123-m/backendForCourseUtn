const express = require("express")
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const controller = require("../controllers/music.controller")
const { validarID } = require("../middlewares/validarID")
const { validarCamposObligatorios } = require("../middlewares/validarCampos")


router.get("/",controller.getImages)
router.get("/:id",validarID(),controller.getOneImage)

router.post("/",upload.single('file'),validarCamposObligatorios(["name"]),controller.AddImage)

router.delete("/:id",validarID(),controller.deleteImage)

router.put("/:id",upload.single('file'),validarCamposObligatorios(["name"]),validarID(),controller.updateImage)

module.exports = router