const express = require("express")
const app = express()
const shelterRoutes = require("./routes/shelters")
const dogRoutes = require("./routes/dogs")
const adminRoutes = require("./routes/admin")
const { propfind } = require("./routes/shelters")


app.use("/admin", adminRoutes)

app.use("/shelters", shelterRoutes)

app.use("/dogs", dogRoutes)

app.listen(3000, () => console.log("Listening on 3000"))