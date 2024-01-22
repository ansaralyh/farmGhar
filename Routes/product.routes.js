const express = require('express');
const router = express.Router();
const productController = require('../Controllers/prooductControllers');
const { authenticateUser } = require('../middlewares/authentication')

router.post('/product/createProduct', authenticateUser, productController.createProduct);
router.get('/product/view', authenticateUser, productController.getAllProducts);
router.delete('/product', authenticateUser, productController.removeProducts);




module.exports = router
