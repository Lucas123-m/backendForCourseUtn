const express = require("express")
const router = express.Router()

const controller = require("../controllers/anime.controller")

router.get("/images",controller.getImages)
router.get("/images/:id",controller.getOneImage)
router.get("/series",controller.getAllAnimeSeries)
router.get("/series/contents",controller.getAllAnimeContent)
router.get("/series/:id",controller.getOneSerie)
router.get("/series/contents/:id",controller.getOneAnimeContent)

router.post("/series",controller.AddAnimeSerie)
router.post("/images",controller.AddImage)
router.post("/series/contents",controller.AddAnimeContent)

router.delete("/series/:id",controller.deleteAnimeSerie)
router.delete("/series/contents/:id",controller.deleteAnimeContent)
//router.delete("/images/:id",controller.deleteImage)

//router.put("/images/:id",controller.updateImage)
router.put("/series/:id",controller.updateAnimeSerie)
router.put("/series/contents/:id",controller.updateAnimeContent)

module.exports = router;