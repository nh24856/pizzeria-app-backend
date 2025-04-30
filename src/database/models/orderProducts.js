const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../migrations/config/db');

const OrderProduct = sequelize.define('OrderProduct', {
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Orders',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Quantity must be an integer' },
            min: { args: [1], msg: 'Quantity must be at least 1' },
            notEmpty: { msg: 'Quantity must not be empty' }
        }
    },
    unitPrice: {  // Added to store price at time of order
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: { msg: 'Unit price must be a valid decimal number' }
        }
    }
}, {
    tableName: 'order_products',
    timestamps: true
});

module.exports = OrderProduct;