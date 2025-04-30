const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to generate a random password
const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
};

module.exports = generatePassword;