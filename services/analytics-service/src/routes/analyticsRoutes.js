const express = require('express');
const router = express.Router();
const { getPortfolioSummary, getCityBreakdown } = require('../controllers/analyticsController');

router.get('/portfolio-summary', getPortfolioSummary);
router.get('/city-breakdown', getCityBreakdown);

module.exports = router;