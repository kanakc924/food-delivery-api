class InvalidOrderError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidOrderError';
    this.statusCode = 400;
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({ error: message });
};

module.exports = { errorHandler, InvalidOrderError };
