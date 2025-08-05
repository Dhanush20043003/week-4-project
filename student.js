const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/studentController');

// @route   POST /api/student/register
router.post('/register', register);

// @route   POST /api/student/login
router.post('/login', login);

module.exports = router;
