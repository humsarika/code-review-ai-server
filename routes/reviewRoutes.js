const express = require('express');
const { getReview } = require('../controllers/reviewController');

const router = express.Router();

router.post('/', getReview);

module.exports = router;
