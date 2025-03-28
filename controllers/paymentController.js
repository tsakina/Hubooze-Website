const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const User = require('../models/User');

const razorpayInstance = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_SECRET',
});

exports.createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt,
    };

    const order = await razorpayInstance.orders.create(options);
    if (!order) return res.status(500).send('Some error occurred');

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.verifyPayment = async (req, res) => {
  const { order_id, payment_id, signature, userId, cartData } = req.body;

  const shasum = crypto.createHmac('sha256', 'YOUR_RAZORPAY_SECRET');
  shasum.update(`${order_id}|${payment_id}`);
  const digest = shasum.digest('hex');

  if (digest === signature) {
    // Payment successful
    const newOrder = new Order({
      userId,
      order_id,
      payment_id,
      cartData,
      status: 'paid',
    });
    await newOrder.save();

    res.json({ message: 'Payment verified successfully', order: newOrder });
  } else {
    res.status(400).json({ message: 'Invalid signature' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  // Validate the status value
  const validStatuses = ['pending', 'shipped', 'delivered', 'canceled', 'returned', 'refunded'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    // Find the order by ID
    const order = await Order.findOne({ order_id: orderId });

    // If the order doesn't exist
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order status and timestamps based on status
    order.status = status;

    // Automate shippedAt and deliveredAt changes
    if (status === 'shipped' && !order.shippedAt) {
      order.shippedAt = new Date();
    }

    if (status === 'delivered' && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save();

    // Optionally, log status changes for auditing
    console.log(`Order ${orderId} status updated to ${status}`);

    // Respond with success
    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error updating order status:', error);

    // Send a generic error response
    res.status(500).json({ error: 'An error occurred while updating the order status' });
  }
};
