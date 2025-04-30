const User = require('../models/userModel');
const Product = require('../models/productsModel');
const Order = require('../models/ordersModel');
const OrderProduct = require('../models/orderProducts');

User.hasMany(Order, {
    foreignKey: 'customerId', onDelete: 'CASCADE'
});
Order.belongsTo(User, {
    foreignKey: 'customerId'
});

User.hasMany(Product, {
    foreignKey: 'sellerId', onDelete: 'CASCADE'
});
Product.belongsTo(User, {
    foreignKey: 'sellerId'
});

Order.belongsToMany(Product, {
    through: OrderProduct, foreignKey: 'orderId', otherKey: 'productId'
});
Product.belongsToMany(Order, {
    through: OrderProduct, foreignKey: 'productId', otherKey: 'orderId'
});

Order.hasMany(OrderProduct, {
    foreignKey: 'orderId'
});

OrderProduct.belongsTo(Order, {
    foreignKey: 'orderId'
});

Product.hasMany(OrderProduct, {
    foreignKey: 'productId'
});

OrderProduct.belongsTo(Product, {
    foreignKey: 'productId'
});

module.exports = {
    User,
    Product,
    Order,
    OrderProduct
};