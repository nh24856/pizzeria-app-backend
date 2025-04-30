const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../database/models/userModel');
const generatePassword = require('../../utils/generatePassword');
const sendEmail = require('../../services/emailSender');
require('dotenv').config();

// User Signup
const signup = async (req, res) => {
    try {
        const { fullNames, email, telephone, password } = req.body;

        const user = await User.create({
            fullNames, email, telephone, password
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('error messages', error);
        res.status(500).json({ error: error.message });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role, name: user.fullNames }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message : 'Login successful', token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Superuser Creating Users
const createUserBySuperUser = async (req, res) => {
    try {
        const { fullNames, email, telephone, role } = req.body;
        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ fullNames, email, telephone, password: hashedPassword, role });
        await sendEmail(email, password);

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin Creating Sellers
const createSellerByAdmin = async (req, res) => {
    try {
        const { fullNames, email, telephone } = req.body;
        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ fullNames, email, telephone, password: hashedPassword, role: 'Seller' });
        await sendEmail(email, password);

        res.status(201).json({ message: 'Seller created successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User Profile
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from JWT token

        await User.update(req.body, { where: { id: userId } });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//get user by id
const getUserById = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from JWT token
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Superuser Viewing All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserCount = async (req, res) => {
    try {
        const count = await User.count();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { signup, login, createUserBySuperUser, createSellerByAdmin, updateUser, getAllUsers, getUserCount, getUserById };
