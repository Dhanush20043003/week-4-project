const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addOrUpdateResult, getMyResult, getResultByStudent } = require('../controllers/resultController');

// @route POST /api/result
// @desc Admin adds/updates result
router.post('/', auth, addOrUpdateResult);

// @route GET /api/result/mine
// @desc Student fetches their result
router.get('/mine', auth, getMyResult);

// @route GET /api/result/student/:id
// @desc Admin fetches result of specific student
router.get('/student/:id', auth, getResultByStudent);

module.exports = router;
