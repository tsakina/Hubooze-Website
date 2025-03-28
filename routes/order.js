const express = require('express');
const { createOrder, updateOrderStatus, verifyPayment } = require('../controllers/paymentController');
const authenticateToken = require('../middlewares/authToken');

const router = express.Router();

router.post('/create', authenticateToken, createOrder);
router.put('/update-status', authenticateToken, updateOrderStatus);
router.post('/verify', authenticateToken, verifyPayment);

module.exports = router;
