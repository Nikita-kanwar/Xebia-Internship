const express = require('express');
const dotenv = require('dotenv');
const { connectMongoDb } = require('./config/db');
const authRoutes = require("./routes/auth");
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); 
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();

connectMongoDb();

const app = express();

app.use(express.json());
app.use(helmet()); 
app.use(cors());   
app.use(morgan('dev')); 

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); 
app.use('/api/orders', orderRoutes); 

app.get('/', (req, res) => {
  res.send('Server is running securely');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
