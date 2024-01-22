const express = require('express');
const router = express.Router();
const productController = require('../Controllers/prooductControllers');
const { authenticateUser } = require('../middlewares/authentication')

router.post('/createProduct', authenticateUser,productController.createProduct);
router.get('/view', authenticateUser,productController.getAllProducts);



module.exports = router
