require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path') // Import path module

const app = express()
const PORT = process.env.PORT || 8000
const url = process.env.ATLAS_URI

// Importing user-defined routes
const userRoutes = require('./routes/user.routes');
const partnerRoutes = require('./routes/partner.routes');
const itemRoutes = require('./routes/item.routes');
const orderRoutes = require('./routes/order.routes');
const postRoutes = require('./routes/post.routes');
const notificationRoutes = require('./routes/notification.routes');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Mounting user-defined routes
app.use('/users', userRoutes);
app.use('/partners', partnerRoutes);
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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); 

// Define a catch-all route to serve the HTML file
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'clearance.html'));
});

app.get('/cart', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/orders', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});

// app.get('/test', (_, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'test.html'));
// });

app.listen(PORT, console.log('Server running on PORT: ' + PORT))
