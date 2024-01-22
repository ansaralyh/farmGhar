const userController = require('../Controllers/userController');
const express = require('express')
const router = express.Router()

router.post('/register/user',userController.register)
router.post('/login',userController.login)
router.get('/view/:id',userController.getSingleUser)


module.exports = router