const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

// Admin registration route
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newAdmin = new Admin({ username, password: hashedPassword });
      await newAdmin.save();
  
      // Log the plain text and hashed password
      console.log('Plain text password during registration:', password);
      console.log('Hashed password during registration:', newAdmin.password);
  
  
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
  // Admin login
  exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid username' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const token = jwt.sign({ id: admin._id }, secret, { expiresIn: '1h' });
  
      // Set token in HTTP-only cookie in adminController.js
      res.cookie('adminToken', token, {
        httpOnly: true,
        secure: false, // 'true' for production (HTTPS) only
        // sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Set to 'None' for cross-site cookies in production, but 'Lax' in development
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
  
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Admin logout route
exports.logoutAdmin = (req, res) => {
  res.clearCookie('adminToken');
  res.status(200).json({ message: 'Logout successful' });
};


// Admin check-auth route
exports.checkAdminAuth = (req, res) => {
  try {
      // The middleware would have already verified the token and set req.adminId
      if (req.adminId) {
          res.status(200).json({ message: 'Authenticated' });
      } else {
          res.status(401).json({ message: 'Not authenticated' });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
