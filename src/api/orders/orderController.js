const { Order, OrderProduct, Product } = require('../../database/models/index');

async function createOrder(req, res) {
    try {
        const { customerId, products, paymentMethod, note, deliveryAddress } = req.body;
        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'Order must include at least one product.' });
        }

        let totalAmount = 0;
        // Calculate total amount and check stock
        for (const item of products) {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found.` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}.` });
            }
            totalAmount += product.price * item.quantity;
        }

        // Create the order
        const order = await Order.create({ customerId, totalAmount, paymentMethod, note, deliveryAddress });

        // Create order-product entries and update stock
        for (const item of products) {
            const product = await Product.findByPk(item.productId);
            await OrderProduct.create({ orderId: order.id, productId: item.productId, quantity: item.quantity, unitPrice: product.price
            });
            // Reduce stock
            await product.update({ stock: product.stock - item.quantity });
        }

        res.status(201).json({ message: 'Order placed successfully.', order });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function getOrders(req, res) {
    try {
        const orders = await Order.findAll({ include: [OrderProduct] });
        if(!orders){
            res.status(404).json({message: 'No orders Found'});
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error('message:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function getOrderById(req, res) {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, { include: [OrderProduct] });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        console.error('message:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
      const order = req.order; // From middleware
      const { status } = req.body;
      
      // Update the order status
      order.status = status;
      
      // If needed, you can add timestamps for status changes
      if (status === 'processing') {
        order.preparedAt = new Date();
      } else if (status === 'delivering') {
        order.deliveringAt = new Date();
      } else if (status === 'delivered') {
        order.deliveredAt = new Date();
      } else if (status === 'cancelled') {
        order.cancelledAt = new Date();
        // You might also want to store who cancelled it
        order.cancelledBy = req.user.role;
      }
      
      await order.save();
      
      res.status(200).json({ 
        message: `Order status updated to ${status}`,
        order
      });
      
    } catch (error) {
      console.error('Order status update error:', error);
      res.status(500).json({ error: error.message });
    }
  };

  const getOrderCount = async (req, res) => {
    try {
        const count = await Order.count();
        res.status(200).json({ count });
    } catch (error){
        console.error('message:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
    }

// function to view order i made myself
const getSelfOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.count({ where: { customerId: userId }, include: [OrderProduct] });
        if (!orders) return res.status(404).json({ message: 'No orders found for this user' });
        res.status(200).json(orders);
    } catch (error) {
        console.error('message:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// function to view order of my products
const getMyOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.findAll({ where: { sellerId: userId }, include: [OrderProduct] });
        if (!orders) return res.status(404).json({ message: 'No orders found for this user' });
        res.status(200).json(orders);
    } catch (error) {
        console.error('message:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

//count orders of seller id where the products has the seller id
const getMyOrderCount = async (req, res) => {
    try {
        const { userId } = req.params;
        const count = await Order.count({
            include: [{
                model: Product,
                where: { sellerId: userId }
            }]
        });
        res.status(200).json({ count });
    } catch (error) {
        console.error('message:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

//count orders of customer id where the products has the seller id ut Pending
const getPendingOrderCount = async (req, res) => {
    try {
        const { userId } = req.params;
        const count = await Order.count({
            where: { status: 'pending' },
            include: [{
                model: Product,
                where: { sellerId: userId }
            }]
        });
        res.status(200).json({ count });
    } catch (error) {
        console.error('message:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
  

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, getOrderCount, getSelfOrders, getMyOrders, getMyOrderCount, getPendingOrderCount };
