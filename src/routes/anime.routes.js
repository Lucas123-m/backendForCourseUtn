const express = require("express")
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { validarCamposObligatorios } = require("../middlewares/validarCampos")
const controller = require("../controllers/anime.controller")

router.get("/images",controller.getImages)
router.get("/images/:id",controller.getOneImage)
router.get("/series",controller.getAllAnimeSeries)
router.get("/series/contents",controller.getAllAnimeContent)
router.get("/series/:id",controller.getOneAnimeSerie)
router.get("/series/contents/:id",controller.getOneAnimeContent)

router.post("/series",validarCamposObligatorios(["title","author","watch_status"]),controller.AddAnimeSerie)
router.post("/images",upload.single('file'),validarCamposObligatorios(["name"]),controller.AddImage)
router.post("/series/contents",validarCamposObligatorios(["id_serie","title","type","watch_status","duration"]),controller.AddAnimeContent)

router.delete("/series/:id",controller.deleteAnimeSerie)
router.delete("/series/contents/:id",controller.deleteAnimeContent)
router.delete("/images/:id",controller.deleteImage)

router.put("/images/:id",upload.single('file'),validarCamposObligatorios(["name"]),controller.updateImage)
router.put("/series/:id",validarCamposObligatorios(["title","author","watch_status"]),controller.updateAnimeSerie)
router.put("/series/contents/:id",validarCamposObligatorios(["id_serie","title","type","watch_status","duration"]),controller.updateAnimeContent)

module.exports = router;