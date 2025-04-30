// models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../migrations/config/db');
const bcrypt = require('bcrypt');


const User = sequelize.define('User', {
    id: {  // Added explicit ID field
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullNames: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Full name must not be empty' }
        }
    },
    email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Invalid Email Format, right format: example@gmail.com' },
            notEmpty: { msg: 'Email must not be empty' }
        }
    },
    telephone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Number must be integer' },
            notEmpty: { msg: 'Telephone must not be empty' }
        }
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: { 
                args: [8, 255],
                msg: 'Password must be at least 8 characters'
            },
            notEmpty: { msg: 'Password must not be empty' }
        }
    },
    role: { 
        type: DataTypes.ENUM('customer', 'Seller', 'Admin', 'SuperUser'),
        allowNull: false,
        defaultValue: 'customer'
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;