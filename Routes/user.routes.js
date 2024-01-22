const userController = require('../Controllers/userController');
const express = require('express')
const router = express.Router()

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/view/:id', userController.getSingleUser);
router.get('/user/view', userController.getAllUsers);
router.delete('/user/:id', userController.removeUser);
router.put('/user/:id', userController.updateUser);
router.post('/user/forgetPassword', userController.forgetPasword);
router.post('/user/verifyOtp', userController.verifyOtp);



module.exports = router

































