const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const authenticateToken = require('../middlewares/authToken');
const cacheMiddleware = require('../middlewares/cachingMiddleware');

router.post('/addtocart', addToCart);
router.post('/removefromcart', removeFromCart);
router.get('/getcart', getCart);

module.exports = router;
