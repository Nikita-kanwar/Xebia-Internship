const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const {connectMongoDb}= require('./config/db');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

connectMongoDb();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API is running'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
