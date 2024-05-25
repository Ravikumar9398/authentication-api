const express = require("express")
const app = express()

const authentication = require("./routes/authentication")

app.use(express.json())

require("./config/config")

app.use("/user", authentication)

app.get("/", (req, res) => {
    res.send("use /user/register for new registration and use /user/login for login")
})

app.listen(3000, () => {
    console.log("server running at localhost:3000")
})