require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 8000
const url = process.env.ATLAS_URI

//Importing user-defined routes
const userRoutes = require('./routes/user.routes');
const partnerRoutes = require('./routes/partner.routes');
const predictRoutes = require('./routes/predict.routes');

// Load the model when the server starts
const itemRoutes = require('./routes/item.routes');
const orderRoutes = require('./routes/order.routes');
const postRoutes = require('./routes/post.routes');
const notificationRoutes = require('./routes/notification.routes');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Mounting user-defined routes
app.use('/users', userRoutes);
app.use('/partners', partnerRoutes);
// Use predictRoutes for handling prediction requests
app.use('/api', predictRoutes);
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);
app.use('/notifications', notificationRoutes);
app.use('/posts', postRoutes);

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