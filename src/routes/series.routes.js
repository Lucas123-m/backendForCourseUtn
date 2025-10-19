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
const controller = require("../controllers/series.controller")

router.get("/",controller.getAllAnimeSeries)
router.get("/contents",controller.getAllAnimeContent)
router.get("/:id",controller.getOneAnimeSerie)
router.get("/contents/:id",controller.getOneAnimeContent)

router.post("/",validarSerie(),controller.AddAnimeSerie)
router.post("/contents",validarContent(),controller.AddAnimeContent)
router.post("/import",upload.single('file'),controller.ImportAnimeSeries)

router.delete("/:id",controller.deleteAnimeSerie)
router.delete("/contents/:id",controller.deleteAnimeContent)

router.put("/:id",validarSerie(),controller.updateAnimeSerie)
router.put("/contents/:id",validarContent(),controller.updateAnimeContent)

module.exports = router;