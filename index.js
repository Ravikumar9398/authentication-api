const express = require("express")
const app = express()

const authentication = require("./routes/authentication")

app.use(express.json())

require("./config/config")

app.use("/user", authentication)

app.get("/", (req, res) => {
    res.send("api is running at port 30000")
})

app.listen(3000, () => {
    console.log("server running at localhost:3000")
})