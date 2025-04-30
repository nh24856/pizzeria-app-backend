const express = require('express');
const router = express.Router();

const upload = require('./productMiddleware');

const { updateProduct, deleteProduct, getAllProducts, registerProducts, getMyProducts, getProductsCount } = require('./productController');
const { authenticate, authorize, } = require('../users/userMiddlewares');

// Public Routes
router.post('/register', authenticate, authorize('Seller'), upload.single("file"), registerProducts);
router.put('/update-product/:id', authenticate, authorize('Seller'), updateProduct);
router.delete('/delete-product/:id', authenticate, authorize('Seller'), deleteProduct);
router.get('/get-all-products', getAllProducts);
router.get('/get-my-products/:id', authenticate, authorize('Seller'), getMyProducts);
router.get('/get-products-count', authenticate, getProductsCount);


module.exports = router;
