// models/order.js (Modified)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../migrations/config/db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        validate: {
            notEmpty: { msg: 'Customer Id must not be empty' }
        }
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2), // Changed to DECIMAL for better precision
        allowNull: false,
        validate: {
            isDecimal: { msg: 'Amount must be a valid decimal number' },
            notEmpty: { msg: 'Amount must not be empty' }
        }
    },
    note: { 
        type: DataTypes.TEXT,
        allowNull: true 
    },
    paymentMethod: { 
        type: DataTypes.ENUM('MOMO', 'AirtelMoney', 'CreditCard'),
        allowNull: false
    },
    status: {  // Added status field
        type: DataTypes.ENUM('pending', 'preparing', 'delivering', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Delivery address must not be empty' }
        }
    },
    preparedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deliveringAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    cancelledAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    cancelledBy: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    indexes: [
        {
            fields: ['customerId']
        }
    ]
});

module.exports = Order;