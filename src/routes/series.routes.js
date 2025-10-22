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

const { validarSerie } = require("../middlewares/validarSerie")
const { validarContent } = require("../middlewares/validarContent")
const { validarArchivo } = require("../middlewares/validarArchivo")
const controller = require("../controllers/series.controller")

router.get("/",controller.getAllAnimeSeries)
router.get("/contents",controller.getAllAnimeContent)
router.get("/:id",controller.getOneAnimeSerie)
router.get("/contents/:id",controller.getOneAnimeContent)

router.post("/",validarSerie(),controller.AddAnimeSerie)
router.post("/import",upload.single('file'),validarArchivo(),controller.ImportAnimeSeries)
router.post("/contents",validarContent(),controller.AddAnimeContent)
router.post("/contents/import",upload.single('file'),validarArchivo(),controller.ImportAnimeContent)


router.delete("/import",upload.single('file'),validarArchivo(),controller.deleteAnimesFromFile)
router.delete("/:id",controller.deleteAnimeSerie)
router.delete("/contents/import",upload.single('file'),validarArchivo(),controller.deleteContentFromFile)
router.delete("/contents/:id",controller.deleteAnimeContent)

router.put("/import",upload.single('file'),validarArchivo(),controller.updateAnimesFromFile)
router.put("/:id",validarSerie(),controller.updateAnimeSerie)
router.put("/contents/import",upload.single('file'),validarArchivo(),controller.updateContentFromFile)
router.put("/contents/:id",validarContent(),controller.updateAnimeContent)

module.exports = router;