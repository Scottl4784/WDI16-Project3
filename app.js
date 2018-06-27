require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', err => {
    console.log(err)
})
db.on('open', () => {
    console.log('Connected to MongoDB')
})

const PORT = process.env.PORT || 3001

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')
const commentsRouter = require('./routes/comments')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(__dirname + '/client/build/'))

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

app.use('/api/users', usersRouter)
app.use('/api/users/:userId/movies', moviesRouter)


module.exports = app
