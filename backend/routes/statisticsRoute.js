const express = require('express');
const router = express.Router();
const { Mean} = require('../controllers/statisticsController');

router.get('/statistics', Mean);

module.exports = router;