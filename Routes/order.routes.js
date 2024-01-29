const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orders.controllers');
const { authenticateUser } = require('../middlewares/authentication');

// Create a new order
router.post('/orders/create', authenticateUser, orderController.createOrder);

// Get all orders
router.get('/orders/view', authenticateUser, orderController.getAllOrders);

// Get single orders
router.get('/orders/view/:id', authenticateUser, orderController.getSingleOrderById);



module.exports = router;
