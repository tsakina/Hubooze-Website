const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const mongoose = require("mongoose");

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const wishlistRoutes = require('./routes/wishlist');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const shippingRoutes = require('./routes/shipping');
const adminRoutes = require('./routes/admin');

const errorHandler = require('./middlewares/errorHandler');
const { errors } = require('celebrate');
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});
app.use(limiter);

// CORS setup
app.use(cors({
    origin: 'http://192.168.1.109:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // allow credentials (cookies)
    optionsSuccessStatus: 204
}));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
}).then(() => {
    console.log('DB connected successfully');
}).catch((err) => {
    console.log('Error:', err.message);
});

// Trust proxy for rate limiting if behind a reverse proxy (optional)
app.set('trust proxy', 1);

// Routes
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', orderRoutes);
app.use('/api/shipping', shippingRoutes);

// Celebrate Error Handling Middleware
app.use(errors());

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start server
app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log("Server is running on port " + process.env.PORT);
    } else {
        console.log("Error: " + error);
    }
});
