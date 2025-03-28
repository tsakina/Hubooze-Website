const Cart = require('../models/Cart');
const Product = require('../models/Product');// Helper function to extract user ID from the token in cookies


// Helper function to extract user ID from token
const getUserIdFromToken = (req) => {
  const token = req.cookies.token; // Extract token from the cookie
  if (!token) {
    throw new Error('No token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, secret); // Verify and decode the token
    return decoded.id; // Return the user ID
  } catch (err) {
    throw new Error('Invalid token');
  }
};


// Get User Cart
exports.getCart = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req); // Extract user ID from the token

    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (cart) {
      res.status(200).json({ cart });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(401).json({ message: err.message }); // Return 401 for authorization errors
  }
};

// Add Product to Cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const userId = getUserIdFromToken(req);

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(201).json({ message: 'Product added to cart' });
  } catch (err) {
    res.status(401).json({ message: err.message }); // Handle token errors with 401
  }
};

// Remove Product from Cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const userId = getUserIdFromToken(req);

    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
      res.status(200).json({ message: 'Product removed from cart' });
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(401).json({ message: err.message }); // Handle token errors with 401
  }
};
