const express = require("express")
const router = express.Router()

router.get("/shelters", (req, res) => {
    res.send("All Shelters")
})

router.post("/shelters", (req, res) => {
    res.send("Creating Shelter")
})

router.get("/shelters")