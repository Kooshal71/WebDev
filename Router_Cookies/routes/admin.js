const express = require("express")
const router = express.Router()

router.use((req, res, next) => {
    if(req.query.isAdmin){
        next()
    }
    res.send("Not an admin")
})


router.get("/topsecret", (req, res) => {
    res.send("All Secrets")
})

router.get("/delete", (req, res) => {
    res.send("Terminated")
})

module.exports = router