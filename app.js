require("dotenv").config()
const express = require("express")
const router = express.router()
const animeRouter = require("./src/routes")

const app = expres();

app.use(express.json())

app.use("/animes",animeRouter)

const PORT = process.env.PORT || 3000;



