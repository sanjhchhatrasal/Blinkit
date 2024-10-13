const express = require("express")
const app = express()
const indexRouter = require("./routes/index")


app.use("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", indexRouter)

app.listen("3000")