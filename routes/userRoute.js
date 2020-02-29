const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const middleware = require('../middleware/middleware')

/* GET users listing. */
router.post('/register',userController.register)
router.post('/login',userController.login)
module.exports = router