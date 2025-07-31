const { v4: uuidv4 } = require('uuid');
const menuItems = []; 

exports.createMenuItem = (req, res) => {
  const { name, price } = req.body;

  if (!name || typeof price !== 'number') {
    return res.status(400).json({ message: 'Name and valid price are required.' });
  }

  const newItem = {
    id: uuidv4(),
    name,
    price,
    restaurantId: req.user.id
  };

  menuItems.push(newItem);
  res.status(201).json({ message: 'Menu item added.', item: newItem });
};

exports.getMenuItems = (req, res) => {
  const restaurantItems = menuItems.filter(item => item.restaurantId === req.user.id);
  res.json(restaurantItems);
};

exports.updateMenuItem = (req, res) => {
  const { id } = req.params;
  const item = menuItems.find(m => m.id === id && m.restaurantId === req.user.id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found or unauthorized.' });
  }

  const { name, price } = req.body;
  if (name) item.name = name;
  if (typeof price === 'number') item.price = price;

  res.json({ message: 'Menu item updated.', item });
};

exports.deleteMenuItem = (req, res) => {
  const { id } = req.params;
  const index = menuItems.findIndex(m => m.id === id && m.restaurantId === req.user.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found or unauthorized.' });
  }

  menuItems.splice(index, 1);
  res.json({ message: 'Menu item deleted.' });
};

const express = require('express');
const router = express.Router();
const menuController = require('../controllers/MenuController');
const { isRestaurant } = require('../middlewares/authMiddleware');

router.post('/', isRestaurant, menuController.createMenuItem);
router.get('/', isRestaurant, menuController.getMenuItems);
router.patch('/:id', isRestaurant, menuController.updateMenuItem);
router.delete('/:id', isRestaurant, menuController.deleteMenuItem);

module.exports = router;
