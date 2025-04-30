// models/product.js (New model)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../migrations/config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Product name must not be empty' }
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: { msg: 'Price must be a valid decimal number' },
            notEmpty: { msg: 'Price must not be empty' }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Stock must be an integer' },
            min: { args: [0], msg: 'Stock cannot be negative' }
        }
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
},
{
    timestamps: true,
    indexes: [
        {
            fields: ['name']
        }
    ]
});

module.exports = Product;