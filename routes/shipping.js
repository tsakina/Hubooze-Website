const express = require('express');
const router = express.Router();
const { createShipment, getShippingStatus, sendEmail } = require('../controllers/shippingController');
const authenticateToken = require('../middlewares/authToken');


router.post('/create-shipment', authenticateToken, createShipment);
router.get('/status/:trackingNumber', authenticateToken, getShippingStatus);
router.post('/send-confirmation-email', authenticateToken, sendEmail)

module.exports = router;
