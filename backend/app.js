const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const user = require('./Routes/user')
const movie = require('./Routes/movie')
var bodyParser = require('body-parser');
const genre = require('./Routes/genre')
const watch= require('./Routes/Watch')
const frontend = require('./Routes/frontend')
const subscription = require('./Routes/subscription')
const history = require('./Routes/history')
const fileUpload = require('express-fileupload')
require('dotenv').config()

try {
    mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true,})
} catch(err) {
    console.log(err.message);
}




app.use(cors())

app.use(express.json({limit:'50mb'}))
app.use(fileUpload())

app.use('/api/user',user)
app.use('/api/movie',movie)
app.use('/api/genre',genre)
app.use('/api/watchlist',watch)
app.use('/api/frontend',frontend)
app.use('/api/subscription',subscription)
app.use('/api/history',history)

const PORT= process.env.PORT || 5000
app.listen(PORT)