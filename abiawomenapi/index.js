require("dotenv").config({path: __dirname + "/.env"})
const PORT = process.env.PORT || 9000; 
const express = require('express')
const app = express(); 
const cors = require('cors')
const pool = require('./db.js') // Add database connection
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
const { v4: uuidv4 } = require('uuid'); // Add uuid for generating IDs

app.use(express.json())
app.use(cors())
// app.use("/auth", require("./routes/jwtAuth.js"))

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/auth", require("./routes/jwtAuth.js"));
app.use('/members', require("./routes/member.js"));
app.use('/events', require('./routes/events.js'))


app.listen(PORT, ()=> {
    console.log(`Server listening on the port ${PORT}`)
})