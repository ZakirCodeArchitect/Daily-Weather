const express = require('express');
const weatherController = require('../controller/weatherController');

const router = express.Router();

router.get('/update', weatherController.getUpdates);

module.exports = router;