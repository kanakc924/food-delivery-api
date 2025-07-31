const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { isAdmin } = require('../middlewares/authMiddleware');

router.get('/', isAdmin, userController.getAllUsers);
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;