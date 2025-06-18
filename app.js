require("dotenv").config()
const express = require("express")
const router = express.router()
const animeRouter = require("./src/routes/anime.routes")

const app = expres();

app.use(express.json())

app.use("/animes",animeRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

