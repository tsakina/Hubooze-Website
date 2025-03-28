const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { celebrate, Joi } = require('celebrate');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

exports.signup = [
  celebrate({
    body: Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
      }),
    }),
  }),
  async (req, res) => {
    try {
      let userExists = await User.findOne({ email: req.body.email });

      if (userExists) {
        return res.status(400).json({ success: false, error: 'User already exists with this email.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

      // Set token in an HTTP-only cookie
      res.cookie('token', token, { 
        httpOnly: true, 
        secure: false, 
        sameSite: 'Lax', 
        maxAge: 3600000 // 1 hour
      });

      res.status(201).json({
        success: true,
        message: `${user.name}, you are signed up successfully. Happy shopping!`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  },
];
    

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ success: false, error: "Invalid email." });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, error: "Invalid password." });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

    // Set token in an HTTP-only cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: false, 
      sameSite: 'Lax', 
      maxAge: 3600000 // 1 hour
    });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', { maxAge: 1 }); // Expire the token immediately
  res.json({ success: true, message: 'Logged out successfully' });
};

exports.userInfo = async (req, res) => {
  const token = req.cookies ? req.cookies.token : null;
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateProfile = async (req, res) => {
    const { name, address, phone, pincode } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
  
      if (user) {
        user.name = name || user.name;
        user.address = address || user.address;
        user.phone = phone || user.phone;
        user.pincode = pincode || user.pincode;
  
        await user.save();
        res.json({ message: 'Profile updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };