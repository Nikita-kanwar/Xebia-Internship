const express = require('express');
const dotenv = require('dotenv');
const { connectMongoDb } = require('./config/db');
const authRoutes = require("./routes/auth");
const productRoutes = require('./routes/productRoutes');


dotenv.config();

// connection
connectMongoDb();

const app = express();

// Middleware
app.use(express.json());

// Routes
// authroute
app.use('/api/auth', authRoutes);
// product route
app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
