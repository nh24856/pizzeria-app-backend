const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus, getOrderCount, getSelfOrders, getMyOrders, getMyOrderCount, getPendingOrderCount} = require('./orderController');
const { authenticate, authorize, } = require('../users/userMiddlewares');
const { canUpdateOrderStatus } = require('./orderMiddleware');

// Public Routes
router.post('/register', authenticate, authorize('customer'), createOrder);
router.put('/update-order-status/:id/status', authenticate, canUpdateOrderStatus, updateOrderStatus);
router.put('/update-order', authenticate, authorize('customer'));
router.get('/get-order/:id', authenticate, authorize('Seller'), getOrderById);
router.get('/get-all-orders', getOrders);
router.get('/get-order-count', getOrderCount);
router.get('/get-self-orders/:userId',authenticate, authorize('customer'), getSelfOrders);
router.get('/get-my-orders/:userId', getMyOrders);
router.get('/get-my-order-count/:userId', getMyOrderCount);
router.get('/get-pending-order-count/:userId', getPendingOrderCount);

module.exports = router;
