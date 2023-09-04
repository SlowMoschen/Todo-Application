require('dotenv').config()
const express = require('express')
const app = express()

const PORT = process.env.PORT ||3002

// Database Setup
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})

const connection = mongoose.connection

connection.on('error', err => {
    console.log(err);
})

connection.once('open', () => {
    connection.db.collection('tasks')
    console.log('Succesfully connected to DB');    
})

// Middleware Dependecies

// Middleware to enable Body reqeusts from forms
app.use(express.urlencoded({ extended: true }))
// Middleware that parses JSON
app.use(express.json())

// EJS Rendering Dependencies
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views/css'))
app.use(express.static(__dirname + '/views/js'))

// Server Setup
app.get('/', (req, res) => {
    res.render('index')
})

const MainRoute = require('./routes/route') 
app.use('/tasks', MainRoute)

app.listen(PORT, () => { console.log(`Server startet on Port: http://localhost:${PORT}`); })