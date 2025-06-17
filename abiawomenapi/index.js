require("dotenv").config({path: __dirname + "./env"})
const PORT = process.env.PORT || 9000; 
const express = require('express')
const app = express(); 
const cors = require('cors')

app.use(express.json())
app.use(cors())
// app.use("/auth", require)

app.get("/", (req, res) => {
    res.send("Hello World!")
})


app.listen(PORT, ()=> {
    console.log(`Server listening on the port ${PORT}`)
})