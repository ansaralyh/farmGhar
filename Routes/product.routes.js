const express = require('express');
const router = express.Router();
const productController = require('../Controllers/prooductControllers');
const { authenticateUser } = require('../middlewares/authentication')

router.post('/product/createProduct', authenticateUser, productController.createProduct);
router.get('/product/view', authenticateUser, productController.getAllProducts);
router.get('/product/view/:id', authenticateUser, productController.getSinleProduct);
router.delete('/product', authenticateUser, productController.removeProducts);
router.delete('/product/:id', authenticateUser, productController.removeSingleProduct);
router.put("/product/update/:id",authenticateUser,productController.updateProduct)



module.exports = router
