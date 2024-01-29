const express = require('express');
const router = express.Router();
const productController = require('../Controllers/prooductControllers');
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
})
const upload = multer({ storage: storage });

router.post('/product/createProduct', authenticateUser, upload.single('image'), productController.createProduct);
router.get('/product/view', authenticateUser, productController.getAllProducts);
router.get('/product/view/:id', authenticateUser, productController.getSinleProduct);
router.delete('/product', authenticateUser, productController.removeProducts);
router.delete('/product/:id', authenticateUser, productController.removeSingleProduct);
router.put("/product/update/:id", authenticateUser, productController.updateProduct)




module.exports = router
