const { Order } = require('../../database/models/index'); // Adjust path as needed

// Middleware to check if user can update order status
const canUpdateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { role } = req.user; // Assuming user info from auth middleware
    
    // Fetch the current order
    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    const currentStatus = order.status;
    
    // Case 1: Customer cancelling an order
    if (role === 'customer' && status === 'cancelled') {
      // Customer can only cancel if order is not yet delivering
      if (currentStatus === 'pending' || currentStatus === 'processing') {
        // Store the order in request for the controller
        req.order = order;
        return next();
      } else {
        return res.status(403).json({ 
          message: 'Cannot cancel order that is already being delivered' 
        });
      }
    }
    
    //Customer trying to do anything else
    if (role === 'customer' && status !== 'cancelled') {
      return res.status(403).json({ 
        message: 'Customers can only cancel orders' 
      });
    }
    
    // Case 3: Seller updating status
    if (role === 'Seller' || role === 'Admin' || role === 'SuperUser') {
      // Check valid status transitions
      const validTransitions = {
        'pending': ['processing', 'cancelled'],
        'processing': ['delivering', 'cancelled'],
        'delivering': ['delivered'],
        'delivered': [],
        'cancelled': []
      };
      console.log('current Status is: ', currentStatus);
      console.log('valid transitionings: ', validTransitions);
      
      if (validTransitions[currentStatus].includes(status)) {
        // Valid transition
        req.order = order;
        return next();
      } else {
        return res.status(400).json({ 
          message: `Cannot change order status from ${currentStatus} to ${status}. Valid next statuses are: ${validTransitions[currentStatus].join(', ')}` 
        });
      }
    }
    
    // Default - should not reach here if roles are properly set
    return res.status(403).json({ message: 'Unauthorized to update order status' });
    
  } catch (error) {
    console.error('Order status update check error:', error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { canUpdateOrderStatus };