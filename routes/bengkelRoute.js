const express = require('express');
const router = express.Router();
const bengkelController = require('../controller/bengkelController')
const middleware = require('../middleware/middleware')

/* GET users listing. */
router.get('/bengkel',middleware.verifyToken,bengkelController.getBengkel)
router.post('/bengkel',middleware.verifyToken,bengkelController.postBengkel)
module.exports = router