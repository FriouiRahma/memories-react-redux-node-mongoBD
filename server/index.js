const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require("cors")
const postsRoutes=require('./routes/posts.js')

const app=express()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

const CONNECTION_URL = "mongodb+srv://rahma123:rahma123@monga-iejy2.mongodb.net/test?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000;



app.use('/posts',postsRoutes)

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server runnig on port: ${PORT}`)))
    .catch((err) => console.log(err.message))

