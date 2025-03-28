const express = require('express');
const router = express.Router();
const { signup, login, logout, userInfo, updateProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authToken');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authenticateToken, userInfo);
router.get('/update-profile', authenticateToken, updateProfile);

module.exports = router;
