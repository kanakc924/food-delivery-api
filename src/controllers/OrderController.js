const { v4: uuidv4 } = require('uuid');
const orders = []; 
const menuItems = require('../controllers/MenuController').menuItems || [];

exports.placeOrder = (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order must contain at least one item.' });
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  const order = {
    id: uuidv4(),
    items,
    customerId: req.user.id,
    status: 'pending',
    timestamp: new Date(),
    totalAmount
  };

  orders.push(order);
  res.status(201).json({ message: 'Order placed successfully.', order });
};

exports.getCustomerOrders = (req, res) => {
  const customerOrders = orders.filter(o => o.customerId === req.user.id);
  res.json(customerOrders);
};

exports.getRestaurantOrders = (req, res) => {
  const restaurantOrders = orders.filter(o =>
    o.items.some(item => item.restaurantId === req.user.id)
  );
  res.json(restaurantOrders);
};

// File: src/routes/order.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const { isCustomer, isRestaurant } = require('../middlewares/authMiddleware');

router.post('/', isCustomer, orderController.placeOrder);
router.get('/my', isCustomer, orderController.getCustomerOrders);
router.get('/restaurant', isRestaurant, orderController.getRestaurantOrders);

module.exports = router;
