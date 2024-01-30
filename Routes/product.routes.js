const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productControllers');  // Corrected import path
const { authenticateUser } = require('../middlewares/authentication');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now(), path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.post('/product/createProduct', authenticateUser, upload.single('image'), productController.createProduct);
router.get('/product/view', productController.getAllProducts);
router.get('/product/view/:id', authenticateUser, productController.getSinleProduct);
router.delete('/product', authenticateUser, productController.removeProducts);
router.delete('/product/:id', authenticateUser, productController.removeSingleProduct);
router.put("/product/update/:id", authenticateUser, productController.updateProduct);

// ****************Farmer's routes ****************** //
router.get('/product/by-farmer/:id', authenticateUser, productController.getAllProductsOfFarmer);

module.exports = router;
