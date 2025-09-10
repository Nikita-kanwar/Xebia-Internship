const express = require('express');
const dotenv = require('dotenv');
const { connectMongoDb } = require('./config/db');
const authRoutes = require("./routes/auth");
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();

// connection
connectMongoDb();

const app = express();

// Middleware
app.use(express.json());

// Routes
// auth route
app.use('/api/auth', authRoutes);
// product route
app.use('/api/products', productRoutes);
// Cart route
app.use("/api/cart", cartRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
