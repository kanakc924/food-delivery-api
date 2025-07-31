
exports.logOrderMiddleware = (req, res, next) => {
  if (req.method === 'POST' && req.originalUrl === '/api/orders') {
    const { user } = req;
    const items = req.body.items || [];
    const total = items.reduce((sum, item) => sum + item.price, 0);
    console.log(`[ORDER LOG] User: ${user.id}, Time: ${new Date().toISOString()}, Total: ${total}`);
  }
  next();
};
