require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const userRoutes = require('./routes/user.routes');

const PORT = process.env.PORT || 8000
const url = process.env.ATLAS_URI

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', userRoutes);

mongoose.connect(url)
    .then(() => {
        console.log('MongoDB connected!')
    }).catch((err) => {
        console.log('MongoDB error: ' + err)
    })

app.get('/', (_, res) => {
    res.json({
        name: 'Server',
        project: 'QUAD.B'
    })
})

app.listen(PORT, console.log('Server running on PORT: ' + PORT))