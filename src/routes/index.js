const express = require('express');
const { getWidgets } = require('../controllers/widgetsController');

const router = express.Router();

// GET /api/widgets
router.get('/widgets', getWidgets);

module.exports = router;
