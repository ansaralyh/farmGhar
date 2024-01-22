const userController = require('../Controllers/userController');
const express = require('express')
const router = express.Router()

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/view/:id', userController.getSingleUser);
router.get('/user/view', userController.getAllUsers);


module.exports = router

































