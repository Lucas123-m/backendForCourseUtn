const express = require("express")
const router = express.Router()

const controller = require("../controllers/anime.controller")

router.get("/series",controller.getAllAnimeseries)
router.get("/series/contents",controller.getAllAnimeContent)
router.get("/series/:id",controller.getOneTitle)
router.get("/series/contents/:id",controller.getOneAnimeContent)

router.post("/series",controller.AddAnimeTitle)
router.post("/series/contents",controller.AddAnimeContent)

router.delete("/series/:id",controller.deleteAnimeTitle)
router.delete("/series/contents/:id",controller.deleteAnimeContent)

router.put("/series/:id",controller.updateAnimetitle)
router.put("/series/contents/:id",controller.updateAnimeContent)

module.exports = router;