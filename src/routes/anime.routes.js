const express = require("express")
const router = express.Router()

const controller = require("../controllers/anime.controller")

router.get("/",controller.getAllAnimeTitles)
router.get("/content",controller.getAllAnimeContent)
router.get("/:id",controller.getOneTitle)
router.get("/content/:id",controller.getOneAnimeContent)


router.post("/",controller.AddAnimeTitle)
router.post("/content",controller.AddAnimeContent)

router.delete("/:id",controller.deleteAnimeTitle)
router.delete("/content/:id",controller.deleteAnimeContent)

router.put("/:id",controller.updateAnimetitle)
router.put("/content/:id",controller.updateAnimeContent)

module.exports = router;