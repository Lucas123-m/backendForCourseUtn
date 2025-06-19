const express = require("express")
const router = express.Router()

const controller = require("../controllers/anime.controller")

router.get("/titles",controller.getAllAnimeTitles)
router.get("/titles/contents",controller.getAllAnimeContent)
router.get("/titles/:id",controller.getOneTitle)
router.get("/titles/contents/:id",controller.getOneAnimeContent)


router.post("/titles",controller.AddAnimeTitle)
router.post("/titles/contents",controller.AddAnimeContent)

router.delete("/titles/:id",controller.deleteAnimeTitle)
router.delete("/contents/:id",controller.deleteAnimeContent)

router.put("/titles/:id",controller.updateAnimetitle)
router.put("/contents/:id",controller.updateAnimeContent)

module.exports = router;