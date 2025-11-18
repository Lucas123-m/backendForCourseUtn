const express = require("express")
const router = express.Router()
const multer = require('multer');
//const storage = multer.memoryStorage();
const path = require('path')
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req,file,cb)=>{
        if (file.mimetype !== 'text/csv' || path.extname(file.originalname).toLowerCase() !== '.csv') {
            return cb(new Error('Only CSV files are allowed'), false)
        }
        cb(null, true)
    }
});

const { validarSerie } = require("../middlewares/schema/validarSerie")
const { validarContent } = require("../middlewares/schema/validarContent")
const { validarArchivo } = require("../middlewares/validarArchivo")
const controller = require("../controllers/series.controller");
const { validarSesion } = require("../middlewares/auth/validarSesion");
const { validarPermiso } = require("../middlewares/auth/autorizarAccionSegunPermiso");

router.get("/",controller.getAllAnimeSeries)
router.get("/contents",controller.getAllAnimeContent)
router.get("/:id",controller.getOneAnimeSerie)
router.get("/contents/:id",controller.getOneAnimeContent)

router.use(validarSesion()) //Aplica a todas las rutas, dejar los .get ANTES.
//router.post(validarPermiso("anime:add"))
router.post("/",validarPermiso("anime:add"),validarSerie(),controller.AddAnimeSerie)
router.post("/import",upload.single('file'),validarArchivo(),validarPermiso("anime:add"),controller.ImportAnimeSeries)

router.post("/contents",validarPermiso("anime:add"),validarContent(),controller.AddAnimeContent)
router.post("/contents/import",upload.single('file'),validarArchivo(),validarPermiso("anime:add"),controller.ImportAnimeContent)

router.delete("/import",upload.single('file'),validarArchivo(),validarPermiso("anime:delete"),controller.deleteAnimesFromFile)
router.delete("/:id",validarPermiso("anime:delete"),controller.deleteAnimeSerie)

router.delete("/contents/import",upload.single('file'),validarArchivo(),validarPermiso("anime:delete"),controller.deleteContentFromFile)
router.delete("/contents/:id",validarPermiso("anime:delete"),controller.deleteAnimeContent)

router.put("/import",upload.single('file'),validarArchivo(),validarPermiso("anime:update"),controller.updateAnimesFromFile)
router.put("/:id",validarPermiso("anime:update"),validarSerie(),controller.updateAnimeSerie)

router.put("/contents/import",upload.single('file'),validarArchivo(),validarPermiso("anime:update"),controller.updateContentFromFile)
router.put("/contents/:id",validarPermiso("anime:update"),validarContent(),controller.updateAnimeContent)

module.exports = router;