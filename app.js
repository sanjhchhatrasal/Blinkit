const express = require("express")
const app = express()
const indexRouter = require("./routes/index")

require("dotenv").config();
require("./config/db")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", indexRouter)

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});