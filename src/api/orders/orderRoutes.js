const express = require('express');
const router = express.Router();
const { createOrder, getOrders, orderCancel, getOrderById, updateOrderStatus, getOrderCount, getselfOrders, getSelfOrderscount, getMyOrders, getMyOrderCount, getPendingOrderCount} = require('./orderController');
const { authenticate, authorize, } = require('../users/userMiddlewares');
const { canUpdateOrderStatus } = require('./orderMiddleware');

// Public Routes
router.post('/register', authenticate, authorize('customer'), createOrder);
router.put('/update-order-status/:id/status', authenticate, authorize('customer', 'Seller'), canUpdateOrderStatus, updateOrderStatus);
router.put('/update-order', authenticate, authorize('customer'), orderCancel);
router.get('/get-order/:id', authenticate, authorize('Seller'), getOrderById);
router.get('/get-all-orders', getOrders);
router.get('/get-order-count', getOrderCount);
router.get('/get-self-orders/:userId', authenticate, authorize('customer'), getselfOrders);
router.get('/get-self-orders-count/:userId',authenticate, authorize('customer'), getSelfOrderscount);
router.get('/get-my-orders/:userId', getMyOrders);
router.get('/get-my-order-count/:userId', getMyOrderCount);
router.get('/get-pending-order-count/:userId', getPendingOrderCount);

module.exports = router;
