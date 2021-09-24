const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PostRoute = require('./src/routes/post.route')
require('dotenv').config()

const PORT = process.env.PORT
const URL = process.env.URL

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use('/v1/post', PostRoute)

app.get('/', (req, res) => {
    res.send({message:'Hello World'})
})

mongoose.connect(URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.log(err.message);
    })