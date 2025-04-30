const express = require('express');
const router = express.Router();
const { signup, login, createUserBySuperUser, createSellerByAdmin, updateUser, getAllUsers, getUserCount, getUserById } = require('./userController');
const { authenticate, authorize } = require('./userMiddlewares');

// Public Routes
router.post('/signup', signup);
router.post('/login', login);

// SuperUser Routes
router.post('/superuser/create-user', authenticate, authorize('SuperUser'), createUserBySuperUser);
router.get('/superuser/all-users', authenticate, authorize('Admin','SuperUser'), getAllUsers);
router.get('/profile/:id', authenticate, getUserById);

// Admin Routes
router.post('/admin/create-seller', authenticate, authorize('Admin'), createSellerByAdmin);

// User Routes
router.put('/user/update', authenticate, updateUser);

router.get('/count', getUserCount);

module.exports = router;
