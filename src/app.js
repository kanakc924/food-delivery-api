const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const { errorHandler } = require('./middlewares/errorHandler');
const { verifyToken } = require('./middlewares/authMiddleware');
const { logOrderMiddleware } = require('./middlewares/logOrder');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/menu', verifyToken, menuRoutes);
app.use('/api/orders', verifyToken, logOrderMiddleware, orderRoutes);
app.use('/api/users', verifyToken, userRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
