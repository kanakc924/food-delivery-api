const authController = require('./AuthController');

exports.getAllUsers = (req, res) => {
  res.json(authController.users || []);
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const index = authController.users.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  authController.users.splice(index, 1);
  res.json({ message: 'User deleted successfully' });
};


