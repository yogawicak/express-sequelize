const express = require('express');
const router = express.Router();
const ProfileContoller = require('../controller/profileController')
const middleware = require('../middleware/middleware')

/* GET users listing. */
router.get('/',middleware.verifyToken,ProfileContoller.getProfile)
router.post('/',middleware.verifyToken,ProfileContoller.postProfile)
module.exports = router