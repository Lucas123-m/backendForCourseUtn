const express = require("express")
const router = express.Router()
const multer = require('multer');
//const storage = multer.memoryStorage();
const upload = multer({dest: 'uploads/'});

const { validarCamposObligatorios } = require("../middlewares/validarCampos")

const controller = require("../controllers/series.controller")

router.get("/",controller.getAllAnimeSeries)
router.get("/contents",controller.getAllAnimeContent)
router.get("/:id",controller.getOneAnimeSerie)
router.get("/contents/:id",controller.getOneAnimeContent)

router.post("/",validarCamposObligatorios(["title","author","watch_status"]),controller.AddAnimeSerie)
router.post("/contents",validarCamposObligatorios(["id_serie","title","type","watch_status","duration"]),controller.AddAnimeContent)
router.post("/import",upload.single('file'),controller.ImportAnimeSeries)

router.delete("/:id",controller.deleteAnimeSerie)
router.delete("/contents/:id",controller.deleteAnimeContent)

router.put("/:id",validarCamposObligatorios(["title","author","watch_status"]),controller.updateAnimeSerie)
router.put("/contents/:id",validarCamposObligatorios(["id_serie","title","type","watch_status","duration"]),controller.updateAnimeContent)

module.exports = router;