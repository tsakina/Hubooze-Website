const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const authenticateToken = require('../middlewares/authToken');
const cacheMiddleware = require('../middlewares/cachingMiddleware');


router.get('/getwishlist', authenticateToken, getWishlist);
router.post('/addtowishlist', authenticateToken, addToWishlist);
router.delete('/removefromwishlist/:productId', authenticateToken, removeFromWishlist);

module.exports = router;