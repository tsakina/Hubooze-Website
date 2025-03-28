const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const authenticateAdmin = (req, res, next) => {
  const token = req.cookies?.adminToken; // Ensure adminToken exists

  console.log('Received token:', token);  // Log the received token
  
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.adminId = decoded.id; // Store admin ID in req for further use
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateAdmin;
